import axios from "axios";
import { useAuth } from "./context/Auth";

// Axios interceptor setup
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const auth = useAuth();
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await auth.refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
