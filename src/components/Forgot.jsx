import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Forgot() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://13.60.18.142/api/core/forget-password/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsOtpSent(true);
      }
    } catch (err) {
      if (err.response) {
        setEmailError(err.response.data.detail || "Request failed");
      } else {
        setEmailError("No response received from the server.");
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setOtpError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!otp) {
      setOtpError("OTP is required.");
      hasError = true;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axios.post(
        "http://13.60.18.142/api/core/reset-password/",
        {
          email,
          otp,
          new_password: newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsOtpSent(false);
        navigate("/login"); // Redirect to login page on success
      }
    } catch (err) {
      if (err.response) {
        const errorDetail = err.response.data.detail || "Request failed";
        setOtpError(errorDetail);
      } else {
        setOtpError("No response received from the server.");
      }
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")] bg-cover bg-center py-9 px-8 md:px-12 h-[70vh]'>
      <h2 className="text-center font-bold text-[32px] mb-4 text-white">
        {isOtpSent ? "Reset Password" : "Forgot Password"}
      </h2>

      <div className="flex justify-between gap-[200px] lg:w-[50%] mx-auto">
        {!isOtpSent ? (
          <form
            onSubmit={handleForgotPassword}
            className="flex-grow flex flex-col md:gap-5 gap-3 md:self-center"
          >
            <div>
              <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">
                Email
              </label>
              <input
                className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <button
              className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
              type="submit"
            >
              Send
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className="flex-grow flex flex-col md:gap-5 gap-3 md:self-center"
          >
            <div>
              <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">
                Email
              </label>
              <input
                className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            <div>
              <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">
                OTP
              </label>
              <input
                className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
            </div>
            <div>
              <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">
                New Password
              </label>
              <input
                className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {newPasswordError && <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>}
            </div>
            <div>
              <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">
                Confirm New Password
              </label>
              <input
                className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
            </div>
            <button
              className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Forgot;
