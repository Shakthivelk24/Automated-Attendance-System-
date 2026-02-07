import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TD3 = () => {
  // State management
  const [currentStep, setCurrentStep] = useState("classSelection"); // classSelection, attendance, results
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);

  const navigate = useNavigate();

  // Camera refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  // Mock data - replace with your actual data
  const classes = [
    { id: "1", name: "Class 1" },
    { id: "2", name: "Class 2" },
    { id: "3", name: "Class 3" },
    { id: "4", name: "Class 4" },
    { id: "5", name: "Class 5" },
    { id: "6", name: "Class 6" },
    { id: "7", name: "Class 7" },
    { id: "8", name: "Class 8" },
    { id: "9", name: "Class 9" },
    { id: "10", name: "Class 10" },
  ];

  const sections = ["A", "B", "C", "D"];

  // Mock students for selected class - replace with API call
  const [students, setStudents] = useState([]);

  // 1. Effect for fetching mock student data
  useEffect(() => {
    if (selectedClass && selectedSection) {
      // Mock student data - replace with actual API call
      setStudents([
        {
          id: 1,
          name: "Ravi Kumar",
          rollNo: "001",
          present: false,
          confidence: 0,
        },
        {
          id: 2,
          name: "Anita Sharma",
          rollNo: "002",
          present: false,
          confidence: 0,
        },
        {
          id: 3,
          name: "Priya Patel",
          rollNo: "003",
          present: false,
          confidence: 0,
        },
        {
          id: 4,
          name: "Suresh Reddy",
          rollNo: "004",
          present: false,
          confidence: 0,
        },
        {
          id: 5,
          name: "Meera Singh",
          rollNo: "005",
          present: false,
          confidence: 0,
        },
        {
          id: 6,
          name: "Arjun Gupta",
          rollNo: "006",
          present: false,
          confidence: 0,
        },
      ]);
    }
  }, [selectedClass, selectedSection]);

  // 2. Effect for camera stream management (The fix for camera not working)
  useEffect(() => {
    const video = videoRef.current;

    if (stream && video) {
      // Attach the media stream to the video element
      video.srcObject = stream;

      // Explicitly call play(). This is crucial for mobile devices and
      // browser policies that block silent autoplay until user interaction.
      video.play().catch((e) => {
        console.warn(
          "Video playback failed (e.g., autoplay blocked or permission issue):",
          e,
        );
      });
    }

    // Cleanup function: stop tracks when the component unmounts or the stream changes/clears
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Start camera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
      });
      // Setting stream will trigger the useEffect to attach it to the video element
      setStream(mediaStream);
      setIsCapturing(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please check permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    // Setting stream to null will trigger the cleanup function in the useEffect
    setStream(null);
    setIsCapturing(false);
  };

  // Capture photo and process face recognition
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    setPhotoTaken(true);
    stopCamera(); // Stop the live stream after capture

    // Simulate face recognition API call
    // Replace this with your actual face recognition API
    setTimeout(() => {
      simulateFaceRecognition();
    }, 2000);
  };

  // Simulate face recognition results - replace with actual API call
  const simulateFaceRecognition = () => {
    const mockResults = [
      { studentId: 1, confidence: 0.95, present: true },
      { studentId: 3, confidence: 0.87, present: true },
      { studentId: 5, confidence: 0.92, present: true },
    ];

    // Update students based on recognition results
    const updatedStudents = students.map((student) => {
      const result = mockResults.find((r) => r.studentId === student.id);
      if (result) {
        return {
          ...student,
          present: result.present,
          confidence: result.confidence,
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    setCurrentStep("results");
  };

  // Reset to class selection
  const resetToClassSelection = () => {
    setCurrentStep("classSelection");
    setSelectedClass("");
    setSelectedSection("");
    setPhotoTaken(false);
    setRecognitionResults([]);
    stopCamera();
  };

  // Handle class selection and proceed to attendance
  const proceedToAttendance = () => {
    if (selectedClass && selectedSection) {
      setCurrentStep("attendance");
    } else {
      alert("Please select both class and section");
    }
  };

  const GotoAttendanceDashboard = () =>{
        navigate(`/teacher-dashboard/td2/${selectedClass}/${selectedSection}`);
  }

  // Render Class Selection Page
  const renderClassSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3">
              Smart Attendance
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Automated Face Recognition System
            </p>
            <div className="mt-6 inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200/50">
              <p className="text-sm text-gray-700 font-semibold">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
              Select Class & Section
            </h2>
            <p className="text-gray-600">
              Choose your class and section to begin attendance
            </p>
          </div>

          {/* Class Selection Grid */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Choose Class:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  onClick={() => setSelectedClass(cls.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 font-bold text-lg transform hover:scale-105 ${
                    selectedClass === cls.id
                      ? "bg-gradient-to-r from-blue-600 to-green-600 text-white border-transparent shadow-2xl scale-105"
                      : "bg-white/70 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:shadow-lg"
                  }`}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>

          {/* Section Selection */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Choose Section:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 font-bold text-xl transform hover:scale-105 ${
                    selectedSection === section
                      ? "bg-gradient-to-r from-green-600 to-teal-600 text-white border-transparent shadow-2xl scale-105"
                      : "bg-white/70 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 hover:shadow-lg"
                  }`}
                >
                  Section {section}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Class Display */}
          {selectedClass && selectedSection && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 p-6 rounded-xl mb-8 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  ✨ Selected Class
                </h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  Class {classes.find((c) => c.id === selectedClass)?.name} -
                  Section {selectedSection}
                </p>
                <div className="inline-block px-4 py-2 bg-white/80 rounded-lg">
                  <p className="text-sm text-gray-700 font-semibold">
                    📚 {students.length} students enrolled
                  </p>
                </div>
                 <button onClick={GotoAttendanceDashboard} className="ml-4 px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold">
                Go to Attendance Dashboard
            </button>
              </div>
            </div>
          )}

          {/* Proceed Button */}
          <div className="text-center">
            <button
              onClick={proceedToAttendance}
              disabled={!selectedClass || !selectedSection}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                selectedClass && selectedSection
                  ? "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1"
                  : "bg-white-300 text-white-500 cursor-not-allowed"
              }`}
            >
              📸 Start Attendance Capture
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );

  // Render Attendance Capture Page
  const renderAttendancePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-teal-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                📸 Capture Attendance
              </h1>
              <p className="text-gray-600 font-medium mt-1">
                Class {classes.find((c) => c.id === selectedClass)?.name} -
                Section {selectedSection}
              </p>
            </div>
            <button
              onClick={resetToClassSelection}
              className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
            >
              ← Back to Selection
            </button>
          </div>
        </div>

        {/* Camera Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              📷 Camera Capture
            </h2>
            <p className="text-gray-600">
              Position students in U-shaped seating for best results
            </p>
          </div>

          <div className="flex flex-col items-center">
            {!isCapturing && !photoTaken && (
              <div className="text-center">
                <div className="w-80 h-60 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-inner border-2 border-dashed border-gray-300">
                  <div className="text-gray-500 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl mb-4">
                      <svg
                        className="w-8 h-8 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">
                      Ready to capture class photo
                    </p>
                    <p className="text-sm mt-2">
                      Click below to activate camera
                    </p>
                  </div>
                </div>
                <button
                  onClick={startCamera}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  📷 Activate Camera
                </button>
              </div>
            )}

            {isCapturing && (
              <div className="text-center">
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 border-4 border-white">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-w-2xl"
                    // Setting `srcObject` is now handled by the useEffect
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={capturePhoto}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    📸 Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    ⏹ Stop Camera
                  </button>
                </div>
              </div>
            )}

            {photoTaken && currentStep === "attendance" && (
              <div className="text-center">
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 border-4 border-white">
                  <canvas ref={canvasRef} className="w-full max-w-2xl" />
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 p-6 rounded-xl">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600 mr-4"></div>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      🔍 Processing faces and matching students...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student List Preview */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              👥 Student List ({students.length})
            </h2>
            <p className="text-gray-600 mt-1">
              Students enrolled in this class
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-102"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600 font-medium">
                      Roll: {student.rollNo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Main render based on current step
  return (
    <div>
      {currentStep === "classSelection" && renderClassSelection()}
      {currentStep === "attendance" && renderAttendancePage()}
    </div>
  );
};

export default TD3;
