import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000/api/auth'; // Adjust the API URL as needed

// Function to set the token in a cookie
export const setAuthTokenCookie = (authToken) => {
  Cookies.set('authToken', authToken, { 
    expires: 60, 
   // sameSite: '', // Set the SameSite attribute to Lax (or other appropriate value)
    //secure: false, 
  }); // Set an expiration time as needed

  console.log(authToken)
};

// Function to get the token from the cookie
export const getAuthTokenCookie = () => {
  return Cookies.get('authToken');
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      username,
      password,
    });

    const authToken = response.data.key;

    // Set the authToken in a cookie
    setAuthTokenCookie(authToken);

    return authToken;
  } 
  
  catch (error) {
    throw error;
  }
};

export const isAuthenticated = () => {
  const authToken = getAuthTokenCookie();
  return !!authToken;
};

export const logout = () => {
  Cookies.remove('authToken');
};
