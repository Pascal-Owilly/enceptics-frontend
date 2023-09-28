
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function OrderForm() {

    const authToken = Cookies.get('authToken'); // Replace 'authToken' with your actual cookie name
  
    const [user, setUser] = useState(null);
  
    

    useEffect(() => {
      // Check if authToken exists
      if (authToken) {
        // Make a request to your server to get user information based on the token
        // You can use Axios or any other HTTP library for this
        axios
          .get('http://127.0.0.1:8000/api/auth/user/', {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          })
          .then((response) => {
            // Set the user state with the response data
            setUser(response.data);
          })
          .catch((error) => {
            // Handle errors, e.g., token expired or invalid
            console.error('Error fetching user data:', error);
          });
      }
    }, [authToken]);

  const [formData, setFormData] = useState({
    user: null, // You may need to get the user ID from your authentication system
    place: null,
    checkin_date: null,
    checkout_date: null,
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://127.0.0.1:8000/api/book-place/', formData)
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log('Order created successfully:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error creating order:', error);
      });
  };

    
      return (
        <div className='mt-5' style={{height:'100vh'}}>
          {user ? (
            <div>
              <h2>User Profile</h2>
              <p>Name: {user.username}</p>
              <p>Email: {user.email}</p>
              <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkin_date"
          placeholder="Check-In Date"
          value={formData.checkin_date}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkout_date"
          placeholder="Check-Out Date"
          value={formData.checkout_date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>      
            </div>
          ) : (
            <p>Not logged in</p>
          )}
        </div>
      );
    }
  

export default OrderForm;
