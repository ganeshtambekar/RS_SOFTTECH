const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/**
 * Corporate training inquiry email handler
 * Processes form submissions and sends formatted HTML emails
 */
router.post('/', async (req, res) => {
  const { company, contact, email, message } = req.body;

  // Input validation
  if (!company || !contact || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  try {
    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Create HTML content for email
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Training Inquiry</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            background-color: #1e40af;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 20px;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #6b7280;
          }
          .info-item {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #4b5563;
          }
          .message-box {
            background-color: white;
            border: 1px solid #e5e7eb;
            padding: 15px;
            border-radius: 4px;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>New Training Inquiry</h2>
        </div>
        <div class="content">
          <div class="info-item">
            <span class="label">Company:</span> ${company}
          </div>
          <div class="info-item">
            <span class="label">Contact Person:</span> ${contact}
          </div>
          <div class="info-item">
            <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
          </div>
          <div class="info-item">
            <span class="label">Message:</span>
            <div class="message-box">
              ${message.replace(/\n/g, '<br />')}
            </div>
          </div>
        </div>
        <div class="footer">
          <p>This inquiry was submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
      </body>
      </html>
    `;

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"Training Inquiry" <${process.env.EMAIL_USER}>`,
      replyTo: `${email}`,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `Training Inquiry from ${company}`,
      text: `Company: ${company}\nContact Person: ${contact}\nEmail: ${email}\nMessage:\n${message}`,
      html: htmlContent,
    });

    // Log for debugging in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Message sent: %s', info.messageId);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Your inquiry has been sent successfully'
    });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send your inquiry. Please try again later.'
    });
  }
});

module.exports = router;