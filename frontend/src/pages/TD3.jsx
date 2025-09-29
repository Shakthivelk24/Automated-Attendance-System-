import React, { useState, useRef, useEffect } from "react";

const TD3= () => {
  // State management
  const [currentStep, setCurrentStep] = useState("classSelection"); // classSelection, attendance, results
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [recognitionResults, setRecognitionResults] = useState([]);
  
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
    { id: "10", name: "Class 10" }
  ];

  const sections = ["A", "B", "C", "D"];

  // Mock students for selected class - replace with API call
  const [students, setStudents] = useState([]);

  // 1. Effect for fetching mock student data
  useEffect(() => {
    if (selectedClass && selectedSection) {
      // Mock student data - replace with actual API call
      setStudents([
        { id: 1, name: "Ravi Kumar", rollNo: "001", present: false, confidence: 0 },
        { id: 2, name: "Anita Sharma", rollNo: "002", present: false, confidence: 0 },
        { id: 3, name: "Priya Patel", rollNo: "003", present: false, confidence: 0 },
        { id: 4, name: "Suresh Reddy", rollNo: "004", present: false, confidence: 0 },
        { id: 5, name: "Meera Singh", rollNo: "005", present: false, confidence: 0 },
        { id: 6, name: "Arjun Gupta", rollNo: "006", present: false, confidence: 0 }
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
      video.play().catch(e => {
        console.warn("Video playback failed (e.g., autoplay blocked or permission issue):", e);
      });
    }

    // Cleanup function: stop tracks when the component unmounts or the stream changes/clears
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
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
          facingMode: 'user' 
        } 
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
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // Get image data
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
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
      { studentId: 5, confidence: 0.92, present: true }
    ];

    // Update students based on recognition results
    const updatedStudents = students.map(student => {
      const result = mockResults.find(r => r.studentId === student.id);
      if (result) {
        return { 
          ...student, 
          present: result.present, 
          confidence: result.confidence 
        };
      }
      return student;
    });

    setStudents(updatedStudents);
    setRecognitionResults(mockResults);
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

  // Render Class Selection Page
  const renderClassSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3">
              Smart Attendance
            </h1>
            <p className="text-xl text-gray-600 font-medium">Automated Face Recognition System</p>
            <div className="mt-6 inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200/50">
              <p className="text-sm text-gray-700 font-semibold">
                {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
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
            <p className="text-gray-600">Choose your class and section to begin attendance</p>
          </div>
          
          {/* Class Selection Grid */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Choose Class:</h3>
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
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Choose Section:</h3>
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
                <h3 className="text-lg font-bold text-gray-800 mb-3">✨ Selected Class</h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}
                </p>
                <div className="inline-block px-4 py-2 bg-white/80 rounded-lg">
                  <p className="text-sm text-gray-700 font-semibold">
                    📚 {students.length} students enrolled
                  </p>
                </div>
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
                Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}
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
              <p className="text-gray-600">Position students in U-shaped seating for best results</p>
            </div>
            
            <div className="flex flex-col items-center">
              {!isCapturing && !photoTaken && (
                <div className="text-center">
                  <div className="w-80 h-60 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-inner border-2 border-dashed border-gray-300">
                    <div className="text-gray-500 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl mb-4">
                        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold">Ready to capture class photo</p>
                      <p className="text-sm mt-2">Click below to activate camera</p>
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
              <p className="text-gray-600 mt-1">Students enrolled in this class</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => (
                <div key={student.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-102">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                      <span className="text-white font-bold text-lg">{student.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-600 font-medium">Roll: {student.rollNo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );

  // Render Results Page
  const renderResultsPage = () => {
    const presentCount = students.filter(s => s.present).length;
    const absentCount = students.length - presentCount;
    const attendancePercentage = Math.round((presentCount / students.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ✅ Attendance Results
                </h1>
                <p className="text-gray-600 font-medium mt-1">
                  Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}
                </p>
              </div>
              <div className="text-right bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-gray-700 font-semibold">
                  📅 {new Date().toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-100 mb-2">Present</h3>
              <p className="text-4xl font-bold">{presentCount}</p>
              <p className="text-green-100 mt-1">students detected</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-2xl text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-100 mb-2">Absent</h3>
              <p className="text-4xl font-bold">{absentCount}</p>
              <p className="text-red-100 mt-1">students missing</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-100 mb-2">Attendance %</h3>
              <p className="text-4xl font-bold">{attendancePercentage}%</p>
              <p className="text-blue-100 mt-1">success rate</p>
            </div>
          </div>

          {/* Student Results */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                👥 Individual Student Results
              </h2>
              <p className="text-gray-600">Face recognition results for each student</p>
            </div>
            <div className="space-y-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className={`flex items-center justify-between p-6 rounded-xl border-l-4 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-102 ${
                    student.present 
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500" 
                      : "bg-gradient-to-r from-red-50 to-pink-50 border-red-500"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg ${
                      student.present 
                        ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                        : "bg-gradient-to-r from-red-500 to-pink-600"
                    }`}>
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                      <p className="text-gray-600 font-medium">Roll No: {student.rollNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-6 py-2 rounded-full text-sm font-bold shadow-md ${
                      student.present 
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white" 
                        : "bg-gradient-to-r from-red-600 to-pink-600 text-white"
                    }`}>
                      {student.present ? "✅ Present" : "❌ Absent"}
                    </span>
                    {student.present && (
                      <p className="text-xs text-gray-500 mt-2 font-semibold">
                        🎯 Confidence: {(student.confidence * 100).toFixed(1)}%
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setCurrentStep("attendance")}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
            >
              📸 Retake Attendance
            </button>
            <button
              onClick={resetToClassSelection}
              className="px-6 py-2 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
            >
              🏠 New Class
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105">
              💾 Save Attendance
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105">
              📊 Generate Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main render based on current step
  return (
    <div>
      {currentStep === "classSelection" && renderClassSelection()}
      {currentStep === "attendance" && renderAttendancePage()}
      {currentStep === "results" && renderResultsPage()}
    </div>
  );
};

export default TD3;









// import React, { useState, useRef, useEffect } from "react";

// const TeacherDashboard = () => {
//   // State management
//   const [currentStep, setCurrentStep] = useState("classSelection"); // classSelection, attendance, results
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");
//   const [isCapturing, setIsCapturing] = useState(false);
//   const [photoTaken, setPhotoTaken] = useState(false);
//   const [recognitionResults, setRecognitionResults] = useState([]);
  
//   // Camera refs
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [stream, setStream] = useState(null);

//   // Mock data - replace with your actual data
//   const classes = [
//     { id: "1", name: "Class 1" },
//     { id: "2", name: "Class 2" },
//     { id: "3", name: "Class 3" },
//     { id: "4", name: "Class 4" },
//     { id: "5", name: "Class 5" },
//     { id: "6", name: "Class 6" },
//     { id: "7", name: "Class 7" },
//     { id: "8", name: "Class 8" },
//     { id: "9", name: "Class 9" },
//     { id: "10", name: "Class 10" }
//   ];

//   const sections = ["A", "B", "C", "D"];

//   // Mock students for selected class - replace with API call
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     if (selectedClass && selectedSection) {
//       // Mock student data - replace with actual API call
//       setStudents([
//         { id: 1, name: "Ravi Kumar", rollNo: "001", present: false, confidence: 0 },
//         { id: 2, name: "Anita Sharma", rollNo: "002", present: false, confidence: 0 },
//         { id: 3, name: "Priya Patel", rollNo: "003", present: false, confidence: 0 },
//         { id: 4, name: "Suresh Reddy", rollNo: "004", present: false, confidence: 0 },
//         { id: 5, name: "Meera Singh", rollNo: "005", present: false, confidence: 0 },
//         { id: 6, name: "Arjun Gupta", rollNo: "006", present: false, confidence: 0 }
//       ]);
//     }
//   }, [selectedClass, selectedSection]);

//   // Start camera
//   const startCamera = async () => {
//     try {
//       const mediaStream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           width: 640, 
//           height: 480,
//           facingMode: 'user' 
//         } 
//       });
//       setStream(mediaStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = mediaStream;
//       }
//       setIsCapturing(true);
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       alert("Could not access camera. Please check permissions.");
//     }
//   };

//   // Stop camera
//   const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach(track => track.stop());
//       setStream(null);
//     }
//     setIsCapturing(false);
//   };

//   // Capture photo and process face recognition
//   const capturePhoto = async () => {
//     if (!videoRef.current || !canvasRef.current) return;

//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     const ctx = canvas.getContext('2d');

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     ctx.drawImage(video, 0, 0);

//     // Get image data
//     const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
//     setPhotoTaken(true);
//     stopCamera();

//     // Simulate face recognition API call
//     // Replace this with your actual face recognition API
//     setTimeout(() => {
//       simulateFaceRecognition();
//     }, 2000);
//   };

//   // Simulate face recognition results - replace with actual API call
//   const simulateFaceRecognition = () => {
//     const mockResults = [
//       { studentId: 1, confidence: 0.95, present: true },
//       { studentId: 3, confidence: 0.87, present: true },
//       { studentId: 5, confidence: 0.92, present: true }
//     ];

//     // Update students based on recognition results
//     const updatedStudents = students.map(student => {
//       const result = mockResults.find(r => r.studentId === student.id);
//       if (result) {
//         return { 
//           ...student, 
//           present: result.present, 
//           confidence: result.confidence 
//         };
//       }
//       return student;
//     });

//     setStudents(updatedStudents);
//     setRecognitionResults(mockResults);
//     setCurrentStep("results");
//   };

//   // Reset to class selection
//   const resetToClassSelection = () => {
//     setCurrentStep("classSelection");
//     setSelectedClass("");
//     setSelectedSection("");
//     setPhotoTaken(false);
//     setRecognitionResults([]);
//     stopCamera();
//   };

//   // Handle class selection and proceed to attendance
//   const proceedToAttendance = () => {
//     if (selectedClass && selectedSection) {
//       setCurrentStep("attendance");
//     } else {
//       alert("Please select both class and section");
//     }
//   };

//   // Render Class Selection Page
//   const renderClassSelection = () => (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
//           <div className="text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl mb-4">
//               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3">
//               Smart Attendance
//             </h1>
//             <p className="text-xl text-gray-600 font-medium">Automated Face Recognition System</p>
//             <div className="mt-6 inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200/50">
//               <p className="text-sm text-gray-700 font-semibold">
//                 {new Date().toLocaleDateString('en-IN', { 
//                   weekday: 'long', 
//                   year: 'numeric', 
//                   month: 'long', 
//                   day: 'numeric' 
//                 })}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Class Selection */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
//               Select Class & Section
//             </h2>
//             <p className="text-gray-600">Choose your class and section to begin attendance</p>
//           </div>
          
//           {/* Class Selection Grid */}
//           <div className="mb-10">
//             <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Choose Class:</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//               {classes.map((cls) => (
//                 <button
//                   key={cls.id}
//                   onClick={() => setSelectedClass(cls.id)}
//                   className={`p-4 rounded-xl border-2 transition-all duration-300 font-bold text-lg transform hover:scale-105 ${
//                     selectedClass === cls.id
//                       ? "bg-gradient-to-r from-blue-600 to-green-600 text-white border-transparent shadow-2xl scale-105"
//                       : "bg-white/70 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:shadow-lg"
//                   }`}
//                 >
//                   {cls.name}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Section Selection */}
//           <div className="mb-10">
//             <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Choose Section:</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
//               {sections.map((section) => (
//                 <button
//                   key={section}
//                   onClick={() => setSelectedSection(section)}
//                   className={`p-5 rounded-xl border-2 transition-all duration-300 font-bold text-xl transform hover:scale-105 ${
//                     selectedSection === section
//                       ? "bg-gradient-to-r from-green-600 to-teal-600 text-white border-transparent shadow-2xl scale-105"
//                       : "bg-white/70 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 hover:shadow-lg"
//                   }`}
//                 >
//                   Section {section}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Selected Class Display */}
//           {selectedClass && selectedSection && (
//             <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 p-6 rounded-xl mb-8 shadow-lg">
//               <div className="text-center">
//                 <h3 className="text-lg font-bold text-gray-800 mb-3">✨ Selected Class</h3>
//                 <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
//                   Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}
//                 </p>
//                 <div className="inline-block px-4 py-2 bg-white/80 rounded-lg">
//                   <p className="text-sm text-gray-700 font-semibold">
//                     📚 {students.length} students enrolled
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Proceed Button */}
//           <div className="text-center">
//             <button
//               onClick={proceedToAttendance}
//               disabled={!selectedClass || !selectedSection}
//               className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
//                 selectedClass && selectedSection
//                   ? "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1"
//                   : "bg-white-300 text-white-500 cursor-not-allowed"
//               }`}
//             >
//               📸 Start Attendance Capture
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Render Attendance Capture Page
//   const renderAttendancePage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-teal-100 p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-8 border border-white/50">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                 📸 Capture Attendance
//               </h1>
//               <p className="text-gray-600 font-medium mt-1">
//                 Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}
//               </p>
//             </div>
//             <button
//               onClick={resetToClassSelection}
//               className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
//             >
//               ← Back to Selection
//             </button>
//           </div>
//         </div>

//         {/* Camera Section */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
//               📷 Camera Capture
//             </h2>
//             <p className="text-gray-600">Position students in U-shaped seating for best results</p>
//           </div>
          
//           <div className="flex flex-col items-center">
//             {!isCapturing && !photoTaken && (
//               <div className="text-center">
//                 <div className="w-80 h-60 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-inner border-2 border-dashed border-gray-300">
//                   <div className="text-gray-500 text-center">
//                     <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl mb-4">
//                       <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                     <p className="text-lg font-semibold">Ready to capture class photo</p>
//                     <p className="text-sm mt-2">Click below to activate camera</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={startCamera}
//                   className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
//                 >
//                   📷 Activate Camera
//                 </button>
//               </div>
//             )}

//             {isCapturing && (
//               <div className="text-center">
//                 <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 border-4 border-white">
//                   <video
//                     ref={videoRef}
//                     autoPlay
//                     playsInline
//                     className="w-full max-w-2xl"
//                   />
//                 </div>
//                 <div className="flex gap-4 justify-center">
//                   <button
//                     onClick={capturePhoto}
//                     className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
//                   >
//                     📸 Capture Photo
//                   </button>
//                   <button
//                     onClick={stopCamera}
//                     className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
//                   >
//                     ⏹ Stop Camera
//                   </button>
//                 </div>
//               </div>
//             )}

//             {photoTaken && currentStep === "attendance" && (
//               <div className="text-center">
//                 <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 border-4 border-white">
//                   <canvas ref={canvasRef} className="w-full max-w-2xl" />
//                 </div>
//                 <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 p-6 rounded-xl">
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600 mr-4"></div>
//                     <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
//                       🔍 Processing faces and matching students...
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Student List Preview */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//               👥 Student List ({students.length})
//             </h2>
//             <p className="text-gray-600 mt-1">Students enrolled in this class</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {students.map((student) => (
//               <div key={student.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:scale-102">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
//                     <span className="text-white font-bold text-lg">{student.name.charAt(0)}</span>
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-800">{student.name}</p>
//                     <p className="text-sm text-gray-600 font-medium">Roll: {student.rollNo}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Render Results Page
//   const renderResultsPage = () => {
//     const presentCount = students.filter(s => s.present).length;
//     const absentCount = students.length - presentCount;
//     const attendancePercentage = Math.round((presentCount / students.length) * 100);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-blue-100 p-6">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//                   ✅ Attendance Results
//                 </h1>
//                 <p className="text-gray-600 font-medium mt-1">
//                   Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}
//                 </p>
//               </div>
//               <div className="text-right bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-200">
//                 <p className="text-sm text-gray-700 font-semibold">
//                   📅 {new Date().toLocaleString('en-IN')}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-green-100 mb-2">Present</h3>
//               <p className="text-4xl font-bold">{presentCount}</p>
//               <p className="text-green-100 mt-1">students detected</p>
//             </div>

//             <div className="bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-2xl text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-red-100 mb-2">Absent</h3>
//               <p className="text-4xl font-bold">{absentCount}</p>
//               <p className="text-red-100 mt-1">students missing</p>
//             </div>

//             <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
//                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-blue-100 mb-2">Attendance %</h3>
//               <p className="text-4xl font-bold">{attendancePercentage}%</p>
//               <p className="text-blue-100 mt-1">success rate</p>
//             </div>
//           </div>

//           {/* Student Results */}
//           <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/50">
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
//                 👥 Individual Student Results
//               </h2>
//               <p className="text-gray-600">Face recognition results for each student</p>
//             </div>
//             <div className="space-y-4">
//               {students.map((student) => (
//                 <div
//                   key={student.id}
//                   className={`flex items-center justify-between p-6 rounded-xl border-l-4 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-102 ${
//                     student.present 
//                       ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500" 
//                       : "bg-gradient-to-r from-red-50 to-pink-50 border-red-500"
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg ${
//                       student.present 
//                         ? "bg-gradient-to-r from-green-500 to-emerald-600" 
//                         : "bg-gradient-to-r from-red-500 to-pink-600"
//                     }`}>
//                       {student.name.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
//                       <p className="text-gray-600 font-medium">Roll No: {student.rollNo}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <span className={`inline-block px-6 py-2 rounded-full text-sm font-bold shadow-md ${
//                       student.present 
//                         ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white" 
//                         : "bg-gradient-to-r from-red-600 to-pink-600 text-white"
//                     }`}>
//                       {student.present ? "✅ Present" : "❌ Absent"}
//                     </span>
//                     {student.present && (
//                       <p className="text-xs text-gray-500 mt-2 font-semibold">
//                         🎯 Confidence: {(student.confidence * 100).toFixed(1)}%
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-4 justify-center">
//             <button
//               onClick={() => setCurrentStep("attendance")}
//               className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
//             >
//               📸 Retake Attendance
//             </button>
//             <button
//               onClick={resetToClassSelection}
//               className="px-6 py-2 bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
//             >
//               🏠 New Class
//             </button>
//             <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105">
//               💾 Save Attendance
//             </button>
//             <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105">
//               📊 Generate Report
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Main render based on current step
//   return (
//     <div>
//       {currentStep === "classSelection" && renderClassSelection()}
//       {currentStep === "attendance" && renderAttendancePage()}
//       {currentStep === "results" && renderResultsPage()}
//     </div>
//   );
// };

// export default TeacherDashboard;





// // import React, { useState, useRef, useEffect } from "react";

// // const TeacherDashboard = () => {
// //   // State management
// //   const [currentStep, setCurrentStep] = useState("classSelection"); // classSelection, attendance, results
// //   const [selectedClass, setSelectedClass] = useState("");
// //   const [selectedSection, setSelectedSection] = useState("");
// //   const [isCapturing, setIsCapturing] = useState(false);
// //   const [photoTaken, setPhotoTaken] = useState(false);
// //   const [recognitionResults, setRecognitionResults] = useState([]);
  
// //   // Camera refs
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const [stream, setStream] = useState(null);

// //   // Mock data - replace with your actual data
// //   const classes = [
// //     { id: "1", name: "Class 1" },
// //     { id: "2", name: "Class 2" },
// //     { id: "3", name: "Class 3" },
// //     { id: "4", name: "Class 4" },
// //     { id: "5", name: "Class 5" },
// //     { id: "6", name: "Class 6" },
// //     { id: "7", name: "Class 7" },
// //     { id: "8", name: "Class 8" },
// //     { id: "9", name: "Class 9" },
// //     { id: "10", name: "Class 10" }
// //   ];

// //   const sections = ["A", "B", "C", "D"];

// //   // Mock students for selected class - replace with API call
// //   const [students, setStudents] = useState([]);

// //   useEffect(() => {
// //     if (selectedClass && selectedSection) {
// //       // Mock student data - replace with actual API call
// //       setStudents([
// //         { id: 1, name: "Ravi Kumar", rollNo: "001", present: false, confidence: 0 },
// //         { id: 2, name: "Anita Sharma", rollNo: "002", present: false, confidence: 0 },
// //         { id: 3, name: "Priya Patel", rollNo: "003", present: false, confidence: 0 },
// //         { id: 4, name: "Suresh Reddy", rollNo: "004", present: false, confidence: 0 },
// //         { id: 5, name: "Meera Singh", rollNo: "005", present: false, confidence: 0 },
// //         { id: 6, name: "Arjun Gupta", rollNo: "006", present: false, confidence: 0 }
// //       ]);
// //     }
// //   }, [selectedClass, selectedSection]);

// //   // Start camera
// //   const startCamera = async () => {
// //     try {
// //       const mediaStream = await navigator.mediaDevices.getUserMedia({ 
// //         video: { 
// //           width: 640, 
// //           height: 480,
// //           facingMode: 'user' 
// //         } 
// //       });
// //       setStream(mediaStream);
// //       if (videoRef.current) {
// //         videoRef.current.srcObject = mediaStream;
// //       }
// //       setIsCapturing(true);
// //     } catch (error) {
// //       console.error("Error accessing camera:", error);
// //       alert("Could not access camera. Please check permissions.");
// //     }
// //   };

// //   // Stop camera
// //   const stopCamera = () => {
// //     if (stream) {
// //       stream.getTracks().forEach(track => track.stop());
// //       setStream(null);
// //     }
// //     setIsCapturing(false);
// //   };

// //   // Capture photo and process face recognition
// //   const capturePhoto = async () => {
// //     if (!videoRef.current || !canvasRef.current) return;

// //     const canvas = canvasRef.current;
// //     const video = videoRef.current;
// //     const ctx = canvas.getContext('2d');

// //     canvas.width = video.videoWidth;
// //     canvas.height = video.videoHeight;
// //     ctx.drawImage(video, 0, 0);

// //     // Get image data
// //     const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
// //     setPhotoTaken(true);
// //     stopCamera();

// //     // Simulate face recognition API call
// //     // Replace this with your actual face recognition API
// //     setTimeout(() => {
// //       simulateFaceRecognition();
// //     }, 2000);
// //   };

// //   // Simulate face recognition results - replace with actual API call
// //   const simulateFaceRecognition = () => {
// //     const mockResults = [
// //       { studentId: 1, confidence: 0.95, present: true },
// //       { studentId: 3, confidence: 0.87, present: true },
// //       { studentId: 5, confidence: 0.92, present: true }
// //     ];

// //     // Update students based on recognition results
// //     const updatedStudents = students.map(student => {
// //       const result = mockResults.find(r => r.studentId === student.id);
// //       if (result) {
// //         return { 
// //           ...student, 
// //           present: result.present, 
// //           confidence: result.confidence 
// //         };
// //       }
// //       return student;
// //     });

// //     setStudents(updatedStudents);
// //     setRecognitionResults(mockResults);
// //     setCurrentStep("results");
// //   };

// //   // Reset to class selection
// //   const resetToClassSelection = () => {
// //     setCurrentStep("classSelection");
// //     setSelectedClass("");
// //     setSelectedSection("");
// //     setPhotoTaken(false);
// //     setRecognitionResults([]);
// //     stopCamera();
// //   };

// //   // Handle class selection and proceed to attendance
// //   const proceedToAttendance = () => {
// //     if (selectedClass && selectedSection) {
// //       setCurrentStep("attendance");
// //     } else {
// //       alert("Please select both class and section");
// //     }
// //   };

// //   // Render Class Selection Page
// //   const renderClassSelection = () => (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
// //           <div className="text-center">
// //             <h1 className="text-4xl font-bold text-gray-800 mb-2">Teacher Dashboard</h1>
// //             <p className="text-gray-600">Automated Attendance System</p>
// //             <div className="mt-4 text-sm text-gray-500">
// //               {new Date().toLocaleDateString('en-IN', { 
// //                 weekday: 'long', 
// //                 year: 'numeric', 
// //                 month: 'long', 
// //                 day: 'numeric' 
// //               })}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Class Selection */}
// //         <div className="bg-white rounded-lg shadow-lg p-8">
// //           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Class & Section</h2>
          
// //           {/* Class Selection Grid */}
// //           <div className="mb-8">
// //             <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose Class:</h3>
// //             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
// //               {classes.map((cls) => (
// //                 <button
// //                   key={cls.id}
// //                   onClick={() => setSelectedClass(cls.id)}
// //                   className={`p-4 rounded-lg border-2 transition-all duration-200 font-semibold ${
// //                     selectedClass === cls.id
// //                       ? "bg-blue-500 text-white border-blue-500 shadow-lg scale-105"
// //                       : "bg-gray-50 text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50"
// //                   }`}
// //                 >
// //                   {cls.name}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Section Selection */}
// //           <div className="mb-8">
// //             <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose Section:</h3>
// //             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
// //               {sections.map((section) => (
// //                 <button
// //                   key={section}
// //                   onClick={() => setSelectedSection(section)}
// //                   className={`p-4 rounded-lg border-2 transition-all duration-200 font-semibold text-xl ${
// //                     selectedSection === section
// //                       ? "bg-green-500 text-white border-green-500 shadow-lg scale-105"
// //                       : "bg-gray-50 text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50"
// //                   }`}
// //                 >
// //                   Section {section}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Selected Class Display */}
// //           {selectedClass && selectedSection && (
// //             <div className="bg-gray-50 p-6 rounded-lg mb-6">
// //               <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected:</h3>
// //               <p className="text-xl text-blue-600 font-bold">
// //                 Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}
// //               </p>
// //               <p className="text-sm text-gray-600 mt-2">
// //                 {students.length} students enrolled
// //               </p>
// //             </div>
// //           )}

// //           {/* Proceed Button */}
// //           <div className="text-center">
// //             <button
// //               onClick={proceedToAttendance}
// //               disabled={!selectedClass || !selectedSection}
// //               className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
// //                 selectedClass && selectedSection
// //                   ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
// //                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
// //               }`}
// //             >
// //               📸 Take Attendance
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // Render Attendance Capture Page
// //   const renderAttendancePage = () => (
// //     <div className="min-h-screen bg-gray-50 p-4">
// //       <div className="max-w-4xl mx-auto">
// //         {/* Header */}
// //         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-800">Take Attendance</h1>
// //               <p className="text-gray-600">Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}</p>
// //             </div>
// //             <button
// //               onClick={resetToClassSelection}
// //               className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
// //             >
// //               ← Back
// //             </button>
// //           </div>
// //         </div>

// //         {/* Camera Section */}
// //         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //           <h2 className="text-xl font-bold text-gray-800 mb-4">Camera Capture</h2>
          
// //           <div className="flex flex-col items-center">
// //             {!isCapturing && !photoTaken && (
// //               <div className="text-center">
// //                 <div className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
// //                   <div className="text-gray-500">
// //                     <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
// //                       <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
// //                     </svg>
// //                     <p>Click to start camera</p>
// //                   </div>
// //                 </div>
// //                 <button
// //                   onClick={startCamera}
// //                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
// //                 >
// //                   📷 Start Camera
// //                 </button>
// //               </div>
// //             )}

// //             {isCapturing && (
// //               <div className="text-center">
// //                 <video
// //                   ref={videoRef}
// //                   autoPlay
// //                   playsInline
// //                   className="w-full max-w-md rounded-lg shadow-lg mb-4"
// //                 />
// //                 <div className="flex gap-4">
// //                   <button
// //                     onClick={capturePhoto}
// //                     className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
// //                   >
// //                     📸 Capture Photo
// //                   </button>
// //                   <button
// //                     onClick={stopCamera}
// //                     className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
// //                   >
// //                     Stop Camera
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {photoTaken && currentStep === "attendance" && (
// //               <div className="text-center">
// //                 <canvas ref={canvasRef} className="w-full max-w-md rounded-lg shadow-lg mb-4" />
// //                 <div className="flex items-center justify-center">
// //                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
// //                   <p className="text-lg font-semibold text-gray-700">Processing faces...</p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Student List Preview */}
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h2 className="text-xl font-bold text-gray-800 mb-4">Student List ({students.length})</h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //             {students.map((student) => (
// //               <div key={student.id} className="p-3 bg-gray-50 rounded-lg">
// //                 <div className="flex items-center">
// //                   <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
// //                     {student.name.charAt(0)}
// //                   </div>
// //                   <div>
// //                     <p className="font-semibold text-sm">{student.name}</p>
// //                     <p className="text-xs text-gray-600">Roll: {student.rollNo}</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // Render Results Page
// //   const renderResultsPage = () => {
// //     const presentCount = students.filter(s => s.present).length;
// //     const absentCount = students.length - presentCount;
    
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-4">
// //         <div className="max-w-4xl mx-auto">
// //           {/* Header */}
// //           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-gray-800">Attendance Results</h1>
// //                 <p className="text-gray-600">Class {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection}</p>
// //               </div>
// //               <div className="text-right">
// //                 <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Stats */}
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
// //             <div className="bg-green-100 p-6 rounded-lg text-center">
// //               <h3 className="text-lg font-semibold text-green-800">Present</h3>
// //               <p className="text-3xl font-bold text-green-600">{presentCount}</p>
// //             </div>
// //             <div className="bg-red-100 p-6 rounded-lg text-center">
// //               <h3 className="text-lg font-semibold text-red-800">Absent</h3>
// //               <p className="text-3xl font-bold text-red-600">{absentCount}</p>
// //             </div>
// //             <div className="bg-blue-100 p-6 rounded-lg text-center">
// //               <h3 className="text-lg font-semibold text-blue-800">Attendance %</h3>
// //               <p className="text-3xl font-bold text-blue-600">
// //                 {Math.round((presentCount / students.length) * 100)}%
// //               </p>
// //             </div>
// //           </div>

// //           {/* Student Results */}
// //           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //             <h2 className="text-xl font-bold text-gray-800 mb-4">Student Attendance</h2>
// //             <div className="space-y-3">
// //               {students.map((student) => (
// //                 <div
// //                   key={student.id}
// //                   className={`flex items-center justify-between p-4 rounded-lg ${
// //                     student.present ? "bg-green-50 border-l-4 border-green-500" : "bg-red-50 border-l-4 border-red-500"
// //                   }`}
// //                 >
// //                   <div className="flex items-center">
// //                     <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${
// //                       student.present ? "bg-green-500" : "bg-red-500"
// //                     }`}>
// //                       {student.name.charAt(0)}
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold text-gray-800">{student.name}</h3>
// //                       <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
// //                     </div>
// //                   </div>
// //                   <div className="text-right">
// //                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
// //                       student.present 
// //                         ? "bg-green-200 text-green-800" 
// //                         : "bg-red-200 text-red-800"
// //                     }`}>
// //                       {student.present ? "Present" : "Absent"}
// //                     </span>
// //                     {student.present && (
// //                       <p className="text-xs text-gray-500 mt-1">
// //                         Confidence: {(student.confidence * 100).toFixed(1)}%
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex flex-wrap gap-4 justify-center">
// //             <button
// //               onClick={() => setCurrentStep("attendance")}
// //               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
// //             >
// //               📸 Retake Attendance
// //             </button>
// //             <button
// //               onClick={resetToClassSelection}
// //               className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
// //             >
// //               🏠 New Class
// //             </button>
// //             <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
// //               💾 Save Attendance
// //             </button>
// //             <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
// //               📊 Generate Report
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Main render based on current step
// //   return (
// //     <div>
// //       {currentStep === "classSelection" && renderClassSelection()}
// //       {currentStep === "attendance" && renderAttendancePage()}
// //       {currentStep === "results" && renderResultsPage()}
// //     </div>
// //   );
// // };

// // export default TeacherDashboard;          