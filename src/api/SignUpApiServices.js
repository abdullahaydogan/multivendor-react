import axiosInstance from "../api/axiosInstance";

export async function signUp(body) {
  try {
    const response = await axiosInstance.post('/authentication/signup', body);
    return response;
  } catch (error) {
    throw error;
  }
}
