import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

const Booking = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const placeName = searchParams.get("placeName");

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

  const [orderData, setOrderData] = useState({
    "is_completed": false,
    "user": null,
    "place": null
   })

  const [user, setUser] = useState(null); // Store the authenticated user
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const authToken = Cookies.get('authToken'); // You can adjust this to your authentication setup
    if (authToken) {
      // Fetch user information based on the token or your authentication mechanism
      axios
        .get('http://127.0.0.1:8000/api/auth/user/', {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          console.log('You are authenticated as', response.data);

        })
        .catch((error) => {
          // Handle authentication error, e.g., token expired
          console.log('Authentication failed:', error);
        });
    } else {
      // Redirect unauthenticated users to the login page
      navigate('/login'); // Replace with your login route
    }
  }, [navigate]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (user) {
      // Associate the booking with the authenticated user
      const orderPlace = {
        ...orderData,
        userId: user.id, // Adjust this based on your user data structure
      };

      // Make the booking API call with the user association
      axios
        .post('http://127.0.0.1:8000/api/order-place/', orderPlace)
        .then((response) => {
          alert('Booking successful! Have a nice travel!');
        })
        .catch((error) => {
          alert("Oops! Booking didn't work");
          console.error('Booking failed:', error);
        });
    }
  };


  const handleOrderChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === 'number') {
      setOrderData({ ...orderData, [name]: parseInt(value) });
    } else if (type === 'checkbox') {
      e.target.disabled = false;
      setBookingData({ ...bookingData, [name]: checked });
    } else {
      setBookingData({ ...bookingData, [name]: value });
    }
  };

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
      console.log("Oops! Payment didn't work");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const checkDestination = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/paypal/capture/order', bookingData);
      console.log('Booking successful! Have a nice travel!');
    } catch (error) {
      console.log("Oops! Booking didn't work");
    }
  };


  return (
    <>
      <div className="booking pt-2" style={{ backgroundColor: '#121661', height: '105vh', color: 'white', margin:'auto' }}>
        <br />
        <div className='container m-auto'>
          <div className='row what-card-price m-auto' style={{width:'90%'}}>
          <h3 className='text-secondary' style={{marginTop:'1vh', width:'90%'}}>Booking for {placeName} </h3>
          <hr style={{ color: 'white', height: '0rem' }} />
            <div className='col-md-6 mt-2'>
              <h3 className='mt-1' style={{color:'goldenrod'}}>Number of people</h3>
              <hr />
              <p>
              <label className="mt-1 mb-2 text-center" style={{fontSize:'16px', color:'#d9d9d9'}} htmlFor="date">Number of people</label>
              </p>
              <p> 
                <input
                className='p-1 mx-3'
                 style={{fontSize:'12px', backgroundColor:'#d9d9d9'}}
                  type="number"
                  id="numPeople"
                  name="numPeople"
                  value={bookingData.numPeople}
                  onChange={handleBookingChange}
                />
              </p>
              <div>
                <label>
                Book Vehicle
                  <input
                    type="checkbox"
                    name="isBookingVehicle"
                    checked={bookingData.isBookingVehicle}
                    onChange={handleBookingChange}
                    disabled
                  />
                  
                </label>
              </div>
              <div>
                <label>
                Book Hotel
                  <input
                    type="checkbox"
                    name="isBookingVehicle"
                    checked={bookingData.isBookingVehicle}
                    onChange={handleBookingChange}
                    value='booked'
                    disabled
                  />
                 
                </label>
              </div>
              {/* <button type="submit" onClick={handleCheckDestinationSubmit}>
                Book
              </button> */}
            </div>

            <div className='col-md-6 text-white'>
              <h3 className='' style={{color:'goldenrod'}}>Booking details</h3>
              <hr />
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label className="mt-1 mb-2" style={{fontSize:'16px', color:'#d9d9d9'}} htmlFor="date">Check-in Date</label>
                  <input
                  style={{fontSize:'12px', backgroundColor:'#d9d9d9'}}
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
                <label className="mt-1 mb-2" style={{fontSize:'16px', color:'#d9d9d9'}} htmlFor="date">Check-out Date</label>
                  <input
                    style={{fontSize:'12px', backgroundColor:'#d9d9d9'}}
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
                  <label className="mt-1 mb-2" style={{fontSize:'16px', color: '#d9d9d9'}} htmlFor="email">Email</label>
                  <input
                    style={{fontSize:'12px', backgroundColor:'#d9d9d9'}}
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
                  <label className="mt-1 mb-2" style={{fontSize:'16px', color: '#d9d9d9'}} htmlFor="number">Phone</label>
                  <input
                    style={{fontSize:'12px', backgroundColor:'#d9d9d9'}}
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
              <div className='col-md-12 text-center' style={{ margin: 'auto' }}>
                <button
                  onClick={handleCheckDestinationSubmit}
                  type="submit"
                  className="btn what-card-price mb-2 btn-lg mt-4"
                  style={{ backgroundColor: '#121661', color: 'goldenrod', width: '100%', margin: 'auto' }}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>

            {showModal && (
              <div className="modal" style={{ display: 'block', backgroundColor:'rgb(0, 0, 0, 0.7)' }}>
                <div className="modal-dialog">
                  <div className="modal-content" style={{backgroundColor:'rgb(18, 187,18)', width:'350px'}}>
                    <div className="modal-header">
                      <h4 className="modal-title" style={{color:'#d9d9d9'}}>Payment Details</h4>
                      <button type="button" className="close" onClick={closeModal}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body" style={{backgroundColor:'rgb(18, 187,18)', height:'350px', width:'300px', marginTop:'40px'}}>
                      <h4 className='text-dark mb-2'>Payment Amount: ${paymentAmount.toFixed(2)}</h4>
                      <form onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                          <label className='text-dark m-1' htmlFor="cardNumber">Card Number</label>
                          <input type="text" id="cardNumber" style={{border:'none'}} required />
                        </div>
                        <div className="form-group mt-3">
                          <label className='text-dark m-1' htmlFor="expiryDate">Expiry Date</label>
                          <input type="text" id="expiryDate" style={{border:'none'}} required />
                        </div>
                        <div className="form-group mt-3">
                          <label className='text-dark m-1' htmlFor="cvv">CVV</label>
                          <input type="text" id="cvv" style={{border:'none'}} required />
                        </div>
                        <hr />
                        <button className='mt-3 what-card text-center mx-3' style={{backgroundColor: '#121661', color:'white', padding:'5px', width:'100%', borderRadius:'10px'}} type="submit">Pay Now</button>
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
