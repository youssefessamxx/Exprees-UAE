import { createContext, useContext, useReducer } from "react";

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

// eslint-disable-next-line react/prop-types
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken,
        refreshToken: state.refreshToken,
        login,
        logout,
        setAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
