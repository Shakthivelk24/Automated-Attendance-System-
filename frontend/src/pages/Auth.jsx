import React, { useState } from "react";
import { Shield, School, Users, ClipboardCheck, BookOpen, UserCheck } from "lucide-react";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState('teacher'); // 'teacher' or 'government'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted for:", userType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full flex overflow-hidden border border-gray-100">
        {/* Left side panel - Sign In or Welcome for Sign Up */}
        <div
          className={`w-1/2 p-12 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignIn ? "bg-white" : "bg-gradient-to-br from-emerald-600 to-teal-700 text-white"
          } rounded-l-3xl`}
        >
          {isSignIn ? (
            <>
              <div className="flex items-center mb-6">
                {userType === 'teacher' ? (
                  <UserCheck className="h-8 w-8 text-emerald-600 mr-3" />
                ) : (
                  <Shield className="h-8 w-8 text-emerald-600 mr-3" />
                )}
                <h2 className="text-3xl font-bold text-gray-800">
                  {userType === 'teacher' ? 'Teacher Portal' : 'Government Portal'}
                </h2>
              </div>
              
              {/* User Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setUserType('teacher')}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
                    userType === 'teacher' 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Teacher
                </button>
                <button
                  onClick={() => setUserType('government')}
                  className={`px-6 py-2 rounded-md font-medium transition-all ${
                    userType === 'government' 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Government
                </button>
              </div>

              <p className="mb-8 text-gray-600 text-center">
                {userType === 'teacher' 
                  ? 'Access attendance management and student records'
                  : 'Monitor school attendance and generate reports'
                }
              </p>
              
              <div className="w-full flex flex-col space-y-5">
                <input
                  type="text"
                  placeholder="School Name"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <input
                  type="password"
                  placeholder="School Password"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                
                {userType === 'teacher' && (
                  <input
                    type="text"
                    placeholder="Teacher ID (optional)"
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                )}
                
                {userType === 'government' && (
                  <select
                    required
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-600"
                  >
                    <option value="">Select Department</option>
                    <option value="education">Department of Education</option>
                    <option value="district">District Education Office</option>
                    <option value="state">State Education Board</option>
                    <option value="inspection">School Inspection Team</option>
                  </select>
                )}

                <div className="text-right text-sm text-emerald-600 cursor-pointer hover:underline font-medium">
                  Forgot Your Password?
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  {userType === 'teacher' ? 'ACCESS TEACHER PORTAL' : 'ACCESS GOVERNMENT PORTAL'}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  School not registered? 
                  <span 
                    onClick={() => setIsSignIn(false)}
                    className="text-emerald-600 cursor-pointer hover:underline font-medium ml-1"
                  >
                    Register your school
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <School className="h-10 w-10 text-white mr-3" />
                <h2 className="text-3xl font-bold">Welcome Back!</h2>
              </div>
              <p className="mb-8 text-emerald-100 text-center leading-relaxed">
                Your school is already registered. Sign in to access the attendance management system and monitoring tools.
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <ClipboardCheck className="h-8 w-8 text-emerald-200" />
                <Users className="h-8 w-8 text-emerald-200" />
                <BookOpen className="h-8 w-8 text-emerald-200" />
              </div>
              <button
                onClick={() => setIsSignIn(true)}
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-all transform hover:scale-105"
              >
                BACK TO LOGIN
              </button>
            </>
          )}
        </div>

        {/* Right side panel - Registration or Welcome for Sign In */}
        <div
          className={`w-1/2 p-12 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignIn ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-r-3xl" : "bg-white rounded-r-3xl"
          }`}
        >
          {isSignIn ? (
            <>
              <div className="flex items-center mb-4">
                <ClipboardCheck className="h-10 w-10 text-white mr-3" />
                <h2 className="text-3xl font-bold">New School?</h2>
              </div>
              <p className="mb-8 text-emerald-100 text-center leading-relaxed">
                Register your school to enable attendance tracking, generate reports, and provide access to teachers and government officials.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center">
                  <UserCheck className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                  <p className="text-sm text-emerald-100">Teacher Access</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                  <p className="text-sm text-emerald-100">Gov Monitoring</p>
                </div>
                <div className="text-center">
                  <ClipboardCheck className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                  <p className="text-sm text-emerald-100">Attendance Tracking</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-8 w-8 text-emerald-200 mx-auto mb-2" />
                  <p className="text-sm text-emerald-100">Report Generation</p>
                </div>
              </div>
              <button
                onClick={() => setIsSignIn(false)}
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-all transform hover:scale-105"
              >
                REGISTER SCHOOL
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <School className="h-8 w-8 text-emerald-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">School Registration</h2>
              </div>
              <p className="mb-6 text-gray-600 text-center">Register your school for attendance management system</p>
              
              <div className="w-full flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="School Name"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  placeholder="School Code/ID"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <input
                  type="text"
                  placeholder="Principal Name"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <input
                  type="email"
                  placeholder="School Email"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <input
                  type="tel"
                  placeholder="School Phone"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <textarea
                  placeholder="School Address"
                  required
                  rows="2"
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                ></textarea>
                <select
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-600"
                >
                  <option value="">Select School Type</option>
                  <option value="primary">Primary School</option>
                  <option value="secondary">Secondary School</option>
                  <option value="high">High School</option>
                  <option value="combined">Combined School</option>
                </select>
                <input
                  type="password"
                  placeholder="Set School Password"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <input
                  type="password"
                  placeholder="Confirm School Password"
                  required
                  className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  REGISTER SCHOOL
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}