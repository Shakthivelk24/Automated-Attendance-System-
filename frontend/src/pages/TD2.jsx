import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TD2 = () => {

 const { class: selectedClass, section: selectedSection } = useParams();

 const navigate = useNavigate()

  // Mock student data
  const [students, setStudents] = useState([
    { id: 1, name: "Ravi", present: false },
    { id: 2, name: "Anita", present: false },
    { id: 3, name: "Priya", present: false },
    { id: 4, name: "Suresh", present: false },
    { id: 5, name: "Meera", present: false },
    { id: 6, name: "Arjun", present: false }
  ]);

  // Function to mark attendance
  const markPresent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: true } : student
      )
    );
  };

  const markAbsent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: false } : student
      )
    );
  };

  const toggleAttendance = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  // Calculate stats
  const presentCount = students.filter(student => student.present).length;
  const totalCount = students.length;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;



  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Class {selectedClass}-{selectedSection}</p>
            <p className="text-sm text-gray-600">{new Date().toLocaleDateString()}</p>
            <button onClick={() => navigate('/teacher-dashboard/')}className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all">Add Student</button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">Total Students</h3>
            <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">Present</h3>
            <p className="text-2xl font-bold text-green-600">{presentCount}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800">Absent</h3>
            <p className="text-2xl font-bold text-red-600">{totalCount - presentCount}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800">Attendance %</h3>
            <p className="text-2xl font-bold text-purple-600">{attendancePercentage}%</p>
          </div>
        </div>
      </div>



      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
          
         
          
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:shadow-lg transition-all">
            📊 Generate Report
          </button>
        </div>
      </div>

      {/* Student Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Student Roster</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {students.map((student) => (
            <div
              key={student.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                student.present
                  ? "bg-green-50 border-green-300 shadow-md"
                  : "bg-red-50 border-red-300"
              }`}
              onClick={() => toggleAttendance(student.id)}
            >
              {/* Student Avatar */}
              <div className="flex justify-center mb-3">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                  student.present ? "bg-green-500" : "bg-red-500"
                }`}>
                  {student.name.charAt(0)}
                </div>
              </div>
              
              {/* Student Info */}
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">{student.name}</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  student.present
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {student.present ? "✓ Present" : "✗ Absent"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markPresent(student.id);
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-xs transition duration-200"
                >
                  P
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markAbsent(student.id);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-xs transition duration-200"
                >
                  A
                </button>
                
              </div>
            </div>
          ))}
        </div><br />         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 

        <button 
            onClick={() => setStudents(students.map(s => ({...s, present: true})))}
            className=" bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
          >
            ✓ Mark All Present
          </button>&nbsp; &nbsp; &nbsp; &nbsp;
           <button 
            onClick={() => setStudents(students.map(s => ({...s, present: false})))}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
          >
            ✗ Mark All Absent
          </button>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500">
        <p>Automated Attendance System </p>
      </div>
    </div>
  );
};

export default TD2;