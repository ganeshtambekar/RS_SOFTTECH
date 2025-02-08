// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { LogIn, Lock, Mail } from 'lucide-react';

// const Login = () => {
//   // Validation Schema
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required'),
//     password: Yup.string()
//       .min(8, 'Password must be at least 8 characters')
//       .required('Password is required')
//   });

// const[isLogin,setIsLogin]=useState(true);
// const[formData,setFromData]=useState({
//   email:'',
//   password:'', 
// })
//   // Formik Form Handling
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: ''
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // Implement login logic
    
//       console.log('Login Submitted:', values);
//     }
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Login to RS Softtech
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Access your learning dashboard
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             {/* Email Input */}
//             <div className="mb-4">
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   placeholder="Email address"
//                   className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
//                     formik.touched.email && formik.errors.email
//                       ? 'border-red-500'
//                       : 'border-gray-300'
//                   } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                 />
//               </div>
//               {formik.touched.email && formik.errors.email && (
//                 <p className="mt-2 text-sm text-red-600">
//                   {formik.errors.email}
//                 </p>
//               )}
//             </div>

//             {/* Password Input */}
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   placeholder="Password"
//                   className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
//                     formik.touched.password && formik.errors.password
//                       ? 'border-red-500'
//                       : 'border-gray-300'
//                   } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.password}
//                 />
//               </div>
//               {formik.touched.password && formik.errors.password && (
//                 <p className="mt-2 text-sm text-red-600">
//                   {formik.errors.password}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
//                 Remember me
//               </label>
//             </div>

//             <div className="text-sm">
//               <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
//                 Forgot your password?
//               </a>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                 <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
//               </span>
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import config from '../config/config';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LogIn, Lock, Mail, User } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Validation Schemas
  const loginSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });

  const registerSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password')
  });

  // Formik Form Handling
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: isLogin ? loginSchema : registerSchema,


  //   onSubmit: async (values) => {
  //     try {
  //       const endpoint = isLogin ? '/login' : '/register';
  //       const response = await fetch(`${config.API_URL}${endpoint}`, 
  //         {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials:'include',
  //         body: JSON.stringify(values),
  //       });

  //       const data = await response.json();
        
  //       if (!response.ok) {
  //         throw new Error(data.message || 'Authentication failed');
  //       }

  //       if (data.token) {
  //         localStorage.setItem('token', data.token);
  //         // Redirect or update app state here
  //       }
  //     } catch (error) {
  //       console.error('Auth error:', error);
  //       // Handle error appropriately
  //     }
  //   }
  // });



  onSubmit: async (values) => {
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const response = await fetch(`${config.API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
  
      if (data.token) {
        localStorage.setItem('token', data.token);
  
        // Show correct success message
        alert(isLogin ? 'Login successful!' : 'Registration successful!');
  
        // Redirect user after login
        if (isLogin) {
          window.location.href = '/AdminDashboard'; // Change this to your dashboard or home page
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.message);
    }
  }
});
  

  const renderInput = (name, type, placeholder, icon) => (
    <div className="mb-4">
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border ${
            formik.touched[name] && formik.errors[name]
              ? 'border-red-500'
              : 'border-gray-300'
          } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {formik.errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Login to RS Softtech' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Access your learning dashboard' : 'Start your learning journey'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && renderInput('name', 'text', 'Full Name', <User className="h-5 w-5 text-gray-400" />)}
            {renderInput('email', 'email', 'Email address', <Mail className="h-5 w-5 text-gray-400" />)}
            {renderInput('password', 'password', 'Password', <Lock className="h-5 w-5 text-gray-400" />)}
            {!isLogin && renderInput('confirmPassword', 'password', 'Confirm Password', <Lock className="h-5 w-5 text-gray-400" />)}
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              </span>
              {isLogin ? 'Sign in' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              formik.resetForm();
            }}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;