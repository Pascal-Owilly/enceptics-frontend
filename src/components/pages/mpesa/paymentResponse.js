import React from 'react';

const PaymentResponsePage = ({ paymentResponse }) => {
  return (
    <div style={{height:"100vh",  background:'#121661'}}>
      <div className='container'>
        <dv className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6' style={{marginTop:'18vh'}}>

          <div style={{ display:'flex', alignItems:'center', flexDirection:'column', height:'20vh'}}>
      <h2 className='text-center' style={{color:'green',fontWeight:'800',margintTop:'14vh'}}>{paymentResponse.data.response.ResponseDescription}</h2>
      <h4 className='text-secondary'>Thank you for choosing Enceptics</h4>
      {/* <p>Customer Message: {paymentResponse.data.msg}</p> */}
      {/* <p>Your Id is {paymentResponse.data.response.MerchantRequestID}</p>
      <p>Merchant Request ID: {paymentResponse.data.response.MerchantRequestID}</p> */}
      <p className='text-secondary'>Your request ID: {paymentResponse.data.response.MerchantRequestID}</p>

      <a href='/'> Return to home page </a>
    </div>

          </div>

          <div className='col-md-3'></div>

        </dv>
      </div>


    </div>
  );
};

export default PaymentResponsePage;
