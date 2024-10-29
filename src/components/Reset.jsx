import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Reset errors
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setChangePasswordError("");

    // Validation
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

    // API request to change password
    try {
      const response = await axios.post(
        "http://13.60.18.142/api/core/change-password/",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Password changed successfully.");
        navigate("/login"); // Redirect to login page after successful password change
      }
    } catch (err) {
      setChangePasswordError(
        err.response?.data?.errors?.new_password?.[0] || 
        err.response?.data?.detail || 
        "Password change failed."
      );
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")] bg-cover bg-center py-9 px-8 md:px-12 h-[70vh]'>
      <h2 className="text-center font-bold text-[32px] mb-4 text-white">Change Password</h2>

      <form onSubmit={handleChangePassword} className="flex-grow flex flex-col md:gap-5 gap-3 md:self-center">
        <div>
          <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">Old Password</label>
          <input
            className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
            type={showPassword ? "text" : "password"} // Toggle input type
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          {oldPasswordError && <p className="text-red-500 text-sm mt-1">{oldPasswordError}</p>}
        </div>
        <div>
          <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">New Password</label>
          <input
            className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
            type={showPassword ? "text" : "password"} // Toggle input type
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {newPasswordError && <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>}
        </div>
        <div>
          <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">Confirm New Password</label>
          <input
            className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
            type={showPassword ? "text" : "password"} // Toggle input type
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
        </div>

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

        <button
          className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
          type="submit"
        >
          Change Password
        </button>
        {changePasswordError && <p className="text-red-500 text-sm mt-3">{changePasswordError}</p>}
      </form>
    </div>
  );
}

export default ChangePassword;
