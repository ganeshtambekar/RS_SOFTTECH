// client/src/pages/Home.jsx
import React from 'react';
import { CourseCarousel, Testimonials } from '../components';

const Home = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <h1>Welcome to RS Softtech</h1>
        <p>Transform your career with industry-leading courses</p>
        <div className="cta-buttons">
          <button className="btn-primary">Explore Courses</button>
          <button className="btn-secondary">Contact Us</button>
        </div>
      </section>
      
      <CourseCarousel />
      <Testimonials />
    </div>
  );
};