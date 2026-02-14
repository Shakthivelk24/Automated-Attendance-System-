import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Upload,
  Users,
  UserCheck,
  UserX,
  Menu,
  X,
  FileText,
  TrendingUp,
  Settings,
  Home,
} from "lucide-react";

import UploadStudents from "../../components/teacher/UploadStudents";
import Records from "../../components/teacher/Records";

const attendanceData = [
  { day: "Mon", present: 35, absent: 5 },
  { day: "Tue", present: 38, absent: 2 },
  { day: "Wed", present: 32, absent: 8 },
  { day: "Thu", present: 40, absent: 0 },
  { day: "Fri", present: 36, absent: 4 },
];

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "upload", label: "Upload Photo", icon: Upload },
    { id: "records", label: "Student Records", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Today's Attendance</p>
              <p className="text-2xl font-bold">36/40</p>
              <p className="text-blue-100 text-sm">90% Present</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Students</p>
              <p className="text-2xl font-bold">40</p>
              <p className="text-green-100 text-sm">Active</p>
            </div>
            <Users className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Absentees</p>
              <p className="text-2xl font-bold">4</p>
              <p className="text-red-100 text-sm">Today</p>
            </div>
            <UserX className="h-8 w-8 text-red-200" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Weekly Attendance
          </h2>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip />
            <Bar dataKey="present" fill="#10B981" />
            <Bar dataKey="absent" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <UploadStudents />;
      case "records":
        return <Records />;
      case "reports":
        return (
          <div className="text-center py-20 text-gray-500">
            Reports Coming Soon
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-20 text-gray-500">Settings Page</div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Smart Attendance
            </h1>
            <p className="text-sm text-gray-500">Teacher Portal</p>
          </div>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition ${
                activeTab === id
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar (Mobile) */}
        <div className="lg:hidden bg-white shadow p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="font-semibold">Teacher Dashboard</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
