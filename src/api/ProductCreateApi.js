import axiosInstance from "../api/axiosInstance";

export function shareProduct(body) {
  return axiosInstance.post("/Product/add", body);
}
