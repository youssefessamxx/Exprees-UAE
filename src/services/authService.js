import axiosInstance from "./axiosInstance";

class AuthService {
  static async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    try {
      const res = await axiosInstance.post("/token/refresh/", { refresh: refreshToken });

      if (res.data.access) {
        localStorage.setItem("authToken", res.data.access);
        return res.data.access;
      } else {
        throw new Error("Failed to obtain new access token");
      }
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw error;
    }
  }
}

export default AuthService;
