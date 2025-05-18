import axios from "axios";

// API Base URL
const API_BASE_URL = "https://localhost:7079/api/authentication/login";

// loginUser function to handle login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      username,
      password,
    });
    if (response.data && response.data.token) {
      return response.data; // Assuming the response contains the token and user info
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
