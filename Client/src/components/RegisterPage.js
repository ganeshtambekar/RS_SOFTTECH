import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import config from '../config/config';

const RegisterPage = () => {
  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must include uppercase, lowercase, number, and special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  // Formik Form Handling
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:4000/api/register', {
          name: values.name,
          email: values.email,
          password: values.password
        });
        
        console.log('Registration successful:', response.data);
        // Handle successful registration (e.g., show success message, redirect)
        
      } catch (error) {
        console.error('Registration failed:', error);
        if (error.response) {
          console.log('Error data:', error.response.data);
        }
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <UserPlus className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join RS Softtech and start your learning journey
          </p>
        </div>

        <form 
          className="mt-8 space-y-6" 
          onSubmit={formik.handleSubmit}
        >
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="sr-only">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
                  formik.touched.email && formik.errors.email
                    ? 'border-red-500'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm Password"
                className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </div>

          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;



