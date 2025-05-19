// src/utils/logout.js
export function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "/logIn"; // veya navigate("/logIn")
}
