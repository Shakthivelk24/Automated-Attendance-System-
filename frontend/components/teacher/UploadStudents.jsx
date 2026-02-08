import { useState, useRef, useEffect } from "react";
import { Calendar, Upload } from "lucide-react";

import toast from "react-hot-toast";
import { useAppContext } from "../../src/context/AppContext";

const UploadStudents = () => {
  const { axios } = useAppContext();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  console.log("Axios instance in UploadStudents:", axios);

  const [cameraOn, setCameraOn] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [studentData, setStudentData] = useState({
    name: "",
    roll: "",
    className: "",
    section: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= CAMERA EFFECT ================= */

  useEffect(() => {
    if (cameraOn) {
      startStream();
    }

    return () => {
      stopCamera();
    };
  }, [cameraOn]);

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Please allow camera permission");
      setCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  /* ================= CAPTURE ================= */

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    setUploadedImage(imageData);
    setCameraOn(false);
  };

  /* ================= FORM ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= FILE UPLOAD ================= */

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setUploadedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  // Convert Data URL to File object
  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const handleSave = async () => {
    if (
      !studentData.name ||
      !studentData.roll ||
      !studentData.className ||
      !studentData.section
    ) {
      toast.error("Please fill all student details");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", studentData.name);
      formData.append("rollNumber", studentData.roll);
      formData.append("classes", studentData.className);
      formData.append("section", studentData.section);

      if (uploadedImage) {
        const imageFile = dataURLtoFile(uploadedImage, `${studentData.name}.png`);
        formData.append("imageUrl", imageFile);
      }

      setLoading(true);

      const response = await axios.post(
        "/api/teacher/upload-student",
        formData,
      );

      toast.success("Student details saved successfully");

      setStudentData({
        name: "",
        roll: "",
        className: "",
        section: "",
      });

      setUploadedImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Error saving student details");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Upload / Capture Student Photo
        </h1>

        <Calendar className="h-6 w-6 text-gray-400" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Student Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={studentData.name}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />

            <input
              type="text"
              name="roll"
              placeholder="Roll Number"
              value={studentData.roll}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />

            <input
              type="text"
              name="className"
              placeholder="Class"
              value={studentData.className}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />

            <input
              type="text"
              name="section"
              placeholder="Section"
              value={studentData.section}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {/* Preview Image */}
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Student"
                className="max-h-64 mx-auto rounded-lg mb-4"
              />
            )}

            {/* Camera View */}
            {cameraOn && (
              <div className="space-y-3">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="mx-auto rounded-lg max-h-64"
                />

                <canvas ref={canvasRef} className="hidden" />

                <button
                  onClick={capturePhoto}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Capture Photo
                </button>
              </div>
            )}

            {/* Upload UI */}
            {!cameraOn && !uploadedImage && (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />

                <p className="font-medium">Upload or Capture Student Photo</p>

                <div className="flex justify-center gap-3">
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Upload File
                  </label>

                  <button
                    onClick={() => setCameraOn(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                  >
                    Open Camera
                  </button>
                </div>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadStudents;
