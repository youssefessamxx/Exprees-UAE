import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axiosInstance from "../services/axiosInstance";
import { useAuth } from "../context/Auth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/core/login/", formData);
      const { access, refresh } = response.data;
      login(access, refresh);
      toast.success("Login successful!", { style: { background: "#4caf50", color: "white" } });
      navigate("/");
    } catch (error) {
      let message = "An unexpected error occurred.";
      if (error.response && error.response.status === 401) {
        message = "Login failed. Invalid email or password.";
      } else if (error.request) {
        message = "No response from the server. Please try again later.";
      }
      toast.error(message, { style: { background: "red", color: "white" } });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")] bg-cover bg-center py-[100px] px-8 md:px-12'>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center font-bold text-[32px] mb-4 text-white">Log in</h2>
      <div className="flex justify-between gap-[200px]">
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col md:gap-5 gap-3 md:self-center">
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">Email</label>
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
            <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">Password</label>
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
          <Link to="/forgot" className="text-right text-[#F05B1F] font-bold">Forget Password</Link>
          <button
            className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
          <p className="text-center md:text-xl text-white">
            Don't have an account? <Link className="font-bold text-[#F05B1F]" to="/register">Register</Link>
          </p>
        </form>
        <img src="/static/images/login-s.png" className="hidden lg:block md:w-1/2 lg:w-[595px] lg:mr-9" alt="Login Illustration" />
      </div>
    </div>
  );
}

export default Login;
