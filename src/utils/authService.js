// src/utils/authService.js
import { jwtDecode } from "jwt-decode";

export function getUserInfo() {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      username: decoded?.unique_name || decoded?.name || decoded?.sub || "",
      role: Array.isArray(decoded?.role) ? decoded.role[0] : decoded.role || "User",
    };
  } catch (error) {
    console.error("JWT decode failed", error);
    return null;
  }
}
