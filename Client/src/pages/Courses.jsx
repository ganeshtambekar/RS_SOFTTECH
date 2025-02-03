// client/src/components/CourseList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({ category: 'all' });

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.getCourses(filters);
      setCourses(response.data);
    };
    fetchCourses();
  }, [filters]);

  return (
    <div className="course-grid">
      {courses.map(course => (
        <div key={course.id} className="course-card">
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <div className="course-meta">
            <span>Duration: {course.duration}</span>
            <span>Price: ₹{course.fees}</span>
          </div>
          <button className="enroll-btn">Enroll Now</button>
        </div>
      ))}
    </div>
  );
};