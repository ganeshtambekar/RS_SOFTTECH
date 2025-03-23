import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/APIService';

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        
        const userId = localStorage.getItem('userId');
        const response = await api.get(`/enrollments/user/${userId}`);
        setEnrollments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch enrollments');
        setLoading(false);
        console.error(err);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) return <div className="text-center py-8">Loading your enrollments...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">My Enrolled Courses</h3>
        
        {enrollments.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
              Browse Available Courses
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Enrollment Date
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Receipt
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment._id}>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <div className="flex items-center">
                        {enrollment.course.imageUrl && (
                          <img 
                            src={enrollment.course.imageUrl} 
                            alt={enrollment.course.title} 
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        )}
                        <div>
                          <p className="text-gray-900 font-medium">{enrollment.course.title}</p>
                          <p className="text-gray-500 text-sm">{enrollment.course.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        enrollment.status === 'active' ? 'bg-green-100 text-green-800' : 
                        enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <Link 
                        to={`/receipts/${enrollment.payment._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Receipt
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
        {enrollments.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No payment history available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={`payment-${enrollment.payment._id}`}>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <span className="text-sm text-gray-900">{enrollment.payment.razorpayPaymentId}</span>
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      {enrollment.course.title}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      {enrollment.payment.currency} {enrollment.payment.amount}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      {new Date(enrollment.payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 border-b border-gray-200">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        enrollment.payment.status === 'captured' ? 'bg-green-100 text-green-800' : 
                        enrollment.payment.status === 'authorized' ? 'bg-blue-100 text-blue-800' : 
                        enrollment.payment.status === 'failed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {enrollment.payment.status.charAt(0).toUpperCase() + enrollment.payment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;