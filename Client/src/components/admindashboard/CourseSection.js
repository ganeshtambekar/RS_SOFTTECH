import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import config from '../../config/config';

const CourseSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fees: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${config.API_URL}/admin/courses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setCourses(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.API_URL}/admin/course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setCourses([...courses, response.data.data]);
      setShowAddForm(false);
      setFormData({ title: '', description: '', fees: '' });
    } catch (err) {
      setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        setLoading(true);
        await axios.delete(`${config.API_URL}/admin/course/${courseId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete course');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Courses</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4" /> Add Course
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mb-6">
        <Input 
          placeholder="Search courses..." 
          className="max-w-md"
          icon={<Search className="h-4 w-4" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {(showAddForm || editingCourse) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <Input 
                placeholder="Course Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <Input 
                placeholder="Course Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
              <Input 
                placeholder="Fees"
                type="number"
                value={formData.fees}
                onChange={(e) => setFormData({...formData, fees: e.target.value})}
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
                    setFormData({ title: '', description: '', fees: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {loading && !courses.length ? (
          <div className="text-center py-8">Loading courses...</div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course._id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">{course.title}</CardTitle>
                  <p className="text-sm text-gray-500">{course.description}</p>
                </div>
                <div className="flex gap-2">
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
                <div className="text-sm text-gray-600">
                  <p>Fees: ₹{course.fees}</p>
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