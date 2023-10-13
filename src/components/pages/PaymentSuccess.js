import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentStatus = () => {
  const { status } = useParams();

  let message = '';
  let className = '';

  switch (status) {
    case 'success':
      message = 'Payment was successful! Thank you for your order.';
      className = 'success';
      break;
    case 'failure':
      message = 'Payment failed. Please try again or contact support.';
      className = 'failure';
      break;
    case 'cancel':
      message = 'Payment was cancelled. Your order was not completed.';
      className = 'cancel';
      break;
    default:
      message = 'Unknown payment status.';
      className = 'unknown';
      break;
  }

  return (
    <div style={{ height: '100vh' }}>
      <div className={`payment-status ${className}`} style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1>Payment Status</h1>
        <p>{message}</p>
        <p>
          <a href="/">Return to Home</a>
        </p>
      </div>
    </div>
  );
};

export default PaymentStatus;
