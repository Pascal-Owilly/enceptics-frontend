import React, { useState } from 'react';
import '../../static/Homepage.css';
import axios from 'axios';

import Login from './authenticate/Login';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    numPeople: 1,
    isBookingVehicle: true,
    isBookingPlace: true,
    checkingDate: '',
    checkoutDate: '',
    phoneNumber: '',
    email: '',
    room: '',
  });

  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleBookingChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'number') {
      setBookingData({ ...bookingData, [name]: parseInt(value) });
    } else if (type === 'checkbox') {
      e.target.disabled = false;
      setBookingData({ ...bookingData, [name]: checked });
    } else {
      setBookingData({ ...bookingData, [name]: value });
    }
  };

  const handleCheckDestinationSubmit = async (e) => {
    e.preventDefault();
    try {
      const numPeople = bookingData.numPeople || 1;
      const isBookingVehicle = bookingData.isBookingVehicle;
      const isBookingPlace = bookingData.isBookingPlace;

      let amount = 0;
      if (isBookingVehicle) {
        amount += numPeople * 13.40;
      }
      if (isBookingPlace) {
        amount += numPeople * 33.55;
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
      const response = await axios.post('http://127.0.0.1:8000/api/auth/paypal/create/order', {
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

  const checkDestination = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/paypal/capture/order', bookingData);
      alert('Booking successful! Have a nice travel!');
    } catch (error) {
      alert("Oops! Booking didn't work");
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    checkDestination();
  };

  const navigate = useNavigate();

  const [token,setToken] = useState();

  if(token){
    navigate('/booking', {replace: true})
  }
  else{
    return <Login setToken={setToken} />
  }

  return (
    <>
      <div className="booking pt-2" style={{ backgroundColor: '#121661', height: '100vh', color: 'white', margin:'auto' }}>
        <br />
        <div className='container mt-5 m-auto' >
          <h1 className='text-center'>Booking </h1>
          <hr style={{ color: 'white', height: '2rem' }} />
          <div className='row' style={{boxShadow:'2px 2px 0 2px solid white'}}>
            <div className='col-md-3'></div>
            <div className='col-md-3 mt-2'>
              <h5 className='mt-1'>Number of people</h5>
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
                  Book Vehicle
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
                  Book Place
                </label>
              </div>
              {/* <button type="submit" onClick={handleCheckDestinationSubmit}>
                Book
              </button> */}
            </div>

            <div className='col-md-3 text-white'>
              <h5 className='mt-2'>Booking details</h5>
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="mt-1 " htmlFor="date">Check-in Date</label>
                  <input
                    type='datetime-local'
                    className="form-control"
                    id="checkingDate"
                    name="checkingDate"
                    value={bookingData.checkingDate}
                    placeholder="Enter Check-in date"
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="mt-1" htmlFor="date">Checkout Date</label>
                  <input
                    type="datetime-local"
                    className="form-control "
                    id="checkoutDate"
                    name="checkoutDate"
                    placeholder="Enter checkout date"
                    value={bookingData.checkoutDate}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="mt-1 " htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control "
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={bookingData.email}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="mt-1 " htmlFor="number">Phone</label>
                  <input
                    type="number"
                    placeholder="Enter Phone Number"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={bookingData.phoneNumber}
                    onChange={handleBookingChange}
                  />
                </div>
                {/* <button className='mt-3 text-center' type="submit">Book this destination</button> */}
              </form>
            </div>

            {/* <div className='col-md-3'>
              <h5 className='mt-2'>Enter pick up location</h5>
              <p>
                <input
                  style={{ backgroundColor: '#d9d9d9', color: '#121661', border: 'none', borderRadius: '10px', padding: '.2rem', width: '80%' }}
                  type="text"
                  id="pickupLocation"
                  value={bookingData.pickupLocation}
                  onChange={handleBookingChange}
                />
              </p>
            </div> */}

            <div className='row m-auto'>
              <div className='col-md-12 text-center mt-5' style={{ margin: 'auto' }}>
                <button
                  onClick={handleCheckDestinationSubmit}
                  type="submit"
                  className="btn btn-lg text-center mt-3"
                  style={{ backgroundColor: 'green', color: '#fff', width: '300px', margin: 'auto' }}
                >
                  Book this destination
                </button>
              </div>
            </div>

            {showModal && (
              <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-primary">Payment Details</h5>
                      <button type="button" className="close" onClick={closeModal}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h4 className='text-dark'>Payment Amount: ${paymentAmount.toFixed(2)}</h4>
                      <form onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                          <label className='text-dark m-1' htmlFor="cardNumber">Card Number</label>
                          <input type="text" id="cardNumber" required />
                        </div>
                        <div className="form-group mt-3">
                          <label className='text-dark m-1' htmlFor="expiryDate">Expiry Date</label>
                          <input type="text" id="expiryDate" required />
                        </div>
                        <div className="form-group mt-3">
                          <label className='text-dark m-1' htmlFor="cvv">CVV</label>
                          <input type="text" id="cvv" required />
                        </div>
                        <button className='mt-3 text-center' type="submit">Pay Now</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default Booking;
