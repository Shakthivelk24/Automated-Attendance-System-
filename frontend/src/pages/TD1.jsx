import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Upload, Users, UserCheck, UserX, Search, Filter, Eye, Edit, 
  Calendar, BookOpen, Settings, Home, FileText, TrendingUp
} from 'lucide-react';

// Mock data
const mockStudents = [
  { id: 1, name: "Aarav Kumar", rollNo: "2024001", attendance: 95, totalClasses: 40, present: 38 },
  { id: 2, name: "Diya Sharma", rollNo: "2024002", attendance: 88, totalClasses: 40, present: 35 },
  { id: 3, name: "Arjun Patel", rollNo: "2024003", attendance: 92, totalClasses: 40, present: 37 },
  { id: 4, name: "Kavya Singh", rollNo: "2024004", attendance: 85, totalClasses: 40, present: 34 },
  { id: 5, name: "Rohan Gupta", rollNo: "2024005", attendance: 78, totalClasses: 40, present: 31 },
  { id: 6, name: "Ananya Reddy", rollNo: "2024006", attendance: 96, totalClasses: 40, present: 38 },
  { id: 7, name: "Vihan Joshi", rollNo: "2024007", attendance: 82, totalClasses: 40, present: 33 },
  { id: 8, name: "Ishita Agarwal", rollNo: "2024008", attendance: 90, totalClasses: 40, present: 36 }
];

const attendanceData = [
  { day: 'Mon', present: 35, absent: 5 },
  { day: 'Tue', present: 38, absent: 2 },
  { day: 'Wed', present: 32, absent: 8 },
  { day: 'Thu', present: 40, absent: 0 },
  { day: 'Fri', present: 36, absent: 4 },
];

const mockAttendanceResult = [
  { name: "Aarav Kumar", rollNo: "2024001", detected: true, confidence: 0.95 },
  { name: "Diya Sharma", rollNo: "2024002", detected: true, confidence: 0.92 },
  { name: "Arjun Patel", rollNo: "2024003", detected: false, confidence: 0 },
  { name: "Kavya Singh", rollNo: "2024004", detected: true, confidence: 0.88 },
  { name: "Rohan Gupta", rollNo: "2024005", detected: true, confidence: 0.91 },
];

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setShowResults(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setShowResults(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const processAttendance = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'upload', label: 'Upload Photo', icon: Upload },
    { id: 'records', label: 'Student Records', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
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
          <h2 className="text-xl font-semibold text-gray-900">Weekly Attendance</h2>
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

  const renderUpload = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Upload Class Photo</h1>
        <Calendar className="h-6 w-6 text-gray-400" />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="max-w-2xl mx-auto">
          {/* Upload Area */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {uploadedImage ? (
              <div className="space-y-4">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded class" 
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600">Class photo uploaded successfully!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Drop your class photo here</p>
                  <p className="text-sm text-gray-600">or click to browse files</p>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Choose File
            </label>
          </div>

          {/* Process Button */}
          {uploadedImage && !showResults && (
            <div className="mt-6 text-center">
              <button
                onClick={processAttendance}
                disabled={isProcessing}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Process Attendance'}
              </button>
            </div>
          )}

          {/* Results */}
          {showResults && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Results</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  {mockAttendanceResult.map((student, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.rollNo}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {student.detected ? (
                          <>
                            <UserCheck className="h-5 w-5 text-green-600" />
                            <span className="text-green-600 font-medium">Present</span>
                            <span className="text-xs text-gray-500">
                              ({Math.round(student.confidence * 100)}%)
                            </span>
                          </>
                        ) : (
                          <>
                            <UserX className="h-5 w-5 text-red-600" />
                            <span className="text-red-600 font-medium">Absent</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Student Records</h1>
        <BookOpen className="h-6 w-6 text-gray-400" />
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Students</option>
              <option>High Attendance (90%+)</option>
              <option>Medium Attendance (75-89%)</option>
              <option>Low Attendance (&lt;75%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.rollNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {student.attendance}%
                      </div>
                      <div className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        student.attendance >= 90 
                          ? 'bg-green-100 text-green-800'
                          : student.attendance >= 75
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.attendance >= 90 ? 'High' : student.attendance >= 75 ? 'Medium' : 'Low'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.present}/{student.totalClasses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="text-center py-20">
      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-600">Reports Coming Soon</h2>
      <p className="text-gray-500 mt-2">Detailed attendance reports and analytics will be available here.</p>
    </div>
  );

  const renderSettings = () => (
    <div className="text-center py-20">
      <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-600">Settings</h2>
      <p className="text-gray-500 mt-2">System configuration options will be available here.</p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'upload': return renderUpload();
      case 'records': return renderRecords();
      case 'reports': return renderReports();
      case 'settings': return renderSettings();
      default: return renderDashboard();
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
              <h1 className="text-lg font-bold text-gray-900">Smart Attendance</h1>
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
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600'
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
        <div className="h-full overflow-y-auto p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;