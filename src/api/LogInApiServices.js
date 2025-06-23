import axiosInstance from "../api/axiosInstance";

const API_BASE_URL = "/authentication";

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    if (response.data && response.data.token) {
      return response.data;
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
