const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const { generatePDF } = require('../utils/pdfGenerator');
const { sendReceiptEmail } = require('../utils/emailService');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const { courseId, amount, currency, userDetails } = req.body;

    // Validate course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Find or create user
    let user = await User.findOne({ email: userDetails.email });
    if (!user) {
      user = new User({
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone
      });
      await user.save();
    }

    // Create order options
    const options = {
      amount: amount * 100, // amount in paisa
      currency,
      receipt: `receipt_order_${Date.now()}`,
      notes: {
        courseId: courseId,
        userId: user._id.toString()
      }
    };

    // Create Razorpay order
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to create order', error: error.message });
  }
};

// Verify payment signature
exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      courseId,
      userId
    } = req.body;

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Get payment details from Razorpay
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    
    // Find course and user
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ success: false, message: 'Course or user not found' });
    }

    // Create payment record
    const payment = new Payment({
      user: userId,
      course: courseId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature,
      amount: paymentDetails.amount / 100, // Convert from paisa to rupees
      currency: paymentDetails.currency,
      status: paymentDetails.status
    });

    await payment.save();

    // Create enrollment
    const enrollment = new Enrollment({
      user: userId,
      course: courseId,
      payment: payment._id,
      status: 'active'
    });

    await enrollment.save();

    // Update user's enrollments
    user.enrollments.push(enrollment._id);
    await user.save();

    // Generate receipt
    const receiptData = {
      studentName: user.name,
      courseName: course.title,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: payment.amount,
      currency: payment.currency,
      date: payment.paymentDate
    };

    // Generate PDF receipt
    const pdfBuffer = await generatePDF(receiptData);
    const receiptUrl = `/receipts/${payment._id}`;
    
    // Update payment with receipt URL
    payment.receiptUrl = receiptUrl;
    await payment.save();

    // Send receipt email
    await sendReceiptEmail(user.email, user.name, course.title, pdfBuffer);

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment,
      enrollment,
      receiptUrl
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Failed to verify payment', error: error.message });
  }
};

// Get payment receipt
exports.getReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await Payment.findById(paymentId)
      .populate('user')
      .populate('course');
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    
    const receiptData = {
      studentName: payment.user.name,
      courseName: payment.course.title,
      paymentId: payment.razorpayPaymentId,
      orderId: payment.razorpayOrderId,
      amount: payment.amount,
      currency: payment.currency,
      date: payment.paymentDate
    };
    
    res.status(200).json({
      success: true,
      receipt: receiptData
    });
  } catch (error) {
    console.error('Error getting receipt:', error);
    res.status(500).json({ success: false, message: 'Failed to get receipt', error: error.message });
  }
};