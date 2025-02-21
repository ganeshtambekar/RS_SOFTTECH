import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Book, Calendar, GraduationCap, LogOut } from 'lucide-react';
import config from '../config/config';
const  StudentDashboard = () => {
  const [studentData, setStudentData] = useState({
    enrolledCourses: [],
    testResults: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}${'/students'}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setStudentData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        if (err.response?.status === 401) {
          window.location.href = '/login';
        }
      }
    };

    fetchStudentData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="h-8 w-8 mr-2 text-blue-600" />
            Student Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Enrolled Courses Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Book className="h-5 w-5 mr-2 text-blue-600" />
                Enrolled Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Course Name</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Enrollment Date
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.enrolledCourses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">{course.name}</td>
                        <td className="px-4 py-2">
                          {new Date(course.enrollmentDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Test Series Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Test Series Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Test Name</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Course</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData.testResults.map((result) => (
                      <tr key={result.id} className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">{result.testName}</td>
                        <td className="px-4 py-2">{result.courseName}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            result.marks >= 75 ? 'bg-green-100 text-green-800' :
                            result.marks >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.marks}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
