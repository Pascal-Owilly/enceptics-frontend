import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from './SearchContext';


const Booking = () => {
  const { searchTerm } = useSearch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = new URLSearchParams(location.search);
  const placeName = searchParams.get("placeName");
  const priceFromURL = searchParams.get("price");
  
  const price = parseFloat(priceFromURL) || 0; // Ensure it's a number, default to 0 if parsing fails

  const baseUrl = 'http://127.0.0.1:8000/'

  const id = queryParams.get('id');


  console.log('ID from URL:', id);
  console.log('Location object:', location);

  const { state } = location;

  const [hasKids, setHasKids] = useState(false); // New state for checking if customer has kids
  const [numKids, setNumKids] = useState(0); // New state for specifying the number of kids
  const [numAdults, setNumAdults] = useState(1); // New state for specifying the number of adults
  const [extraCharges, setExtraCharges] = useState(0); // State to store extra charges
  const [checkinTime, setCheckinTime] = useState(''); // Separate state for checkinTime
  const [checkoutTime, setCheckoutTime] = useState(''); // Separate state for checkoutTime

  // const [price, setPrice] = useState(0); // Initialize price state to 0

    // Calculate extra charges based on the number of kids and adults
    useEffect(() => {
      if (price) {
        // Calculate extra charges based on the number of kids and adults
        const extraChargesForKids = numKids * pricePerKid;
        const extraChargesForAdults = (numAdults - 1) * pricePerAdult; // Subtract 1 for the default adult
        const totalExtraCharges = extraChargesForKids + extraChargesForAdults;
        // Calculate the total price by adding the base price and extra charges
        const totalPrice = price + totalExtraCharges;
        setExtraCharges(totalExtraCharges);
        setPaymentAmount(totalPrice); // Set the payment amount to the total price
      }
    }, [price, numKids, numAdults]);
    

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);


  const openPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  // Price per kid and adult
  const pricePerKid = 1000;
  const pricePerAdult = 3000;

  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
      checkin_date: null,
      checkout_date: null,
      phone: "",
      email: "",
      is_paid: false,
      user: null,
      place: null
  });

  const [placeData, setPlaceData] = useState({
    placeName: '',
    price: null,
  });

  const [user, setUser] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const authToken = Cookies.get('authToken');


  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      axios.get(`${baseUrl}/api/auth/user/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log('User data:', response.data);

        setBookingData((prevData) => ({
          ...prevData,
          user: response.data.id,
        }));
      })
      .catch((error) => {
        console.log('Authentication failed:', error);
      });
  
      console.log('State object:', state); // Add this line to log the state object
  
      if (state && state.placeId) {
        axios
          .get(`${baseUrl}/api/places/${state.placeId}/`)
          .then((placeResponse) => {
            setPlaceData(placeResponse.data);
  
            // After fetching place data, set it as the default place in bookingData
            setBookingData((prevData) => ({
              ...prevData,
              user: placeResponse.data.user || null,
              place: placeResponse.data.id, // Set the place ID as default
              checkin_date: placeResponse.data.checkin_date || null, // Set checkin_date based on backend data
              checkout_date: placeResponse.data.checkout_date || null, // Set checkout_date based on backend data
              phone: placeResponse.data.phone || '', // Set phone based on backend data
              email: placeResponse.data.email || '', // Set email based on backend data
              is_paid: placeResponse.data.is_paid || false,
            }));
          })
          .catch((placeError) => {
            console.log('Error fetching place data:', placeError);
          });
      } else {
        console.log('state.placeId is not available.');
        // Handle the case where state.placeId is not available
      }
    } else {
      // Redirect unauthenticated users to the login page
      navigate('/login-booking');
    }
  }, [navigate, state, authToken]);
  

  const handleBookingChange = (e) => {
    const { name, value, checked, type } = e.target;
  
    if (type === 'number') {
      setBookingData({ ...bookingData, [name]: parseInt(value) });
    } else if (type === 'checkbox') {
      if (name === 'hasKids') {
        setHasKids(checked);
      } else {
        e.target.disabled = false;
        setBookingData({ ...bookingData, [name]: checked });
        if (name === 'moreAdults') {
          setNumAdults(checked ? numAdults + 1 : numAdults - 1);
        }
      }
    } else {
      if (name === 'checkin_date') {
        // Calculate checkout_date as two days after checkin_date
        const checkinDate = new Date(value);
        const checkoutDate = new Date(checkinDate);
        checkoutDate.setDate(checkinDate.getDate() + 2);
  
        setBookingData({ ...bookingData, checkin_date: value, checkout_date: checkoutDate.toISOString().split('T')[0] });

      } else {
        setBookingData({ ...bookingData, [name]: value });
      }
    }
  };
  
  
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('state.placeId:', state.placeId);
    if (user && state && state.placeId) {
      // Create the orderPlace object here
      const orderPlace = {
        user: user.id,
        place: state.placeId,
        checkin_date: bookingData.checkin_date,
        checkout_date: bookingData.checkout_date,
        phone: bookingData.phone,
        email: bookingData.email,
        is_paid: bookingData.is_paid,
      };
  
      // Log the orderPlace object as a JSON string
      console.log('orderPlace data:', JSON.stringify(orderPlace, null, 2));
      console.log('placeData.id is ' + placeData.id);
      // console.log('place state  is' + state.placeId)        

      axios.post(`${baseUrl}/api/book-place/`, orderPlace, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
        .then((response) => {
          // Handle success
          console.log('Booking successful! ' + user.username + ' destination is ' + placeName + ' and price is ' + price);
          openPaymentModal();

        })
        .catch((error) => {
          // Handle errors
          if (error.response) {

            // The request was made, and the server responded with a status code
  
            // Log the specific error message
            console.log('Server responded with status code:', JSON.stringify(error.response.status));
           console.log('Error response data:', error.response.data.message);
           alert('oops, something must have gone wrong, the error has been sent to us and we are handling it ASAP')
  
            // You can also access and log the server's error message
            if (error.response.data && error.response.data.error) {
              console.log('Server error message:', error.response.data.error);
            }
          } else if (error.request) {
            // The request was made, but no response was received
            console.log('Request was made, but no response received:', error.request);
          } else {
            // Something else happened while setting up the request
            console.log('Error while setting up the request:', error.message);
          }
          // Additional error handling can be done here
        });
        console.log('State object:', state);

    }
    else {
      // Handle the case when state.placeId is not available
      console.error("state.placeId is not available.");
      // You can decide what action to take in this scenario

    }
  };

  const handlePaymentPaypal = async (e) => {
    e.preventDefault();

    

    const queryParams = new URLSearchParams(window.location.search);
    const placeId = queryParams.get('id'); // Extract the placeId from the URL query parameters

  
    try {
          // const paypalEndpoint = `http://localhost:8000/paypal/create/order?placeId=${placeId}`; // Include the placeId in the URL
          const paypalEndpoint = `${baseUrl}/api/auth/paypal/create/`; // Include the placeId in the URL
          const user_id = user ? user.id : null;

  
      const paypalData = {
        // Include any data required by the PayPal API
        id: placeId, // Replace 'yourId' with the actual ID you want to send
        user_id, // Include the user ID in the data

      };
  
      const response = await axios.post(paypalEndpoint, paypalData, {
        headers: {
          // content-type: "application/json"
         },
         timeout: 30000, // Set a timeout of 10 seconds (adjust this as needed)

      });
  
      console.log('PayPal API Response:', response); // Log the entire response for debugging
      console.log('user object', user_id)
      const approvalUrl = response.data.approved_url;
      console.log('Approval URL:', approvalUrl);
  
      if (!approvalUrl) {
        console.error('Approval URL not found in response:', response);
      } else {
        // Redirect the user to the PayPal approval URL
        window.location.href = approvalUrl;
      }
    } catch (error) {
      console.error('Oops! Payment did not work:', error);
      // Handle any errors that may occur during the PayPal payment process
    }
  };

  // capture the response from paypal validation endpoint
  const handlePaymentValidation = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/auth/paypal/validate/`);
  
      if (response.data.success) {
        // Payment was successful
        console.log('Payment successful:', response.data.message);
        setModalContent(
          // Display a success message in the modal
          <>
            <h3>Payment Successful</h3>
            <p>{response.data.message}</p>
          </>
        );
      } else {
        // Payment validation failed
        console.error('Payment validation failed:', response.data.message);
        setModalContent(
          // Display a failure message in the modal
          <>
            <h3>Payment Failed</h3>
            <p>{response.data.message}</p>
          </>
        );
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error validating payment:', error);
      // Display an error message to the user
      setModalContent(
        // Display an error message in the modal
        <>
          <h3>Error</h3>
          <p>An error occurred while validating the payment.</p>
        </>
      );
    }
  };
  

// Call the function to handle payment validation
// handlePaymentValidation();

  
const handlePaymentMpesa = async (e) => {
  e.preventDefault();

  // Pass the user ID as an argument to the function
  // You can access the user ID directly from the state
  const user_id = user ? user.id : null;

  const queryParams = new URLSearchParams(window.location.search);
  const placeId = queryParams.get('id'); // Extract the placeId from the URL query parameters
  
  try {
    // Define the endpoint for initiating the M-Pesa payment request
    const mpesaEndpoint = `${baseUrl}/mpesa-payments/daraja/`; // Adjust the URL as needed

    const user_id = user ? user.pk : null;
    const mpesaData = {
      id: id, // Include any data required for your M-Pesa integration
      user_id: user_id, // Include the user ID
    };
    console.log('Mpesa Data:', mpesaData);

    // Inform the user that the payment request has been received

    const response = await axios.post(mpesaEndpoint, mpesaData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // Set a timeout of 30 seconds (adjust this as needed)
    });

    console.log('M-Pesa API Response:', response); // Log the entire response for debugging

    // Extract the payment URL from the response (customize based on your API response structure)
    const paymentUrl = response.data;
    console.log('Payment response:', response);

    if (!paymentUrl) {
      console.error('Payment URL not found in response:', response);
    } else {
      // Log the callback URL
      const callbackUrl = response.data.response.CheckoutRequestID;
      console.log('Callback URL:', callbackUrl);

      // Redirect the user to the M-Pesa payment page
      // window.location.href = paymentUrl.url;
      window.location.href = '/payment/response?paymentResponse=' + JSON.stringify(response);

    }
  } catch (error) {
    console.error('Oops! M-Pesa payment did not work:', error);
    // Handle any errors that may occur during the M-Pesa payment process
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
      console.log("Oops! Booking didn't work", error.response.error);
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
      const response = await axios.post(`${baseUrl}/api/auth/paypal/create/order`, {

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
      const response = await axios.post(`${baseUrl}/api/auth/paypal/capture/order`, bookingData);
      console.log('Booking successful! Have a nice travel!');
    } catch (error) {
      console.log("Oops! Booking didn't work");
    }
  };

  if (!user) {
    // If user is null, render a loading message
    return <div style={{height:'auto', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'25px', backgroundColor:'#121661', color:'white'}}>Loading...</div>;
  }


  return (
    <>

      <div className="booking pt-2 " style={{ backgroundColor: '#121661', height: 'auto', color: 'white'}}>

        <br />
        <div className='container m-auto'>
          <div className='row'>

          <div className='col-md-3'>

          </div>
          <div className='col-md-6' style={{ marginTop:'13vh' }}>
          <div className='row what-card-navbar mb-5 m-auto' style={{width:'100%', borderRadius:'10px'}}>
          <div className='col-md-6'>
{/* Content for the second column */}
<h5 className='mt-1 p-3' style={{ color: 'goldenrod', fontFamily:'cursive', fontWeight:'750' }}>Booking for {placeName}</h5>
  </div>
  <div className='col-md-1'>
  
     </div>
  <div className='col-md-5'>
    {/* Content for the third column */}
   <p  className='mt-1 p-3' style={{ color: '#d9d9d9' }}>Price for 2: <span className='' style={{color:'goldenrod', fontWeight:'bold'}}> &nbsp; Ksh {price}</span></p>
  </div>
          <hr style={{ color: 'white', height: '0rem' }} />
          <div className='col-md-6 mb-3 mt-2  p-3 mx-auto' style={{ border: 'none', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)' }}>


   <div className="form-group">
    <label className='text-secondary'>
      Do you have kids?
      <input
      className='bg-secondary'
        type="checkbox"
        name="hasKids"
        checked={hasKids}
        onChange={(e) => setHasKids(e.target.checked)}
      />
    </label>
  </div>
  {hasKids && (
    <div className="form-group mt-2">
<label className='text-secondary'>How many Kids?
        <input
        className='mx-2'
          type="number"
          name="numKids"
          value={numKids}
          onChange={(e) => setNumKids(parseInt(e.target.value))}
          min="0"
          style={{ width: '100px' }}
        />
        </label>
     
    </div>
  )}
  <div className="form-group mt-2">
    <label className='text-secondary'>
     Add more people
      <input
       className='bg-secondary'
        type="checkbox"
        name="moreAdults"
        checked={bookingData.moreAdults}
        onChange={(e) => {
          e.target.disabled = false;
          setBookingData({ ...bookingData, moreAdults: e.target.checked });
          setNumAdults(e.target.checked ? numAdults + 1 : numAdults - 1);
        }}
      />
    </label>
  </div>
  {bookingData.moreAdults && (
    <div className="form-group mt-2">
      <label className='text-secondary'>
        How many additional adults? 
        <br />
        &nbsp; 
        <input
          type="number"
          name="numAdditionalAdults"
          value={numAdults - 1}
          onChange={(e) => setNumAdults(parseInt(e.target.value) + 1)}
          min="0"
          style={{ width: '100px' }}
        />
      </label>
      <hr />
    </div>
  )}
  <div className="form-group mt-2">
    <label className='text-secondary'>
      Extra Charges :
      <span style={{ color: 'goldenrod', fontWeight: 'bold' }}> Ksh {extraCharges}</span>
    </label>
  </div>
  {/* <button type="submit" className="btn btn-primary">Book Now</button> */}
</div> 


            <div className='col-md-5 text-white m-auto'>

              <div className="form-group ">
              <label htmlFor="date" className='text-secondary'>Pick-up date *</label>
            
            <input
              type="date"
              style={{border:'none'}}
              className="form-control bg-secondary"
              name="checkin_date"
              value={bookingData.checkin_date}
              onChange={handleBookingChange}
              required
            />
        </div>
        <div className="form-group" >
        <label htmlFor="date" className='text-secondary'>Ending on</label>
            <input
              style={{border:'none'}}
              type="date"
              className="form-control bg-secondary"
              name="checkout_date"
              value={bookingData.checkout_date}
              onChange={handleBookingChange}
              readOnly
              required
            />
        
        </div>
               
              <div className="form-group">
                <label htmlFor="phone" className='text-secondary'>Phone*</label>
                <input
                  style={{border:'none'}}
                  type="tel"
                  className="form-control bg-secondary"
                  id="phone"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleBookingChange}
                  required
                />
              </div>
              <div className="form-group text-secondary ">
                <label htmlFor="email">Email*</label>
                <input
                  style={{border:'none'}}
                  type="email"
                  className="form-control bg-secondary"
                  id="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleBookingChange}
                  required
                />
              </div>

              <div className="form-group text-secondary">
                <label htmlFor="user">User*</label>
                <select
                 style={{border:'none'}}

                  className="form-control bg-secondary"
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
  <label htmlFor="place" className='text-secondary'>Place*</label>
  <select
    style={{border:'none'}}

    className="form-control bg-secondary"
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
                  type="submqqit"
                  className="btn what-card-btn mb-4 btn-md mt-4"
                  style={{ backgroundColor: '#121661', color: 'goldenrod', width: '100%', margin: 'auto', fontWeight:'bold' }}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
            
            {showPaymentModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="modal-dialog">
            <div className="modal-content mt-5" style={{ backgroundColor: 'rgb(18, 187, 18)', width: 'auto', marginRight:'1rem' }}>
              <div className="modal-header">
                <h4 className="modal-title" style={{ color: '#d9d9d9' }}>Payment Details</h4>
                <button type="button" className="close" onClick={closePaymentModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ backgroundColor: 'rgb(18, 187, 18)', height: '350px', width: 'auto', marginTop: '10px' }}>
                {modalContent ? (
                  // Display the content based on the modalContent state
                  modalContent
                ) : (
                  // Display default content (buttons for PayPal and Mpesa)
                  <>
                    <h5 className='text-dark mb-2'>Amount: Ksh {price + extraCharges}</h5>
                    <hr />
                    <button
                      className='mt-3 what-card text-center mx-3'
                      style={{ backgroundColor: '#121661', color: 'white', padding: '5px', width: '200px', borderRadius: '10px' }}
                      onClick={handlePaymentPaypal}
                    >
                      Pay with PayPal
                    </button>
                    <button
                      className='mt-3 what-card text-center mx-3'
                      style={{ backgroundColor: '#121661', color: 'white', padding: '5px', width: '200px', borderRadius: '10px' }}
                      onClick={handlePaymentMpesa}
                    >
                      Pay with Mpesa
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
          </div>
            </div>
            <div className='col-md-3'>
            
            </div>
            </div>
     

        </div>
      </div>

    </>
  );
};


export default Booking;
