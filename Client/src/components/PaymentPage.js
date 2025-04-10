import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreditCard, Check, ArrowLeft, RefreshCw } from 'lucide-react';

// ✅ Mocked initiatePayment function
const initiatePayment = async (courseId, courseTitle, coursePrice) => {
  console.log('Mock: initiating payment for', courseTitle);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        paymentId: 'mock_payment_id_123',
      });
    }, 1000);
  });
};

// ✅ Mocked completePayment function
const completePayment = (paymentId, courseId) => {
  console.log('Mock: completed payment', paymentId, 'for course', courseId);
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: ''
  });

  const courseInfo = location.state || {
    courseId: null,
    courseTitle: 'Unknown Course',
    coursePrice: 0
  };

  useEffect(() => {
    if (!courseInfo.courseId) {
      toast.error('Course information is missing');
      setTimeout(() => navigate('/courses'), 2000);
    }
  }, [courseInfo, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === 'card') {
        if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
          throw new Error('Please fill in all card details');
        }
      }

      if (!formData.email) {
        throw new Error('Email is required');
      }

      const response = await initiatePayment(
        courseInfo.courseId,
        courseInfo.courseTitle,
        courseInfo.coursePrice
      );

      if (response.success) {
        setTimeout(() => {
          setPaymentSuccess(true);
          setLoading(false);
          toast.success('Payment successful!');
          completePayment(response.paymentId, courseInfo.courseId);
        }, 2000);
      } else {
        throw new Error(response.message || 'Payment failed');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate('/courses')}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Courses
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-4 px-6">
            <h1 className="text-xl font-bold text-white">Complete Your Enrollment</h1>
          </div>

          {paymentSuccess ? (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for enrolling in <span className="font-semibold">{courseInfo.courseTitle}</span>.
                You can now access your course content.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium">{courseInfo.courseTitle}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${courseInfo.coursePrice}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-blue-600">${courseInfo.coursePrice}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    type="button"
                    className={`p-4 border rounded-md flex items-center justify-center ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePaymentMethodChange('card')}
                  >
                    <CreditCard size={20} className="mr-2 text-blue-600" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    className={`p-4 border rounded-md flex items-center justify-center ${
                      paymentMethod === 'paypal'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePaymentMethodChange('paypal')}
                  >
                    <img src="/paypal.svg" alt="PayPal" className="h-5 mr-2" />
                    <span>PayPal</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          value={formData.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email (for receipt)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-200 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw size={20} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Pay ${courseInfo.coursePrice}</>
                  )}
                </button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-500">
                <p>Your payment information is secure and encrypted.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
