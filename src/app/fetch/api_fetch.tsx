 
import Cookies from "js-cookie"; 
import Axios_Open from "../lib/Axios_Open";
 
export const getCsrfToken = async () => {
     
  
    // Otherwise, fetch CSRF token from the server
    try {
      await Axios_Open.get('/sanctum/csrf-cookie', { withCredentials: true });
      // After obtaining CSRF cookie, try to log in 
    } catch (error) {
      console.error('Error getting CSRF Token:', error);
      return { message: 'Something went wrong with CSRF token retrieval' };
    }
  };
  