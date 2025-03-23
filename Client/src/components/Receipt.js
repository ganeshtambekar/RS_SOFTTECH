import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import api from '../services/APIService'

const Receipt = () => {
  const { paymentId } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const response = await api.get(`/payments/receipt/${paymentId}`);
        if (response.data.success) {
          setReceipt(response.data.receipt);
        } else {
          setError('Failed to fetch receipt');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch receipt');
        setLoading(false);
        console.error(err);
      }
    };

    fetchReceipt();
  }, [paymentId]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Course Enrollment Receipt', 105, 20, { align: 'center' });
    
    // Add receipt details
    doc.setFontSize(12);
    doc.text(`Student Name: ${receipt.studentName}`, 20, 40);
    doc.text(`Course Name: ${receipt.courseName}`, 20, 50);
    doc.text(`Payment ID: ${receipt.paymentId}`, 20, 60);
    doc.text(`Order ID: ${receipt.orderId}`, 20, 70);
    doc.text(`Amount: ${receipt.currency} ${receipt.amount}`, 20, 80);
    doc.text(`Date: ${new Date(receipt.date).toLocaleString()}`, 20, 90);
    
    // Add divider
    doc.line(20, 100, 190, 100);
    
    // Add footer
    doc.setFontSize(10);
    doc.text('Thank you for enrolling in our course!', 105, 110, { align: 'center' });
    doc.text('For any queries, please contact support@example.com', 105, 120, { align: 'center' });
    
    // Save the PDF
    doc.save(`receipt-${receipt.paymentId}.pdf`);
  };

  if (loading) return <div className="text-center py-8">Loading receipt...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!receipt) return <div className="text-center py-8">Receipt not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h2 className="text-2xl font-bold">Course Enrollment Receipt</h2>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Student Details</h3>
            <p className="text-gray-700">Name: {receipt.studentName}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Course Details</h3>
            <p className="text-gray-700">Course: {receipt.courseName}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Payment ID</p>
                <p className="text-gray-900 font-medium">{receipt.paymentId}</p>
              </div>
              <div>
                <p className="text-gray-600">Order ID</p>
                <p className="text-gray-900 font-medium">{receipt.orderId}</p>
              </div>
              <div>
                <p className="text-gray-600">Amount</p>
                <p className="text-gray-900 font-medium">{receipt.currency} {receipt.amount}</p>
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="text-gray-900 font-medium">{new Date(receipt.date).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <button 
              onClick={handleDownloadPDF} 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;