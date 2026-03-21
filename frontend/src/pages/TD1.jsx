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

import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "attendance", label: "Take Attendance", icon: UserCheck },
    { id: "upload", label: "Upload Photo", icon: Upload },
    { id: "records", label: "Student Records", icon: Users },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-5 rounded-xl">
          <p>Today's Attendance</p>
          <h2 className="text-xl font-bold">36/40</h2>
        </div>

        <div className="bg-green-500 text-white p-5 rounded-xl">
          <p>Total Students</p>
          <h2 className="text-xl font-bold">40</h2>
        </div>

        <div className="bg-red-500 text-white p-5 rounded-xl">
          <p>Absentees</p>
          <h2 className="text-xl font-bold">4</h2>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={250}>
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
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow">
        <div className="p-6 font-bold">Smart Attendance</div>

        {sidebarItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              if (id === "attendance") {
                navigate("/teacher-dashboard/td3"); // 🔥 navigation
              } else {
                setActiveTab(id);
              }
            }}
            className="w-full flex items-center px-6 py-3 hover:bg-blue-50"
          >
            <Icon className="mr-3" />
            {label}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white shadow">Teacher Dashboard</div>

        <div className="flex-1 p-4 pb-20">{renderContent()}</div>
      </div>

      {/* 🔥 Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2">
        <button onClick={() => setActiveTab("dashboard")}>
          <Home />
          <p className="text-xs">Home</p>
        </button>

        <button onClick={() => navigate("/attendance")}>
          <UserCheck />
          <p className="text-xs">Attendance</p>
        </button>

        <button onClick={() => setActiveTab("records")}>
          <Users />
          <p className="text-xs">Records</p>
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;