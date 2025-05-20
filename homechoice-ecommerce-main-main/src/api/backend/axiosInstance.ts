import axios from "axios";

let accessToken: string | null = null;
let refreshToken: string | null = null;

const axiosInstance = axios.create({
  baseURL: "https://homechoice-production.up.railway.app/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🔑 Obtain a fresh JWT token before making protected API requests
export const obtainToken = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("❌ ERROR: Missing email/password for token request.");
  }

  try {
    console.log(`🔑 Requesting fresh JWT token for ${email}...`);
    const response = await axiosInstance.post("userapi/api/token/pair", {
      email,
      password,
    });

    if (response.data) {
      accessToken = response.data.access;
      refreshToken = response.data.refresh; // ✅ Store refresh token

      // ✅ Set the Authorization header globally
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      console.log("✅ Token obtained and Authorization header set.");
      
      return { accessToken, refreshToken };
    }
  } catch (error: any) {
    console.error("❌ ERROR obtaining token:", error.response?.data || error.message);
    throw error;
  }
};

// 🔄 Refresh JWT Token (Only Used if We Have a Refresh Token)
export const refreshTokenRequest = async () => {
  if (!refreshToken) {
    console.error("❌ ERROR: No refresh token available.");
    throw new Error("❌ ERROR: No refresh token available.");
  }

  try {
    console.log("🔄 Refreshing JWT token...");
    const response = await axiosInstance.post("userapi/api/token/refresh", {
      refresh: refreshToken,
    });

    if (response.data) {
      accessToken = response.data.access;

      // ✅ Update Authorization header
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      console.log("🔄 Token refreshed successfully.");
      
      return accessToken;
    }
  } catch (error: any) {
    console.error("❌ ERROR refreshing token:", error.response?.data || error.message);
    throw error;
  }
};

// 🔐 Fetch and attach CSRF token dynamically
export const attachCsrfToken = async (email: string) => {
  try {
    console.log(`🔍 Fetching CSRF token for ${email}...`);
    const response = await axiosInstance.get("userapi/api/get_csrf_token", {
      params: { email },
      withCredentials: true,
    });

    const csrfToken = response.data?.data?.csrf_token;
    if (csrfToken) {
      axiosInstance.defaults.headers.common["X-CSRFToken"] = csrfToken;
      console.log("✅ CSRF Token Set:", csrfToken);
    } else {
      console.error("❌ ERROR: CSRF token not found in response.");
    }
  } catch (error: any) {
    console.error("❌ ERROR fetching CSRF token:", error.response?.data || error.message);
  }
};

// ✅ Interceptor to attach Authorization header automatically (No token storage)
axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Clear tokens on logout
export const clearTokens = () => {
  console.log("🚪 Clearing stored tokens on logout...");
  accessToken = null;
  refreshToken = null;
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export default axiosInstance;
