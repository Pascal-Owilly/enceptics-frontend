import React from 'react';

const PaymentResponsePage = ({ paymentResponse }) => {
  return (
    <div style={{height:"90vh", display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
      <h2>Thank you for choosing Enceptics</h2>
      {/* <p>Customer Message: {paymentResponse.data.msg}</p> */}
      <p>{paymentResponse.data.response.ResponseDescription}</p>
      {/* <p>Your Id is {paymentResponse.data.response.MerchantRequestID}</p>
      <p>Merchant Request ID: {paymentResponse.data.response.MerchantRequestID}</p> */}
      <p>Your payment ID: {paymentResponse.data.response.CheckoutRequestID}</p>

      <a href='/'> Return to home page </a>
    </div>
  );
};

export default PaymentResponsePage;
