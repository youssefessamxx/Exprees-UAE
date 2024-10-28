import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://13.60.18.142/api/core/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const { access, refresh } = response.data;
        localStorage.setItem("authToken", access);
        localStorage.setItem("refreshToken", refresh);

        login(access,refresh);

        toast.success("Login successful!", {
          style: { background: "#4caf50", color: "white" },
        });

        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        toast.error("Login failed. Please check your email and password.", {
          style: { background: "red", color: "white" },
        });
        console.error("Server responded with an error:", err.response.data);
      } else if (err.request) {
        toast.error("No response from the server. Please try again later.", {
          style: { background: "red", color: "white" },
        });
        console.error("No response from the server:", err.request);
      } else {
        toast.error("An unexpected error occurred.", {
          style: { background: "red", color: "white" },
        });
        console.error("Error setting up the request:", err.message);
      }
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")] bg-cover bg-center py-[100px] px-8 md:px-12'>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center font-bold text-[32px] mb-4 text-white">
        Log in
      </h2>
      <div className="flex justify-between gap-[200px] ">
        <form
          onSubmit={handleSubmit}
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">
              Password
            </label>
            <input
              className="border-[1px] border-black block px-3 py-2 md:px-4 md:py-3 mx-auto outline-none w-full"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Link to="/forgot" className="text-right text-[#F05B1F] font-bold">
            Forget Password
          </Link>
          <button
            className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
            type="submit"
          >
            Log in
          </button>
          <p className="text-center md:text-xl text-white">
            Don't have an account?{" "}
            <Link className="font-bold text-[#F05B1F]" to="/register">
              Register
            </Link>
          </p>
        </form>

        <img
          src="/static/images/login-s.png"
          className="hidden lg:block md:w-1/2 lg:w-[595px] lg:mr-9"
          alt="Login Illustration"
        />
      </div>
    </div>
  );
}

export default Login;
