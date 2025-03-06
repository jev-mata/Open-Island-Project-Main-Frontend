import { useEffect } from "react";
import Cookies from "js-cookie"; 
import Axios_Open from "../lib/Axios_Open";

export const Get_Device_ID = async({ setDeviceId }: { setDeviceId: (val: string) => void }) => {

    let session_id = Cookies.get("session_id");

    if (!session_id) {
        // Generate a new device ID 
        Cookies.set("device_id", session_id, { expires: 365 }); // Store for 1 year

        // Send the device ID to the backend
        fetch("/save-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deviceId: session_id }),
        });
    }

    setDeviceId(session_id);
}
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
  