import axios from "axios";

const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://invoice-dbinvoice-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");

      window.location.href = "/"; 
      // redirect to login automatically
    }

    return Promise.reject(error);
  }
);

export default api;