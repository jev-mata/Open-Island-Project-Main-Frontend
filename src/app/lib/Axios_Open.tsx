import axios from "axios";

const Axios_Open = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://cms.openisland.ph",
  withCredentials: true, // ✅ Needed for CSRF and authentication
});

export default Axios_Open;
