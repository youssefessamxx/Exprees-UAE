import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  authToken: localStorage.getItem("authToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
      };
    case "logout":
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      return { ...state, isAuthenticated: false, authToken: null, refreshToken: null };
    case "setAuthToken":
      return { ...state, authToken: action.payload.authToken };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (authToken, refreshToken) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);
    dispatch({ type: "login", payload: { authToken, refreshToken } });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  const setAuthToken = (authToken) => {
    localStorage.setItem("authToken", authToken);
    dispatch({ type: "setAuthToken", payload: { authToken } });
  };

  // Refresh token function with error handling
  const refreshAuthToken = async () => {
    try {
      const refresh = state.refreshToken;
      if (!refresh) {
        logout();
        return;
      }

      const response = await axios.post(
        "http://13.60.18.142/api/core/token/refresh/",
        { refresh },
        { headers: { "Content-Type": "application/json" } }
      );

      const newToken = response.data.access;
      setAuthToken(newToken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken,
        refreshToken: state.refreshToken,
        login,
        logout,
        setAuthToken,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("AuthContext must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
