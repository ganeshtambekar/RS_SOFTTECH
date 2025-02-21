
import axios from 'axios';
import config from '../config/config';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LogIn, Lock, Mail, User, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';

const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student'); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Validation Schema
  const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required')
  });

  // Formik Form Handling
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setMessage('');
        setError('');
        const endpoint = userType === 'admin' ? '/login' : '/login';
        const response = await axios.post(`${config.API_URL}${endpoint}`, values);

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userType', userType);
          setMessage(`${userType.charAt(0).toUpperCase() + userType.slice(1)} login successful!`);
          setTimeout(() => {
            window.location.href = userType === 'admin' ? '/AdminDashboard' : '/StudentDashboard';
          }, 1500);
        }
      } catch (error) {
        console.error('Auth error:', error);
        setError(error.response?.data?.message || 'Authentication failed');
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          {/* Toggle buttons for user type */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setUserType('student')}
              className={`flex items-center px-4 py-2 rounded-md ${userType === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <User className="h-5 w-5 mr-2" /> Student Login
            </button>
            <button
              onClick={() => setUserType('admin')}
              className={`flex items-center px-4 py-2 rounded-md ${userType === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              <UserCog className="h-5 w-5 mr-2" /> Admin Login
            </button>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{userType === 'admin' ? 'Admin Login' : 'Student Login'}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {userType === 'admin' ? 'Access your admin dashboard' : 'Access your learning dashboard'}
          </p>
        </div>

        {message && <p className="text-center text-green-600 font-semibold">{message}</p>}
        {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className={`appearance-none rounded-md w-full px-3 py-2 pl-10 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`appearance-none rounded-md w-full px-3 py-2 pl-10 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
            </span>
            Sign in as {userType}
          </button>
        </form>

        {userType === 'student' && (
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/RegisterPage')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Don't have an account? Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
