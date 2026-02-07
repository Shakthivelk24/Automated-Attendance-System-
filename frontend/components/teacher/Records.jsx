import {useState} from 'react';
import { Search, Filter, Eye, Edit, BookOpen } from 'lucide-react';

const Records = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredStudents = mockStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

 

  return (
    <>
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
    </>
  )
}

export default Records