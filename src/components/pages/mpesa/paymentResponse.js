import React from 'react';

const PaymentResponsePage = ({ paymentResponse }) => {
  return (
    <div style={{height:"100vh",  background:'#121661', marginTop:'13vh'}}>

    <div style={{ display:'flex', alignItems:'center', flexDirection:'column', height:'20vh'}}>
      <h2 className='text-center' style={{color:'green',fontWeight:'800', marginTop:'10vh'}}>{paymentResponse.data.response.ResponseDescription}</h2>
      <h4 className='text-secondary'>Thank you for choosing Enceptics</h4>
      {/* <p>Customer Message: {paymentResponse.data.msg}</p> */}
      {/* <p>Your Id is {paymentResponse.data.response.MerchantRequestID}</p>
      <p>Merchant Request ID: {paymentResponse.data.response.MerchantRequestID}</p> */}
      <p className='text-secondary'>Your request ID: {paymentResponse.data.response.MerchantRequestID}</p>

      <a href='/'> Return to home page </a>
    </div>
    </div>
  );
};

export default PaymentResponsePage;
