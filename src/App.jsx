import { BrowserRouter, Route, Routes } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import QuotationPage from "./pages/QuotationPage";
import { AuthProvider } from "./context/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import OtpPage from "./pages/OtpPage";
import { Suspense } from "react";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            // <BounceLoader
            //   color={"#000000"}
            //   // cssOverride={override}
            //   size={150}
            //   aria-label="Loading Spinner"
            //   data-testid="loader"
            // />
            <p className="text-4xl text-red-50">loading ... </p>
          }
        >
          <Routes>
            <Route index element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quotation" element={<QuotationPage />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route />
            <Route />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
