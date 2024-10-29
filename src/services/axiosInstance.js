import axios from "axios";
import AuthService from "./authService"; // Assuming AuthService handles token refresh
import toast from "react-hot-toast";

const baseURL = "http://13.60.18.142/api"; // Ensure this base URL is correct

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header to every request if token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token on 401 Unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await AuthService.refreshToken();
        if (newToken) {
          error.config.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        // Log out if token refresh fails
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
