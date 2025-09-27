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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row overflow-hidden border border-gray-100">
        {/* Left side panel - Sign In or Welcome for Sign Up */}
        <div
          className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignIn ? "bg-white" : "bg-gradient-to-br from-emerald-600 to-teal-700 text-white"
          } rounded-t-2xl sm:rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none`}
        >
          {isSignIn ? (
            <>
              <div className="flex items-center mb-4 sm:mb-6">
                {userType === 'teacher' ? (
                  <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-2 sm:mr-3" />
                ) : (
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-2 sm:mr-3" />
                )}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center">
                  {userType === 'teacher' ? 'Teacher Portal' : 'Government Portal'}
                </h2>
              </div>
              
              {/* User Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-4 sm:mb-6 w-full max-w-xs">
                <button
                  onClick={() => setUserType('teacher')}
                  className={`flex-1 px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                    userType === 'teacher' 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Teacher
                </button>
                <button
                  onClick={() => setUserType('government')}
                  className={`flex-1 px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                    userType === 'government' 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  Government
                </button>
              </div>

              <p className="mb-6 sm:mb-8 text-gray-600 text-center text-sm sm:text-base px-4">
                {userType === 'teacher' 
                  ? 'Access attendance management and student records'
                  : 'Monitor school attendance and generate reports'
                }
              </p>
              
              <div className="w-full flex flex-col space-y-4 sm:space-y-5 max-w-sm">
                <input
                  type="text"
                  placeholder="School Name"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="password"
                  placeholder="School Password"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                
                {userType === 'teacher' && (
                  <input
                    type="text"
                    placeholder="Teacher ID (optional)"
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                )}
                
                {userType === 'government' && (
                  <select
                    required
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-600 text-sm sm:text-base"
                  >
                    <option value="">Select Department</option>
                    <option value="education">Department of Education</option>
                    <option value="district">District Education Office</option>
                    <option value="state">State Education Board</option>
                    <option value="inspection">School Inspection Team</option>
                  </select>
                )}

                <div className="text-right text-xs sm:text-sm text-emerald-600 cursor-pointer hover:underline font-medium">
                  Forgot Your Password?
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  {userType === 'teacher' ? 'ACCESS TEACHER PORTAL' : 'ACCESS GOVERNMENT PORTAL'}
                </button>
              </div>
              
              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-500">
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
              <div className="flex items-center mb-3 sm:mb-4">
                <School className="h-8 w-8 sm:h-10 sm:w-10 text-white mr-2 sm:mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold">Welcome Back!</h2>
              </div>
              <p className="mb-6 sm:mb-8 text-emerald-100 text-center leading-relaxed text-sm sm:text-base px-4">
                Your school is already registered. Sign in to access the attendance management system and monitoring tools.
              </p>
              <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200" />
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200" />
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200" />
              </div>
              <button
                onClick={() => setIsSignIn(true)}
                className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                BACK TO LOGIN
              </button>
            </>
          )}
        </div>

        {/* Right side panel - Registration or Welcome for Sign In */}
        <div
          className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignIn ? "bg-gradient-to-br from-emerald-600 to-teal-700 text-white" : "bg-white"
          } rounded-b-2xl sm:rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none`}
        >
          {isSignIn ? (
            <>
              <div className="flex items-center mb-3 sm:mb-4">
                <ClipboardCheck className="h-8 w-8 sm:h-10 sm:w-10 text-white mr-2 sm:mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold">New School?</h2>
              </div>
              <p className="mb-6 sm:mb-8 text-emerald-100 text-center leading-relaxed text-sm sm:text-base px-4">
                Register your school to enable attendance tracking, generate reports, and provide access to teachers and government officials.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-sm">
                <div className="text-center">
                  <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-emerald-100">Teacher Access</p>
                </div>
                <div className="text-center">
                  <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-emerald-100">Gov Monitoring</p>
                </div>
                <div className="text-center">
                  <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-emerald-100">Attendance Tracking</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-emerald-100">Report Generation</p>
                </div>
              </div>
              <button
                onClick={() => setIsSignIn(false)}
                className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                REGISTER SCHOOL
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center mb-3 sm:mb-4">
                <School className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-2 sm:mr-3" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center">School Registration</h2>
              </div>
              <p className="mb-4 sm:mb-6 text-gray-600 text-center text-sm sm:text-base px-4">Register your school for attendance management system</p>
              
              <div className="w-full flex flex-col space-y-3 sm:space-y-4 max-w-sm">
                <input
                  type="text"
                  placeholder="School Name"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="text"
                  placeholder="School Code/ID"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="text"
                  placeholder="Principal Name"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="School Email"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="tel"
                  placeholder="School Phone"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <textarea
                  placeholder="School Address"
                  required
                  rows="2"
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                ></textarea>
                <select
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-600 text-sm sm:text-base"
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
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="password"
                  placeholder="Confirm School Password"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
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