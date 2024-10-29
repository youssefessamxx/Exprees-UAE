import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setChangePasswordError("");

    let hasError = false;
    if (!oldPassword) {
      setOldPasswordError("Old password is required.");
      hasError = true;
    }
    if (!newPassword) {
      setNewPasswordError("New password is required.");
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }
    if (hasError) return;

    try {
      const response = await axiosInstance.post("/core/change-password/", {
        old_password: oldPassword,
        new_password: newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Password changed successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      setChangePasswordError(
        err.response?.data?.errors?.new_password?.[0] ||
        err.response?.data?.detail ||
        "Password change failed."
      );
      toast.error("Password change failed.");
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")] bg-cover bg-center py-9 px-8 md:px-12 h-[70vh]'>
      <h2 className="text-center font-bold text-[32px] mb-4 text-white">Change Password</h2>

      <form onSubmit={handleChangePassword} className="flex-grow flex flex-col md:gap-5 gap-3 md:self-center">
        {/* Old Password Field */}
        <div>
          <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">Old Password</label>
          <input
            className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          {oldPasswordError && <p className="text-red-500 text-sm mt-1">{oldPasswordError}</p>}
        </div>

        {/* New Password Field */}
        <div>
          <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">New Password</label>
          <input
            className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {newPasswordError && <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">Confirm New Password</label>
          <input
            className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
        </div>

        {/* Show Password Toggle */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-white">Show Password</label>
        </div>

        {/* Submit Button */}
        <button
          className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
          type="submit"
        >
          Change Password
        </button>

        {/* Error Message Display */}
        {changePasswordError && <p className="text-red-500 text-sm mt-3">{changePasswordError}</p>}
      </form>

      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default ChangePassword;
