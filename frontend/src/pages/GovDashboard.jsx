import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function GovDashboard() {
  // Dummy data for schools and attendance (Class 1-12)
  const [schools] = useState([
    {
      id: 1,
      name: "Sunrise Primary School",
      classes: {
        "Class 1": 95, "Class 2": 92, "Class 3": 88, "Class 4": 91, "Class 5": 94
      },
    },
    {
      id: 2,
      name: "Green Valley High School",
      classes: {
        "Class 6": 90, "Class 7": 85, "Class 8": 87, "Class 9": 89, "Class 10": 88
      },
    },
    {
      id: 3,
      name: "Hilltop Secondary School",
      classes: {
        "Class 9": 93, "Class 10": 89, "Class 11": 87, "Class 12": 91
      },
    },
    {
      id: 4,
      name: "Riverside Primary School",
      classes: {
        "Class 1": 91, "Class 2": 89, "Class 3": 94, "Class 4": 92, "Class 5": 90
      },
    },
    {
      id: 5,
      name: "Maple Leaf High School",
      classes: {
        "Class 6": 88, "Class 7": 90, "Class 8": 86, "Class 9": 89, "Class 10": 87
      },
    },
    {
      id: 6,
      name: "Cedar Valley Secondary School",
      classes: {
        "Class 9": 92, "Class 10": 90, "Class 11": 88, "Class 12": 91
      },
    },
  ]);

  const [selectedSchool, setSelectedSchool] = useState(null);

  // Prepare chart data
  const getChartData = (school) => {
    return Object.entries(school.classes).map(([className, attendance]) => ({
      name: className,
      attendance: attendance,
      fill: attendance >= 90 ? '#10b981' : attendance >= 80 ? '#f59e0b' : '#ef4444'
    }));
  };

  // Colors for pie chart
  const COLORS = ['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  // Calculate average attendance
  const getAverageAttendance = (school) => {
    const attendances = Object.values(school.classes);
    return Math.round(attendances.reduce((sum, att) => sum + att, 0) / attendances.length);
  };

  // Get attendance status
  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return { status: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (percentage >= 80) return { status: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'Needs Attention', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-25 to-green-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-r from-cyan-100 to-green-100 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 p-8">
        <h1 className="text-5xl font-bold mb-12 text-gray-800 text-center drop-shadow-lg">
          🏛️ Government Education Dashboard
        </h1>

        {!selectedSchool ? (
          <>
            <h2 className="text-3xl font-semibold mb-8 text-gray-700 text-center drop-shadow-md">
              📚 Registered Schools Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {schools.map((school) => {
                const avgAttendance = getAverageAttendance(school);
                const status = getAttendanceStatus(avgAttendance);
                return (
                  <div
                    key={school.id}
                    onClick={() => setSelectedSchool(school)}
                    className="bg-gradient-to-tr from-blue-500 via-teal-400 to-green-500 p-8 rounded-3xl shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:from-blue-600 hover:via-teal-500 hover:to-green-600"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
                      🎓 {school.name}
                    </h3>
                    <div className="mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                        {status.status}
                      </div>
                    </div>
                    <p className="text-gray-100 mb-3 font-medium">
                      📊 Classes: {Object.keys(school.classes).join(", ")}
                    </p>
                    <p className="text-gray-200 mb-3">
                      📈 Average Attendance: <span className="text-white font-bold">{avgAttendance}%</span>
                    </p>
                    <p className="text-gray-300 text-sm">
                      Click to view detailed analytics
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedSchool(null)}
              className="mb-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ← Back to Schools
            </button>
            
            <div className="bg-gradient-to-br from-blue-600 via-teal-500 to-green-600 backdrop-blur-lg border border-blue-300/30 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-4xl font-semibold mb-2 text-white drop-shadow-lg">
                📊 {selectedSchool.name}
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Attendance Analytics Dashboard
              </p>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-emerald-500/40 to-green-600/40 backdrop-blur-sm border border-emerald-300/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-emerald-100 mb-2">📈 Average Attendance</h3>
                  <p className="text-3xl font-bold text-white">{getAverageAttendance(selectedSchool)}%</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500/40 to-cyan-600/40 backdrop-blur-sm border border-blue-300/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-100 mb-2">🏫 Total Classes</h3>
                  <p className="text-3xl font-bold text-white">{Object.keys(selectedSchool.classes).length}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/40 to-pink-600/40 backdrop-blur-sm border border-purple-300/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-100 mb-2">⭐ Best Class</h3>
                  <p className="text-xl font-bold text-white">
                    {Object.entries(selectedSchool.classes).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
                  </p>
                </div>
              </div>

              {/* Charts Container */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 text-center">📊 Class-wise Attendance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getChartData(selectedSchool)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                      <XAxis dataKey="name" tick={{ fill: '#f3f4f6', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#f3f4f6', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(234, 237, 244, 0.9)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#131010ff'
                        }} 
                      />
                      <Bar dataKey="attendance" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 text-center">🥧 Attendance Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={getChartData(selectedSchool)}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="attendance"
                      >
                        {getChartData(selectedSchool).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(240, 244, 37, 0.9)', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#fff'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Class Data */}
              <div className="mt-8 bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl p-6">
                <h3 className="text-2xl font-semibold text-white mb-6">📋 Detailed Class Performance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedSchool.classes).map(([className, attendance]) => {
                    const status = getAttendanceStatus(attendance);
                    return (
                      <div
                        key={className}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 hover:bg-white/30 transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-white">{className}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                            {status.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-white">{attendance}%</span>
                          <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                attendance >= 90 ? 'bg-green-400' : 
                                attendance >= 80 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}
                              style={{ width: `${attendance}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}