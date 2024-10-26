// src/App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuotationPage from "./pages/QuotationPage";
import { AuthProvider } from "./context/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import OtpPage from "./pages/OtpPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<SplashScreen />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quotation" element={<QuotationPage />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/otp" element={<OtpPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
