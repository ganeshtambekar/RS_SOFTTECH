
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { courseId, courseTitle, coursePrice } = location.state || {};
  
  useEffect(() => {
    if (!courseId || !courseTitle || !coursePrice) {
      toast.error("Course information is missing");
      setTimeout(() => navigate('/courses'), 2000);
    }
  }, [courseId, courseTitle, coursePrice, navigate]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      const formData = {
        name: courseTitle,
        amount: coursePrice,
        description: `Enrollment for ${courseTitle}`
      };
      
      const { data } = await axios.post('http://localhost:4000/api/payment/createOrder', formData);
      
      if (!data.success) {
        toast.error(data.msg || "Failed to create order");
        setLoading(false);
        return;
      }
      
      // Initialize Razorpay
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: "INR",
        name: "RS Softech",
        description: data.description,
        image: "https://dummyimage.com/600x400/000/fff",
        order_id: data.order_id,
        handler: function (response) {
          // Payment success
          toast.success("Payment Successful!");
          setTimeout(() => {
            navigate('/dashboard', { 
              state: { 
                enrolledCourse: {
                  id: courseId,
                  title: courseTitle,
                  price: coursePrice
                }
              }
            });
          }, 2000);
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.contact,
        },
        notes: {
          description: data.description
        },
        theme: {
          color: "#3c64b1"
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.info("Payment cancelled");
          },
        },
      };
      
      const rzp = new window.Razorpay(options);
      
      rzp.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again.");
        setLoading(false);
      });
      
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h2 className="text-xl font-bold">Course Enrollment</h2>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{courseTitle}</h3>
          
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Course Price</span>
              <span className="font-medium">${coursePrice}</span>
            </div>
            
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span className="text-blue-600">${coursePrice}</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <button 
              onClick={handlePayment}
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
            
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md font-medium transition duration-200"
            >
              Cancel
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your payment will be processed securely via Razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;