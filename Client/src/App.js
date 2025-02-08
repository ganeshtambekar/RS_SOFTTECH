
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import  Navbar from '../src/components/Navbar';
import HomePage from './components/HomePage';
import Courses from './components/Courses';
import Corporate from './components/Corporate';
import Blog from './components/Blog';
import { Contact } from 'lucide-react';
import routes from './constants/routes';
import ContactPage from './components/ContactPage';
import Login from './components/Login';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path={routes.home} element={<HomePage/>} />
      <Route path={routes.blog} element={<Blog />} />
      <Route path={routes.contact} element={<ContactPage />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.courses} element={<Courses/>}/>
      <Route path={routes.corporate} element={<Corporate/>}/>
      <Route path={routes.register} element={<RegisterPage />} />
      <Route path={routes.admin} element={<AdminDashboard/>}/>
    </Routes>
  </Router>
);

export default App;
