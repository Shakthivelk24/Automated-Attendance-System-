import { useState, useRef, useEffect } from "react";
import { Calendar, Upload } from "lucide-react";

import toast from "react-hot-toast";
import { useAppContext } from "../../src/context/AppContext";

const UploadStudents = () => {
  const { axios } = useAppContext();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

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
        const imageFile = dataURLtoFile(
          uploadedImage,
          `${studentData.name}.png`,
        );
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
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Upload / Capture Student Photo
        </h1>
        <Calendar className="h-6 w-6 text-gray-400 self-start sm:self-auto" />
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <div className="w-full max-w-3xl mx-auto space-y-6">
          {/* Student Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={studentData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
            />

            <input
              type="text"
              name="roll"
              placeholder="Roll Number"
              value={studentData.roll}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
            />

            <input
              type="text"
              name="className"
              placeholder="Class"
              value={studentData.className}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
            />

            <input
              type="text"
              name="section"
              placeholder="Section"
              value={studentData.section}
              onChange={handleChange}
              className="border p-3 rounded-lg w-full text-sm sm:text-base"
            />
          </div>

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 text-center transition hover:border-blue-400"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {/* Preview Image */}
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Student"
                className="max-h-60 sm:max-h-72 w-full object-contain mx-auto rounded-lg mb-4"
              />
            )}

            {/* Camera View */}
            {cameraOn && (
              <div className="space-y-3">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full max-h-60 sm:max-h-72 object-cover rounded-lg mx-auto"
                />

                <canvas ref={canvasRef} className="hidden" />

                <button
                  onClick={capturePhoto}
                  className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Capture Photo
                </button>
              </div>
            )}

            {/* Upload UI */}
            {!cameraOn && !uploadedImage && (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />

                <p className="font-medium text-sm sm:text-base">
                  Upload or Capture Student Photo
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <label
                    htmlFor="file-upload"
                    className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Upload File
                  </label>

                  <button
                    onClick={() => setCameraOn(true)}
                    className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-lg"
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadStudents;
