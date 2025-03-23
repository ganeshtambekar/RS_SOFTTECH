import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/APIService'
import { loadRazorpay, createOrder } from '../services/razorpay';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (course) => {
    try {
      // Show a form to collect user details
      const userDetails = await collectUserDetails();
      
      if (!userDetails) return; // User cancelled the form
      
      // Load Razorpay script
      const razorpay = await loadRazorpay();
      
      if (!razorpay) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        return;
      }
      
      // Create order
      const orderData = {
        courseId: course._id,
        amount: course.price,
        currency: course.currency || 'INR',
        userDetails
      };
      
      const order = await createOrder(orderData);
      
      if (!order.success) {
        alert('Failed to create order');
        return;
      }
      
      // Configure Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.order.amount,
        currency: order.order.currency,
        name: 'Course Platform',
        description: `Enrollment for ${course.title}`,
        order_id: order.order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyData = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course._id,
              userId: order.user.id
            };
            
            const verifyResponse = await api.post('/payments/verify', verifyData);
            
            if (verifyResponse.data.success) {
              // Navigate to receipt page
              navigate(`/receipts/${verifyResponse.data.payment._id}`);
            } else {
              alert('Payment verification failed');
            }
          } catch (err) {
            console.error('Error verifying payment:', err);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: '#3399cc'
        }
      };
      
      // Open Razorpay checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Error initiating enrollment:', err);
      alert('Failed to initiate enrollment process');
    }
  };

  // Helper function to collect user details
  const collectUserDetails = () => {
    return new Promise((resolve) => {
      // You can implement a modal or form here
      // For simplicity, we'll use prompt
      const name = prompt('Enter your full name:');
      if (!name) {
        resolve(null);
        return;
      }
      
      const email = prompt('Enter your email:');
      if (!email) {
        resolve(null);
        return;
      }
      
      const phone = prompt('Enter your phone number:');
      if (!phone) {
        resolve(null);
        return;
      }
      
      resolve({ name, email, phone });
    });
  };

  if (loading) return <div className="text-center py-8">Loading courses...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {course.imageUrl && (
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{course.currency} {course.price}</span>
                <button 
                  onClick={() => handleEnroll(course)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md text-sm transition duration-200"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;