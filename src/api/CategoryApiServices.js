import axiosInstance from "./axiosInstance";

const API_BASE_URL = "/Category";

export const getAllCategories = async () => {
  const response = await axiosInstance.get(API_BASE_URL);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const getCategoriesByProductId = async (productId) => {
  const response = await axiosInstance.get(`${API_BASE_URL}/product/${productId}`);
  return response.data;
};

export const addCategory = async (category) => {
  const response = await axiosInstance.post(API_BASE_URL, category);
  return response.data;
};

export const updateCategory = async (id, categoryUpdateDto) => {
  const response = await axiosInstance.put(`${API_BASE_URL}/${id}`, categoryUpdateDto);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
