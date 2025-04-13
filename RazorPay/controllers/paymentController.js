const Razorpay = require('razorpay');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

// Import your course data or models
const categories = [
  {
    id: 1,
    name: "Web Development",
    courses: [
      {
        id: 101,
        title: "Full-Stack Web Development",
        instructor: "Sarah Johnson",
        price: 89.99,
        ratings: 4.8,
        reviewCount: 324,
        description: "Master both frontend and backend technologies to become a complete web developer.",
        duration: "12 weeks",
        image: "/web_dev.png",
        level: "Intermediate"
      },
      // other courses...
    ]
  },
  // other categories...
];

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

// Find course by ID across all categories
const findCourseById = (courseId) => {
  let foundCourse = null;
  
  categories.forEach(category => {
    const course = category.courses.find(c => c.id === parseInt(courseId));
    if (course) {
      foundCourse = course;
      return;
    }
  });
  
  return foundCourse;
};

// Render product page with course details
const renderProductPage = async (req, res) => {
  try {
    const courseId = req.query.courseId;
    
    if (!courseId) {
      return res.status(400).send('Course ID is required');
    }
    
    const course = findCourseById(courseId);
    
    if (!course) {
      return res.status(404).send('Course not found');
    }
    
    // Format price for display (e.g., 89.99 -> 8999)
    const formattedPrice = Math.round(course.price * 100) / 100;
    
    // Render the EJS template with course details
    res.render('product', {
      courseTitle: course.title,
      courseInstructor: course.instructor,
      courseDescription: course.description,
      coursePrice: formattedPrice,
      courseImage: course.image
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
};

// Create a new Razorpay order
const createOrder = async (req, res) => {
    try {
        const { amount, name, description } = req.body;
        
        if (!amount || !name) {
            return res.status(400).send({
                success: false,
                msg: 'Missing required parameters'
            });
        }
        
        // Amount should be in paisa (multiply by 100)
        const amountInPaisa = Math.round(parseFloat(amount) * 100);
        
        const options = {
            amount: amountInPaisa,
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
            notes: {
                productName: name,
                description: description || name
            }
        };
        
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                console.error('Razorpay order creation error:', err);
                return res.status(500).send({
                    success: false,
                    msg: 'Failed to create order',
                    error: err.message
                });
            }
            
            res.status(200).send({
                success: true,
                msg: 'Order Created',
                order_id: order.id,
                amount: amountInPaisa,
                key_id: RAZORPAY_ID_KEY,
                product_name: name,
                description: description || name,
                contact: "8698574924", // This should ideally come from user's profile
                name: "RS Softech User", // This should ideally come from user's profile
                email: "user@example.com" // This should ideally come from user's profile
            });
        });
    } catch (error) {
        console.error('Create order error:', error.message);
        res.status(500).send({
            success: false,
            msg: 'Something went wrong!',
            error: error.message
        });
    }
};

// Verify payment after successful transaction
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        // Verify signature
        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', RAZORPAY_SECRET_KEY);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');
        
        if (generatedSignature === razorpay_signature) {
            // Payment is successful
            // Here you would typically update your database to mark the course as purchased by the user
            
            res.status(200).send({
                success: true,
                msg: 'Payment verified successfully'
            });
        } else {
            res.status(400).send({
                success: false,
                msg: 'Payment verification failed'
            });
        }
    } catch (error) {
        console.error('Verify payment error:', error.message);
        res.status(500).send({
            success: false,
            msg: 'Something went wrong!',
            error: error.message
        });
    }
};

module.exports = {
    renderProductPage,
    createOrder,
    verifyPayment
};