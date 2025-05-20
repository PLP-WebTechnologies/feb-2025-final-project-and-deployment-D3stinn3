import axiosInstance from "./axiosInstance";
import { getCsrfToken } from "./getCsrf";

interface SignupParams {
  email: string;
  username: string;
  password: string | null; // Allow null values
}

export const signupUser = async (userData: SignupParams) => {
  try {
    await getCsrfToken();

    console.log("Sending signup request to backend...");
    
    const response = await axiosInstance.post("userapi/api/signup", {
      email: userData.email,
      username: userData.username,
      password: userData.password ?? "null",
    });

    console.log("Signup successful, response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Signup API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};
