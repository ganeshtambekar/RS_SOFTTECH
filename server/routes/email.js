const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

// Email validation helper
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// HTML escape helper to prevent XSS
const escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

router.post("/email", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate phone format if provided
    if (phone && !/^\+?[\d\s-()]{8,}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Check for environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Missing email configuration");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Escape HTML in user inputs
    const safeHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        /* Reset styles for email clients */
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
        }
        /* Container styles */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        /* Header styles */
        .header {
            background-color: #4a90e2;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        /* Content styles */
        .content {
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 0 0 5px 5px;
        }
        /* Field styles */
        .field {
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        .field:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #333333;
            margin-bottom: 5px;
        }
        .value {
            color: #666666;
            line-height: 1.5;
        }
        /* Message section styles */
        .message-section {
            margin-top: 20px;
            padding: 15px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        /* Footer styles */
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #999999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2 style="margin: 0;">New Form Submission</h2>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${escapeHtml(name)}</div>
            </div>
            
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${escapeHtml(email)}</div>
            </div>
            
            <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone ? escapeHtml(phone) : "Not provided"}</div>
            </div>
            
            <div class="message-section">
                <div class="label">Message:</div>
                <div class="value">${escapeHtml(message)}</div>
            </div>
        </div>
        
        <div class="footer">
            This is an automated message from your contact form.
            <br>
            Please respond to the sender directly via their provided email address.
        </div>
    </div>
</body>
</html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "ganesh.tambekar124@gmail.com",
      subject: `New Contact Form Submission from ${name} (${email})`,
      html: safeHtml,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", {
      message: error.message,
      stack: error.stack,
    });
    
    // Send appropriate error message based on error type
    if (error.code === 'EAUTH') {
      return res.status(500).json({ message: "Email authentication failed" });
    }
    if (error.code === 'ESOCKET') {
      return res.status(500).json({ message: "Network error occurred" });
    }
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;