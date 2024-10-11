import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  // data from form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.email && formData.password) {
    //   login();
    // }

    console.log(JSON.stringify(formData));

    // navigate("/");

    try {
      const response = await axios.post(
        "https://rawiaa.pythonanywhere.com/core/login/",
        formData, // axios will automatically convert it to JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      if (response.status === 200 || response.status === 201) {
        console.log("login successfully", response.data);
        navigate("/");
        login();

        const token = response.data.access;
        console.log();
        localStorage.setItem("authToken", token);
      }
    } catch (err) {
      if (err.response) {
        console.error("Server responded with an error:", err.response.data);
      } else if (err.request) {
        console.error("No response from the server:", err.request);
      } else {
        console.error("Error setting up the request:", err.message);
      }
    }
  };
  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")]  bg-cover bg-center  py-[100px] px-8 md:px-12'>
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
              className="border-[1px]  border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
              type="text"
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
            Dont have account ?{" "}
            <Link className="font-bold text-[#F05B1F]" to="/register">
              Register
            </Link>
          </p>
        </form>

        <img
          src="../../public/assets/login-s.png"
          className="hidden lg:block md:w-1/2 lg:w-[595px] lg:mr-9"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
