// authService.js

import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/auth'; // Replace with your API base URL

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
};

export default authService;
