 
import Cookies from "js-cookie"; 
import Axios_Open from "../lib/Axios_Open";
 
export const getCsrfToken = async () => {
    const allCookies = Cookies.get();
  
    // Check if CSRF token exists in cookies
    if (allCookies['XSRF-TOKEN']) {
      // If CSRF token exists, proceed to login 
      return;
    }
  
    // Otherwise, fetch CSRF token from the server
    try {
      await Axios_Open.get('/sanctum/csrf-cookie', { withCredentials: true });
      // After obtaining CSRF cookie, try to log in 
    } catch (error) {
      console.error('Error getting CSRF Token:', error);
      return { message: 'Something went wrong with CSRF token retrieval' };
    }
  };
  