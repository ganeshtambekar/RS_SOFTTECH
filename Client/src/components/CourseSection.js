// CourseSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import config from '../config/config'


const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);


  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/courses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCourses(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  // Add new course
  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${config.API_URL}/courses`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCourses([...courses, response.data]);
      setShowAddForm(false);
      setFormData({ name: '', description: '', duration: '', price: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add course');
    } finally {
      setLoading(false);
    }
  };

  // Update course
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${config.API_URL}/courses/${editingCourse._id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setCourses(courses.map(course => 
        course._id === editingCourse._id ? response.data : course
      ));
      setEditingCourse(null);
      setFormData({ name: '', description: '', duration: '', price: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  // Delete course
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        setLoading(true);
        await axios.delete(`${config.API_URL}/courses/${courseId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete course');
      } finally {
        setLoading(false);
      }
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );
  

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Courses</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4" /> Add Course
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <Input 
          placeholder="Search courses..." 
          className="max-w-md"
          icon={<Search className="h-4 w-4" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingCourse) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse} className="space-y-4">
              <Input 
                placeholder="Course Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <Input 
                placeholder="Course Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              <Input 
                placeholder="Duration (in weeks)"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                required
              />
              <Input 
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Course'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingCourse(null);
                    setFormData({ name: '', description: '', duration: '', price: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Course List */}
      <div className="grid gap-4">
        {loading && !courses.length ? (
          <div className="text-center py-8">Loading courses...</div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course._id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">{course.name}</CardTitle>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      setEditingCourse(course);
                      setFormData({
                        name: course.name,
                        description: course.description,
                        duration: course.duration,
                        price: course.price
                      });
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span>Duration: {course.duration} weeks</span>
                  </div>
                  <div>
                    <span>Price: ${course.price}</span>
                  </div>
                  <div>
                    <span>Enrolled: {course.enrolledStudents?.length || 0} students</span>
                  </div>
                  <div>
                    <span>Active Staff: {course.staff?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        {!loading && !filteredCourses.length && (
          <div className="text-center py-8 text-gray-500">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSection;