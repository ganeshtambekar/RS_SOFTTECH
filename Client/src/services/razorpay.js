import api from './APIService';

/**
 * Load Razorpay script
 * @returns {Promise<boolean>} True if loaded successfully
 */
export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Create Razorpay order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Order response
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/payments/create-order', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Verify Razorpay payment
 * @param {Object} paymentData - Payment verification data
 * @returns {Promise<Object>} Verification response
 */
export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments/verify', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return { success: false, error: error.message };
  }
};