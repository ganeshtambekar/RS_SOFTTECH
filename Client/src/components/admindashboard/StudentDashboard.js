import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Book, Calendar, GraduationCap, LogOut } from 'lucide-react';
import config from '../../config/config';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    enrolledCourses: [],
    availableCourses: [],
    testResults: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (!token || userType !== 'student') {
      navigate('/login');
      return;  
    }

    const fetchStudentData = async () => {
      try {
        const [enrolledResponse, availableResponse, testsResponse] = await Promise.all([
          axios.get(`${config.API_URL}/admin/students`, {
          headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${config.API_URL}/admin/courses`, {
           headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${config.API_URL}/`, {
           headers: { Authorization: `Bearer ${token}` }
          })
        ]);
   
        setDashboardData({
          enrolledCourses: enrolledResponse.data || [],
          availableCourses: availableResponse.data || [],
          testResults: testsResponse.data || []
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
        if (err.response?.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/login');
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

        <div className="grid gap-6 md:grid-cols-3">
          {/* Available Courses Section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Book className="h-5 w-5 mr-2 text-blue-600" />
                Available Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Course Name</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Instructor</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Schedule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.availableCourses.map((course) => (
                      <tr key={course.id} className="border-b border-gray-200">
                        <td className="px-4 py-2 font-medium">{course.name}</td>
                        <td className="px-4 py-2">{course.instructor}</td>
                        <td className="px-4 py-2">
                          {new Date(course.startDate).toLocaleDateString()} - 
                          {new Date(course.endDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Enrolled Courses Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                My Enrollments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.enrolledCourses.map((course) => (
                  <div key={course.id} className="border-b pb-2">
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-gray-500">
                      Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {dashboardData.enrolledCourses.length === 0 && (
                  <p className="text-gray-500 text-center">No course enrollments</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Test Results Section */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Test</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Course</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Score</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.testResults.map((result) => (
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
                        <td className="px-4 py-2">
                          {new Date(result.testDate).toLocaleDateString()}
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