const PDFDocument = require('pdfkit');

exports.generatePDF = async (receiptData) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({ margin: 50 });
      
      // Buffer to store PDF
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      
      // Add content to PDF
      
      // Header
      doc.fontSize(20).text('COURSE ENROLLMENT RECEIPT', { align: 'center' });
      doc.moveDown();
      
      // Add logo or branding
      // doc.image('logo.png', 50, 45, { width: 100 });
      
      // Add a horizontal line
      doc.moveTo(50, 160)
         .lineTo(550, 160)
         .stroke();
      
      doc.moveDown();
      
      // Student and Course Details
      doc.fontSize(14).text('Student Details');
      doc.fontSize(12).text(`Name: ${receiptData.studentName}`);
      doc.moveDown();
      
      doc.fontSize(14).text('Course Details');
      doc.fontSize(12).text(`Course: ${receiptData.courseName}`);
      doc.moveDown();
      
      // Payment Details
      doc.fontSize(14).text('Payment Details');
      doc.fontSize(12).text(`Payment ID: ${receiptData.paymentId}`);
      doc.fontSize(12).text(`Order ID: ${receiptData.orderId}`);
      doc.fontSize(12).text(`Amount: ${receiptData.currency} ${receiptData.amount}`);
      doc.fontSize(12).text(`Date: ${new Date(receiptData.date).toLocaleString()}`);
      doc.moveDown();
      
      // Add a horizontal line
      doc.moveTo(50, 400)
         .lineTo(550, 400)
         .stroke();
      
      // Footer
      doc.fontSize(10).text('Thank you for enrolling in our course!', { align: 'center' });
      doc.fontSize(10).text('For any queries, please contact support@example.com', { align: 'center' });
      
      // Finalize the PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};