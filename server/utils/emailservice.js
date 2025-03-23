const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send receipt email with PDF attachment
 * @param {string} email - Recipient email
 * @param {string} name - Student name
 * @param {string} courseName - Course name
 * @param {Buffer} pdfBuffer - PDF buffer
 */
exports.sendReceiptEmail = async (email, name, courseName, pdfBuffer) => {
  try {
    const mailOptions = {
      from: `"Course Platform" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Course Enrollment Receipt for ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Course Enrollment Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for enrolling in <strong>${courseName}</strong>. Your enrollment has been confirmed.</p>
          <p>Please find your receipt attached to this email.</p>
          <p>You can also access your courses and receipts from your dashboard.</p>
          <p>Best regards,<br>Course Platform Team</p>
        </div>
      `,
      attachments: [
        {
          filename: `receipt-${Date.now()}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`Receipt email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending receipt email:', error);
    throw error;
  }
};