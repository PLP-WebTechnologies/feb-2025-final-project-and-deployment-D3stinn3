import axiosInstance from "./axiosInstance";

/**
 * Function to fetch CSRF token and set it in axios headers
 */
export const getCsrfToken = async () => {
  try {
    console.log("Fetching CSRF token...");
    
    const response = await axiosInstance.get("userapi/api/get_csrf_token", {
      withCredentials: true, // Ensure cookies are included
    });

    const csrfToken = response.data?.csrf_token;

    if (csrfToken) {
      axiosInstance.defaults.headers.common["X-CSRFToken"] = csrfToken;
      console.log("CSRF Token Set:", csrfToken);
    } else {
      console.error("CSRF token not found in response.");
    }

    return csrfToken;
  } catch (error: any) {
    console.error("Error fetching CSRF token:", error.response?.data || error.message);
    throw new Error("Failed to fetch CSRF token");
  }
};
