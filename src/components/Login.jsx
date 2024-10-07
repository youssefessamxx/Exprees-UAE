import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useState } from "react";

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

    if (formData.email && formData.password) {
      login();
    }

    console.log(JSON.stringify(formData));

    // navigate("/");

    try {
      const res = await fetch("https://rawiaa.pythonanywhere.com/core/login/", {
        mode: "no-cors",

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          charset: "utf-8",
        },
        body: JSON.stringify(formData),
      });

      await res.json();

      if (res.ok) {
        console.log("login successfully");
        navigate("/");
      }
    } catch (err) {
      console.error("Error submitting login: " + err);
    }
  };
  return (
    <div className='bg-[url("/assets/login.jpg")] bg-cover bg-center  py-9 px-8 md:px-12'>
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
          <p className="text-right text-[#F05B1F] font-bold">Forget Password</p>
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
