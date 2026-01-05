"""
Final Daily Attendance System
- Press ENTER to capture a photo from webcam
- Recognize faces (known → mark Present, unknown → save & log)
- Attendance stored in MongoDB
"""

import cv2
import face_recognition
import numpy as np
import os
import csv
from datetime import date, datetime
from pymongo import MongoClient

# ---------------------------
# Directories & Files
# ---------------------------
CAPTURE_DIR = r"backend\Pictures\captured_faces"
KNOWN_FACES_DIR = "backend\known_faces"
UNKNOWN_FACES_DIR = r"backend\Pictures\unknown_faces"
ENCODINGS_FILE = "backend\known_faces_encodings.npz"
STUDENT_INFO_FILE = "backend\Student.csv"

os.makedirs(CAPTURE_DIR, exist_ok=True)
os.makedirs(UNKNOWN_FACES_DIR, exist_ok=True)

# ---------------------------
# MongoDB Setup
# ---------------------------
client = MongoClient("mongodb://localhost:27017/")
try:
    client.admin.command('ping')
    print("[INFO] MongoDB connected successfully")
except:
    print("[ERROR] Cannot connect to MongoDB")
    exit()

db = client["attendance_system"]
students_collection = db["students"]
attendance_collection = db["attendance"]
unknown_collection = db["unknown_faces"]

# ---------------------------
# Load student info from CSV
# ---------------------------
student_info_map = {}
with open(STUDENT_INFO_FILE, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        student_info_map[row['filename']] = {
            "name": row['name'],
            "roll_no": row['roll_no'],
            "standard": row['standard']
        }

# ---------------------------
# Load known faces
# ---------------------------
known_encodings = []
known_names = []
known_roll_nos = []

if os.path.exists(ENCODINGS_FILE):
    data = np.load(ENCODINGS_FILE, allow_pickle=True)
    known_encodings = data["encodings"].tolist()
    known_names = data["names"].tolist()
    known_roll_nos = data.get("roll_nos", np.array([None]*len(known_names))).tolist()
    print(f"[INFO] Loaded {len(known_encodings)} known faces from cache")
else:
    for filename in os.listdir(KNOWN_FACES_DIR):
        if filename.lower().endswith((".jpg", ".png", ".jpeg")):
            path = os.path.join(KNOWN_FACES_DIR, filename)
            image = face_recognition.load_image_file(path)
            encodings = face_recognition.face_encodings(image)
            info = student_info_map.get(filename)

            if len(encodings) == 0:
                print(f"[WARN] No face found in {filename}")
            else:
                known_encodings.append(encodings[0])
                name = info['name'] if info else os.path.splitext(filename)[0]
                known_names.append(name)
                roll_no = info['roll_no'] if info else None
                known_roll_nos.append(roll_no)
                print(f"[INFO] Added {filename} -> {name} ({roll_no})")

                # Insert student info into MongoDB if not exists
                if info and students_collection.count_documents({"roll_no": info['roll_no']}) == 0:
                    students_collection.insert_one({
                        "name": info['name'],
                        "roll_no": info['roll_no'],
                        "standard": info['standard']
                    })

    np.savez(ENCODINGS_FILE, encodings=known_encodings, names=known_names, roll_nos=known_roll_nos)
    print(f"[INFO] Processed and saved {len(known_encodings)} known faces")

# ---------------------------
# Attendance Helpers
# ---------------------------
recognized_today = set()  # Track recognized roll numbers

def get_today_str():
    return date.today().strftime("%Y-%m-%d")

def prepopulate_attendance():
    """Mark all students as Absent at start of day"""
    today = get_today_str()
    for info in student_info_map.values():
        attendance_collection.update_one(
            {"roll_no": info['roll_no'], "date": today},
            {"$set": {"name": info['name'], "status": "Absent"}},
            upsert=True
        )
    print(f"[INFO] Pre-populated attendance for {today} as Absent")

def mark_attendance_by_roll(roll_no):
    """Mark Present immediately when recognized"""
    if roll_no and roll_no not in recognized_today:
        today = get_today_str()
        attendance_collection.update_one(
            {"roll_no": roll_no, "date": today},
            {"$set": {"status": "Present"}},
            upsert=True
        )
        recognized_today.add(roll_no)
        student = students_collection.find_one({"roll_no": roll_no})
        print(f"[ATTENDANCE] {roll_no} - {student['name']} marked Present at {datetime.now().strftime('%H:%M:%S')}")

# Prepopulate attendance for today
prepopulate_attendance()

# ---------------------------
# Webcam Live Capture + Attendance
# ---------------------------
print("[INFO] Starting Attendance Capture. Press ENTER to capture.")
cap = cv2.VideoCapture(0)
unknown_id = 0
recent_unknowns = []
UNKNOWN_TOLERANCE = 0.6
UNKNOWN_THROTTLE_SECONDS = 10
MAX_RECENT = 50

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame, model="hog")

    for (top, right, bottom, left) in face_locations:
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

    cv2.imshow("Attendance Camera", frame)

    key = cv2.waitKey(1) & 0xFF
    if key == 13:  # ENTER
        if face_locations:
            filename = f"{CAPTURE_DIR}/capture_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
            cv2.imwrite(filename, frame)
            print(f"[INFO] Captured photo: {filename}")

            # Process the captured frame for recognition
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

            for face_encoding, (top, right, bottom, left) in zip(face_encodings, face_locations):
                matches = face_recognition.compare_faces(known_encodings, face_encoding, tolerance=0.45)
                face_distances = face_recognition.face_distance(known_encodings, face_encoding)

                name = "Unknown"
                roll_no = None

                if len(face_distances) > 0:
                    best_match_index = np.argmin(face_distances)
                    if matches[best_match_index]:
                        roll_no = known_roll_nos[best_match_index]
                        name = known_names[best_match_index]
                        mark_attendance_by_roll(roll_no)
                    else:
                        # Handle Unknown
                        now = datetime.now()
                        is_new_unknown = True
                        for unk in recent_unknowns:
                            distance = np.linalg.norm(unk["encoding"] - face_encoding)
                            seconds_since_seen = (now - unk["last_seen"]).total_seconds()
                            if distance < UNKNOWN_TOLERANCE and seconds_since_seen < UNKNOWN_THROTTLE_SECONDS:
                                is_new_unknown = False
                                break

                        if is_new_unknown:
                            face_crop = frame[top:bottom, left:right]
                            if face_crop.size > 0:
                                unknown_path = os.path.join(UNKNOWN_FACES_DIR, f"unknown_{unknown_id}.jpg")
                                cv2.imwrite(unknown_path, face_crop)
                                unknown_collection.insert_one({
                                    "image_path": unknown_path,
                                    "timestamp": now
                                })
                                print(f"[ALERT] Unknown face saved: {unknown_path}")
                                unknown_id += 1
                                recent_unknowns.append({"encoding": face_encoding, "last_seen": now})
                                if len(recent_unknowns) > MAX_RECENT:
                                    recent_unknowns.pop(0)
        else:
            print("[WARN] No face detected. Try again.")

    elif key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print("[INFO] Attendance session ended.")