import Cookies from 'js-cookie';
import authService from './authService'; // Make sure the path is correct


const checkUserRole = async () => {
    try {
      const authToken = Cookies.get('authToken'); // Get the authToken from cookies
      if (!authToken) {
        return 'anonymous'; // No authToken, assume anonymous role
      }
  
      // Make a request to your API to get user role (you need to implement this API endpoint)
      const response = await authService.getUserRole(authToken);
      console.log('user role is ', response)
  
      // Assuming your API returns user role as 'superuser' or 'regular'
      console.log('user response', response.role)

      return response.role;
    } catch (error) {
      console.error('Error checking user role:', error);
      return 'anonymous'; // Handle errors gracefully, assume anonymous role
    }
  };

  export { checkUserRole }; // Export the function
