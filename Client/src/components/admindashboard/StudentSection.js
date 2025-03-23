import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/config';
import { Plus, Trash, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/Dialog';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';

const FormField = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </div>
);

const StudentSection = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isTestSeriesDialogOpen, setIsTestSeriesDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    enrolledCourses: [],
    feesPaid: false
  });
  const [testSeriesData, setTestSeriesData] = useState({
    testName: '',
    marks: ''
  });
  const [courseInput, setCourseInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const [studentsRes, coursesRes] = await Promise.all([
        axios.get(`${config.API_URL}/admin/students`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${config.API_URL}/admin/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStudents(studentsRes.data.data);
      setCourses(coursesRes.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch data');
      setLoading(false);
    }
  };

  const validateForm = () => {
    const missingFields = [];
    if (!formData.name) missingFields.push('Full Name');
    if (!formData.email) missingFields.push('Email');
    if (!formData.password) missingFields.push('Password');
    if (formData.enrolledCourses.length === 0) missingFields.push('Courses');

    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleAddStudent = async () => {
    try {
      if (!validateForm()) return;

      const token = localStorage.getItem('token');
      const studentData = {
        ...formData,
        enrolledCourses: formData.enrolledCourses
      };

      const response = await axios.post(`${config.API_URL}/admin/student`, studentData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed to add student');
      }

      fetchData();
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        enrolledCourses: [],
        feesPaid: false
      });
      setCourseInput('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add student');
    }
  };

  const handleAddTestSeries = async () => {
    try {
      if (!testSeriesData.testName || !testSeriesData.marks) {
        setError('Please fill in all test fields');
        return;
      }

      const token = localStorage.getItem('token');
      await axios.post(
        `${config.API_URL}/admin/test-series/${selectedStudent._id}`,
        { testName: testSeriesData.testName, marks: testSeriesData.marks },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchData();
      setIsTestSeriesDialogOpen(false);
      setTestSeriesData({ testName: '', marks: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add test marks');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${config.API_URL}/admin/students/${studentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete student');
      }
    }
  };

  const getCourseTitles = (courseIds) => {
    if (!courseIds || !Array.isArray(courseIds)) return [];
    return courseIds.map(id => 
      courses.find(c => c._id === id)?.title || 'Unknown Course'
    );
  };

  const handleCourseInput = (inputText) => {
    setCourseInput(inputText);
    const courseNames = inputText.split(',').map(name => name.trim());
    const courseIds = courseNames.map(name => {
      const course = courses.find(c => 
        c.title.toLowerCase() === name.toLowerCase()
      );
      return course?._id;
    }).filter(id => id);
    setFormData(prev => ({ ...prev, enrolledCourses: courseIds }));
  };

  const renderCourseList = (student) => {
    const courseTitles = getCourseTitles(student.enrolledCourses);
    return (
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Courses Enrolled:</span>
          <Badge variant="outline" className="text-sm">
            {courseTitles.length}
          </Badge>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          {courseTitles.map((title, index) => (
            <div key={index}>{title}</div>
          ))}
          {courseTitles.length === 0 && 'No courses enrolled'}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Fees Status:</span>
          <Badge variant={student.feesPaid ? 'default' : 'destructive'}>
            {student.feesPaid ? 'Paid' : 'Pending'}
          </Badge>
        </div>

        {student.testSeries?.length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Test Series Marks:</div>
            {student.testSeries.map((test, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{test.testName}:</span>
                <span className="font-medium">{test.marks}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    );
  };

  useEffect(() => {
    setError(null);
  }, [isAddDialogOpen, isTestSeriesDialogOpen]);

  if (loading) return (
    <div className="p-6 flex justify-center items-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error && !isAddDialogOpen && !isTestSeriesDialogOpen) return (
    <div className="p-6 text-red-600 bg-red-50 rounded-md border border-red-200">
      {error}
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      {students.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500">No students found. Add your first student to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map(student => (
            <Card key={student._id} className="relative shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{student.name}</CardTitle>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteStudent(student._id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {renderCourseList(student)}

              <div className="p-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedStudent(student);
                    setIsTestSeriesDialogOpen(true);
                  }}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add Test Marks
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>

          {error && <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}

          <div className="space-y-4">
            <FormField label="Full Name *">
              <Input
                placeholder="Enter student's full name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
              {!formData.name && <div className="text-xs text-red-500 mt-1">Full name is required</div>}
            </FormField>

            <FormField label="Email Address *">
              <Input
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
              {!formData.email && <div className="text-xs text-red-500 mt-1">Email is required</div>}
            </FormField>

            <FormField label="Password *">
              <Input
                type="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              {!formData.password && <div className="text-xs text-red-500 mt-1">Password is required</div>}
            </FormField>

            <FormField label="Enroll in Courses *">
              <Input
                type="text"
                placeholder="Enter course names separated by commas"
                value={courseInput}
                onChange={e => handleCourseInput(e.target.value)}
              />
              <div className="mt-2 text-sm text-gray-500">
                Available courses: {courses.map(c => c.title).join(', ')}
                {formData.enrolledCourses.length !== courseInput.split(',').filter(n => n.trim()).length && (
                  <div className="text-red-500 mt-1">
                    Warning: Some entered courses don't exist
                  </div>
                )}
              </div>
            </FormField>

            <FormField label="Fee Status">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="feesPaid"
                  checked={formData.feesPaid}
                  onChange={e => setFormData({ ...formData, feesPaid: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="feesPaid" className="text-sm">Fees Paid</label>
              </div>
            </FormField>
          </div>

          <div className="text-xs text-gray-500 mt-2">* Required fields</div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStudent}>
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTestSeriesDialogOpen} onOpenChange={setIsTestSeriesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Test Marks for {selectedStudent?.name}</DialogTitle>
          </DialogHeader>

          {error && <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">{error}</div>}

          <div className="space-y-4">
            <FormField label="Test Name *">
              <Input
                placeholder="Enter test name"
                value={testSeriesData.testName}
                onChange={e => setTestSeriesData({ ...testSeriesData, testName: e.target.value })}
              />
              {!testSeriesData.testName && <div className="text-xs text-red-500 mt-1">Test name is required</div>}
            </FormField>

            <FormField label="Marks *">
              <Input
                type="number"
                placeholder="Enter marks obtained"
                value={testSeriesData.marks}
                onChange={e => setTestSeriesData({ ...testSeriesData, marks: e.target.value })}
              />
              {!testSeriesData.marks && <div className="text-xs text-red-500 mt-1">Marks are required</div>}
            </FormField>
          </div>

          <div className="text-xs text-gray-500 mt-2">* Required fields</div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestSeriesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTestSeries}>Add Marks</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentSection;