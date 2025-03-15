import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';
import { Plus, Settings, Search, X, Trash, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/Dialog";

const StudentSection = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    courses: '',
    feesPaid: '',
    testMarks: '',
    status: 'Active'
  });
  const [formErrors, setFormErrors] = useState({});

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        showNotification("Authentication failed. Please log in.", "error");
        return;
      }

      const response = await axios.get(`${config.API_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents(response.data);
    } catch (err) {
      setError(err.message);
      showNotification("Failed to fetch students. Please log in again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.courses.trim()) errors.courses = 'At least one course is required';
    if (!formData.feesPaid) errors.feesPaid = 'Fees amount is required';
    if (isNaN(formData.feesPaid) || parseFloat(formData.feesPaid) < 0) {
      errors.feesPaid = 'Please enter a valid fees amount';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddStudent = async () => {
    if (!validateForm()) {
      showNotification('Please fill all required fields correctly', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        showNotification("Authentication failed. Please log in.", "error");
        return;
      }

      const courseNames = formData.courses.split(',').map(course => course.trim());
      const { data: courseList } = await axios.get(`${config.API_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const courseIds = courseList
        .filter(course => courseNames.includes(course.name))
        .map(course => course._id);

      if (courseIds.length !== courseNames.length) {
        showNotification("Some courses were not found. Please check course names.", "error");
        return;
      }

      const studentData = {
        name: formData.name.trim(),
        enrolledCourses: courseIds,
        feesPaid: parseFloat(formData.feesPaid) || 0,
        testSeriesMarks: formData.testMarks
          ? formData.testMarks.split(',').map((mark, index) => ({
              test: `Test ${index + 1}`,
              marks: parseInt(mark.trim()) || 0
            }))
          : [],
        status: formData.status
      };

      await axios.post(`${config.API_URL}/students`, studentData, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
      });

      showNotification("Student added successfully!", "success");
      await fetchStudents();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to add student. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        courses: '',
        feesPaid: '',
        testMarks: '',
        status: 'Active'
      });
    }
  };

  return (
    <div className="p-6 relative">
      {notification && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${
            notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Students</h2>
          <p className="text-gray-600">Total Students: {students.length}</p>
        </div>
        <button 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add Student
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map(student => (
            <Card key={student._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{student.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Courses:</span> {student.enrolledCourses.join(', ')}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Fees Paid:</span> ₹{student.feesPaid}
                  </p>
                  {student.testSeriesMarks?.length > 0 && (
                    <p className="text-sm">
                      <span className="font-medium">Test Marks:</span>{' '}
                      {student.testSeriesMarks.map(test => `${test.test}: ${test.marks}`).join(', ')}
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`${student.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                      {student.status}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">Student Name*</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Courses* (comma separated)</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${formErrors.courses ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.courses}
                onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                placeholder="e.g. Mathematics, Physics"
              />
              {formErrors.courses && <p className="text-red-500 text-sm mt-1">{formErrors.courses}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fees Paid*</label>
              <input
                type="number"
                className={`w-full p-2 border rounded-md ${formErrors.feesPaid ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.feesPaid}
                onChange={(e) => setFormData({ ...formData, feesPaid: e.target.value })}
                placeholder="Enter fees amount"
              />
              {formErrors.feesPaid && <p className="text-red-500 text-sm mt-1">{formErrors.feesPaid}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Test Marks (comma separated)</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md border-gray-300"
                value={formData.testMarks}
                onChange={(e) => setFormData({ ...formData, testMarks: e.target.value })}
                placeholder="e.g. 85, 92"
              />
              <p className="text-gray-500 text-sm mt-1">Optional: Enter marks separated by commas</p>
            </div>
          </div>

          <DialogFooter>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => {
                setIsAddDialogOpen(false);
                setFormErrors({});
              }}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-2 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleAddStudent}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Student'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentSection;