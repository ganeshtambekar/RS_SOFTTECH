
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { HelmetProvider } from "react-helmet-async";
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
import AdminDashboard from './components/admindashboard/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import AboutUs from './components/AboutUs';
import LoadingScreen from './components/LoadingScreen';
import CourseList from './components/CourseList';
import Dashboard from './components/Dashboard';
import Receipt from './components/Receipt';
const App = () => (
  <HelmetProvider>
  <Router>
    <LoadingScreen/>
    <Navbar />
    <Routes>
      <Route path={routes.home} element={<HomePage/>} />
      <Route path={routes.contact} element={<ContactPage />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.courses} element={<Courses/>}/>
      <Route path={routes.corporate} element={<Corporate/>}/>
      <Route path={routes.register} element={<RegisterPage />}/>
      <Route path={routes.admin} element={<AdminDashboard/>}/>
      <Route path={routes.student} element={<StudentDashboard/>}/>
      <Route path={routes.about} element={<AboutUs/>}/>
      <Route path={routes.lists}element={<CourseList />} />
      <Route path={routes.receipt} element={<Receipt/>} />
      <Route path={routes.dashboard}element={<Dashboard />} />
      {/* <Route path={routes.load} element={<LoadingScreen/>}/> */}
     
    </Routes>
  </Router>
  </HelmetProvider>
);

export default App;
