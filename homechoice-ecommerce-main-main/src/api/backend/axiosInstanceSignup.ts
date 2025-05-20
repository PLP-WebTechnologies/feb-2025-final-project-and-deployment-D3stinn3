import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://homechoice-production.up.railway.app/", // Django API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies (including CSRF token) are sent
});

export default axiosInstance;
