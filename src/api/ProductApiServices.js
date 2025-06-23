import axiosInstance from "./axiosInstance";

// Tüm ürünleri getir
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/Product");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ID'ye göre ürün getir
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/Product/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Kategoriye göre ürünleri getir
export const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/Product/category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Ürün sil
export const deleteProduct = async (id) => {
  try {
    await axiosInstance.delete(`/Product/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Yeni ürün ekle (formData ile file destekli)
export const addProduct = async (product) => {
  try {
    const formData = new FormData();
    formData.append("Name", product.Name);
    formData.append("Stock", product.Stock);
    formData.append("Price", product.Price);
    formData.append("CategoryId", product.CategoryId);
    if (product.PhotoFile) {
      formData.append("PhotoFile", product.PhotoFile);
    }

    const response = await axiosInstance.post("/Product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Ürün güncelle (formData ile dosya destekli)
export const updateProduct = async (id, product) => {
  try {
    const formData = new FormData();
    formData.append("Name", product.Name);
    formData.append("Stock", product.Stock);
    formData.append("Price", product.Price);
    formData.append("CategoryId", product.CategoryId);
    if (product.PhotoFile) {
      formData.append("PhotoFile", product.PhotoFile);
    }

    const response = await axiosInstance.put(`/Product/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
