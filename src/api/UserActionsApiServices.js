import axiosInstance from "./axiosInstance"; // Mutlaka doğru path ile

// Sepete ürün ekleme
export const addItemToCart = async (productId, quantity) => {
  return axiosInstance.post("/Cart/items", { productId, quantity });
};

// Favorilere ürün ekleme
export const addFavorite = async (productId) => {
  return axiosInstance.post("/Favorite", { productId });
};

// Sepeti getirme
export const getCart = async () => {
  const response = await axiosInstance.get("/Cart");
  return response.data;
};

// Favorileri getirme
export const getFavorites = async () => {
  const response = await axiosInstance.get("/Favorite");
  return response.data;
};
