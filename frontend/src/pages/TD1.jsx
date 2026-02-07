import React, { useState, useRef } from "react";
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
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  BookOpen,
  Settings,
  Home,
  FileText,
  TrendingUp,
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
  const [searchTerm, setSearchTerm] = useState("");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "upload", label: "Upload Photo", icon: Upload },
    { id: "records", label: "Student Records", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Today's Attendance</p>
              <p className="text-2xl font-bold">36/40</p>
              <p className="text-blue-100 text-sm">90% Present</p>
            </div>
            <UserCheck className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Students</p>
              <p className="text-2xl font-bold">40</p>
              <p className="text-green-100 text-sm">Active</p>
            </div>
            <Users className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
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

      {/* Attendance Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Weekly Attendance
          </h2>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip />
            <Bar dataKey="present" fill="#10B981" name="Present" />
            <Bar dataKey="absent" fill="#EF4444" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderUpload = () => <UploadStudents />;

  const renderRecords = () => <Records />;

  const renderReports = () => (
    <div className="text-center py-20">
      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-600">
        Reports Coming Soon
      </h2>
      <p className="text-gray-500 mt-2">
        Detailed attendance reports and analytics will be available here.
      </p>
    </div>
  );

  const renderSettings = () => (
    <div className="text-center py-20">
      <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-600">Settings</h2>
      <p className="text-gray-500 mt-2">
        System configuration options will be available here.
      </p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "upload":
        return renderUpload();
      case "records":
        return renderRecords();
      case "reports":
        return renderReports();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SA</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Smart Attendance
              </h1>
              <p className="text-sm text-gray-500">Teacher Portal</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
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
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
