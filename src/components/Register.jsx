import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  // State for form data, password confirmation, error messages, and password visibility
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form validation function
  const validateForm = () => {
    const { full_name, email, phone_number, password } = formData;

    if (!full_name || !email || !phone_number || !password) {
      toast.error("Please fill in all fields.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://13.60.18.142/api/core/register/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        toast.success("Registered successfully! Redirecting to OTP verification...");
        setTimeout(() => {
          navigate("/otp");
        }, 2000); // Redirect after a short delay
      }
    } catch (err) {
      const apiError = err.response?.data;
      console.error("Full error response:", apiError);

      if (apiError?.errors) {
        if (apiError.errors.email) {
          toast.error("A user with this email already exists.");
        } else if (apiError.errors.phone_number) {
          toast.error("A user with this phone number already exists.");
        } else {
          toast.error("Registration failed due to invalid input.");
        }
      } else if (apiError?.message) {
        toast.error(apiError.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }

      console.error("Error submitting registration:", apiError || err.message);
    }
  };

  return (
    <div className='bg-[url("/public/static/images/register.png")] bg-cover bg-center overflow-x-hidden py-16 px-12'>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center font-bold text-[42px] mb-8 text-white">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 justify-items-center lg:justify-items-start"
      >
        {/* Left Column */}
        <div>
          <label className="font-semibold text-white text-xl mb-2 block">Full Name</label>
          <input
            className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
            type="text"
            placeholder="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <label className="font-semibold text-white text-xl mb-2 block">Email</label>
          <input
            className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label className="font-semibold text-white text-xl mb-2 block">Phone Number</label>
          <input
            className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
            type="text"
            placeholder="Phone"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>

        {/* Right Column */}
        <div>
          <label className="font-semibold text-white text-xl mb-2 block">Password</label>
          <input
            className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label className="font-semibold text-white text-xl mb-2 block">Confirm Password</label>
          <input
            className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Show Password Toggle */}
          <div className="mb-5">
            <label className="text-white text-md">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />{" "}
              Show Password
            </label>
          </div>
        </div>

        {/* Submit Button and Error Message */}
        <div>
          <button
            type="submit"
            className="text-white bg-[#F05B1F] mx-auto block lg:mx-0 w-[300px] md:w-[400px] px-4 py-2 font-bold mt-5 mb-10"
          >
            Register
          </button>
          <p className="w-[400px] text-center text-lg text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F05B1F] font-bold">Log in</Link>
          </p>
          {/* Remove inline error message as it's replaced with toast notifications */}
        </div>
      </form>
    </div>
  );
}

export default Register;
