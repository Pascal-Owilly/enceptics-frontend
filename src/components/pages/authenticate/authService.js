import axios from 'axios';

const BASE_URL = 'https://enc.pythonanywhere.com'; // Replace with your API base URL

const authService = {
  login: async (loginData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login/`, loginData);
      const authToken = response.data.key;
      return authToken;
    } catch (error) {
      throw error;
    }
  },
  requestPasswordReset: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/password/reset/`, { email });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
