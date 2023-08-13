import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {

  const [bookingData, setBookingData] = useState({
    numPeople: 1,
    isBookingVehicle: true,
    isBookingPlace: true,
  });


  const handleBookingChange = (e) => {
    const { name, value, checked, type } = e.target;
    
    if (type === 'number') {
      setBookingData({ ...bookingData, [name]: parseInt(value) });
    } else if (type === 'checkbox') {
      e.target.disabled = false;
      setBookingData({ ...bookingData, [name]: checked });
    }
  };

  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);


  const handleCheckDestinationSubmit = async (e) => {
    e.preventDefault();
    try {
      const numPeople = bookingData.numPeople || 1;
      const isBookingVehicle = bookingData.isBookingVehicle;
      const isBookingPlace = bookingData.isBookingPlace;

      let amount = 0;
      if (isBookingVehicle) {
        amount += numPeople * 20;
      }
      if (isBookingPlace) {
        amount += numPeople * 30;
      }

      setPaymentAmount(amount);
      setShowModal(true);
    } catch (error) {
      alert("Oops! Booking didn't work");
    }
  };    

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/create-payment/', {
        amount: paymentAmount.toFixed(2),
      });

      const approvalUrl = response.data.approval_url;

      window.location.href = approvalUrl;
    } catch (error) {
      alert("Oops! Payment didn't work");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Booking for Salar De Uyuni</h1>
      <div>
        <h4>Number of people</h4>
        <p>
          <label htmlFor="numPeople">Fill below:</label>
        </p>
        <p>
          <input
            type="number"
            id="numPeople"
            name="numPeople"
            value={bookingData.numPeople}
            onChange={handleBookingChange}
            
          />
        </p>

        <div>
          <label>
            <input
              type="checkbox"
              name="isBookingVehicle"
              checked={bookingData.isBookingVehicle}
              onChange={handleBookingChange}
              disabled
            />{' '}
            Book Vehicle (Cost: $20 per person)
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="isBookingPlace"
              checked={bookingData.isBookingPlace}
              onChange={handleBookingChange}
              disabled
            />{' '}
            Book Place (Cost: $30 per person)
          </label>
        </div>

        <button type="submit" onClick={handleCheckDestinationSubmit}>
          Book
        </button>
      </div>

      {showModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Payment Details</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h4>Payment Amount: ${paymentAmount.toFixed(2)}</h4>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="text" id="expiryDate" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" required />
                  </div>
                  <button type="submit">Pay Now</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
