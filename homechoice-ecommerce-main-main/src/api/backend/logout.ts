import axiosInstance from "./axiosInstance";
import { getCsrfToken } from "./getCsrf";

/**
 * Function to handle user logout API call
 */
export const logoutUser = async () => {
  try {
    await getCsrfToken(); // Ensure CSRF token is set before making the request

    const response = await axiosInstance.post("userapi/api/logout");

    return response.data;
  } catch (error: any) {
    console.error("Logout API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};
