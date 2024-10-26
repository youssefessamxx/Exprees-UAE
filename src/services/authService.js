// authService.js
import axios from 'axios';

const BASE_URL = 'http://51.20.121.157';

class AuthService {
  static async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${BASE_URL}/core/token/refresh/`, {
        refresh: refreshToken
      });

      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
        return response.data.access;
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error('Failed to refresh token');
    }
  }

  static async getValidToken() {
    let token = localStorage.getItem('accessToken');
    
    if (!token) {
      token = await this.refreshToken();
    }
    
    return token;
  }
}

export default AuthService;