import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentStatus = () => {
  const { status } = useParams();

  let message = '';
  let className = '';

  switch (status) {
    case 'success':
      message = 'Payment was successful! Thank you for choosing Enceptics.';
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
        <div style={{height:"100vh",  background:'#121661'}}>

<div style={{ display:'flex', alignItems:'center', flexDirection:'column', height:'20vh'}}>
      <div className={`payment-status ${className}`} style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 className='text-center' style={{color:'green',fontWeight:'800', width:'70%', marginTop:'15vh'}}>{message}</h2>
        <p></p>
        <br />
        <p>
          <a href="/">Return to Home</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default PaymentStatus;
