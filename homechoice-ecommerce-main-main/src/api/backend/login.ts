import axiosInstance from "./axiosInstance";
import { getCsrfToken } from "./getCsrf";

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = async (credentials: LoginParams) => {
  try {
    await getCsrfToken();

    console.log("Sending login request to backend...");

    const response = await axiosInstance.post("userapi/api/login/homechoice-user", {
      email: credentials.email,
      password: credentials.password,
    });

    console.log("Login successful, response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
