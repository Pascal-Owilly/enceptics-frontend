import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

const Booking = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const placeName = searchParams.get("placeName");
  const price = searchParams.get("price");
  const { state } = location;

  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    user: null,
    place: null,
    checkin_date: null,
    checkout_date: null,
    phone: '',
    email: '',
  });

  const [placeData, setPlaceData] = useState({
    placeName: '',
    price: 0,
  });

  const [user, setUser] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [checkinTime, setCheckinTime] = useState('');
  const [checkoutTime, setCheckoutTime] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      axios.get('http://127.0.0.1:8000/api/auth/user/', {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setBookingData((prevData) => ({
          ...prevData,
          user: response.data.id,
        }));
      })
      .catch((error) => {
        console.log('Authentication failed:', error);
      });

      if (state && state.placeId) {
        axios
          .get(`http://127.0.0.1:8000/api/places/${state.placeId}/`)
          .then((placeResponse) => {
            setPlaceData(placeResponse.data);
  
            // After fetching place data, set it as the default place in bookingData
            setBookingData((prevData) => ({
              ...prevData,
              place: placeResponse.data.id, // Set the place ID as default
              checkin_date: placeResponse.data.checkin_date || null, // Set checkin_date based on backend data
              checkout_date: placeResponse.data.checkout_date || null, // Set checkout_date based on backend data
              phone: placeResponse.data.phone || '', // Set phone based on backend data
              email: placeResponse.data.email || '', // Set email based on backend data
            }));
          })
          .catch((placeError) => {
            console.log('Error fetching place data:', placeError);
          });
      }
    } else {
      // Redirect unauthenticated users to the login page
      navigate('/login');
    }
  }, [navigate, state]);

  const handleBookingChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'number') {
      setBookingData({ ...bookingData, [name]: parseInt(value) });
    } else if (type === 'checkbox') {
      e.target.disabled = false;
      setBookingData({ ...bookingData, [name]: checked });
    } else {
      if (name === 'checkinTime') {
        setCheckinTime(value);
      } else if (name === 'checkoutTime') {
        setCheckoutTime(value);
      } else {
        setBookingData({ ...bookingData, [name]: value });
      }
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const orderPlace = {
        user: user.id,
        place: placeData.id,
        checkin_date: bookingData.checkin_date,
        checkout_date: bookingData.checkout_date,
        phone: bookingData.phone,
        email: bookingData.email,
      };

      axios.post('http://127.0.0.1:8000/api/book-place/', orderPlace)
      .then((response) => {
        // Handle success
        alert('Booking successful! ' + user.username + ' destination is ' + placeName);
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          // The request was made, and the server responded with a status code
          alert('Server responded with status code:', JSON.stringify(error.response.status));
          alert('Error response data:', error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          alert('Request was made, but no response received:', error.request);
        } else {
          // Something else happened while setting up the request
          alert('Error while setting up the request:', error.message);
        }
        // Additional error handling can be done here
      });
    }
  };
  

  const handleCheckDestinationSubmit = async (e) => {
    e.preventDefault();
    try {
    
      setPaymentAmount();
  
      // Store a flag in local storage to indicate that the modal should be shown after reloading
      localStorage.setItem("showModalAfterReload", "true");
  
      // Reload the page
      window.location.reload();
    } catch (error) {
      alert("Oops! Booking didn't work");
    }
  };
  
  // In your component's useEffect or componentDidMount, check if the flag is set in local storage
  // If it is set, then show the modal and clear the flag from local storage
  useEffect(() => {
    const showModalAfterReload = localStorage.getItem("showModalAfterReload");
    if (showModalAfterReload === "true") {
      setShowModal(true);
      localStorage.removeItem("showModalAfterReload");
    }
  }, []);
  
  // Rest of your component code
  

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/paypal/create/order', {

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

  if (!user) {
    // If user is null, render a loading message
    return <div style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'25px', backgroundColor:'#121661', color:'white'}}>Loading...</div>;
  }


  return (
    <>

      <div className="booking pt-2" style={{ backgroundColor: '#121661', height: '105vh', color: 'white', margin:'auto' }}>
        <br />
        <div className='container m-auto'>
          <div className='row what-card-price m-auto' style={{width:'90%'}}>
          <h3 className='text-secondary' style={{marginTop:'1vh', width:'90%'}}>
          <p className='mt-1' style={{color:'goldenrod'}} price={price}>Booking for {placeName}</p>

             </h3>
          <hr style={{ color: 'white', height: '0rem' }} />
            <div className='col-md-6 mt-2'>
              <p className='mt-1' style={{color:'goldenrod'}} price={price}>Visite {placeName} for only Ksh {price}</p>
              <hr />
            
             
            </div>

            <div className='col-md-6 text-white'>
              <h3 className='' style={{color:'goldenrod'}}>Booking details</h3>
              <hr />

              <div className="form-group">
                <label htmlFor="checkin_date">Check-in Date*</label>
                <input
                  type="date"
                  className="form-control"
                  id="checkin_date"
                  name="checkin_date"
                  value={bookingData.checkin_date}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkout_date">Checkout Date*</label>
                <input
                  type="date"
                  className="form-control"
                  id="checkout_date"
                  name="checkout_date"
                  value={bookingData.checkout_date}
                  onChange={handleBookingChange}
                  required
                />
              </div>
               
              <div className="form-group">
                <label htmlFor="phone">Phone*</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user">User*</label>
                <select
                  className="form-control"
                  id="user"
                  name="user"
                  required
                  value={bookingData.user || user.id} // Set the value to the user ID if available, otherwise to the currently authenticated user's ID
                  onChange={handleBookingChange} // Add an onChange handler to update the selected user
                  disabled={!!bookingData.user} // Disable the field if a user is already selected
                >
                  <option value={user.id}>{user.username}</option>
                </select>
              </div>


<div className="form-group">
  <label htmlFor="place">Place*</label>
  <select
    className="form-control"
    id="place"
    name="place"
    required
    value={bookingData.place || placeName} // Set the value to the selected place name if available, otherwise to the currently selected place name
    onChange={handleBookingChange} // Add an onChange handler to update the selected place
    disabled={!!bookingData.place} // Disable the field if a place is already selected
  >
    <option value={placeName}>{placeName}</option> {/* Set the selected place name as the default option */}
    {places.map((place) => (
      <option key={place.id} value={place.id}>
        {place.name}
      </option>
    ))}
  </select>
</div>


                {/* <button className='mt-3 text-center' type="submit">Book this destination</button> */}
              
            </div>

            <div className='row m-auto'>
              <div className='col-md-12 text-center' style={{ margin: 'auto' }}>
                <button
                  onClick={handleBookingSubmit}
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
                    <div className="modal-body" style={{backgroundColor:'rgb(18, 187,18)', height:'350px', width:'300px', marginTop:'10px'}}>
                     
                      <h5 className='text-dark mb-2'>Amount: Ksh {price}</h5>
                      <hr />
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
