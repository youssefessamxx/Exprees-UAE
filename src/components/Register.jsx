import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  // Form data state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle error
  const validateForm = () => {
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone_number ||
      !formData.password
    ) {
      setError("please full the form");
    }

    if (!formData.email.includes("@")) {
      setError("Invalid email address");
      return false;
    }
    if (formData.password < 6) {
      setError("Password must be at least 6 characters");
    }

    if (formData.password !== confirmPassword) {
      setError("password do not match");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(JSON.stringify(formData));
    // clear previous error
    setError("");

    // validate form
    if (!validateForm()) {
      return;
    }

    // navigate("/login");

    try {
      const response = await axios.post(
        "https://rawiaa.pythonanywhere.com/core/register/",
        formData, // axios will automatically convert it to JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      if (response.status === 201) {
        console.log("Registered successfully", response.data);
        navigate("/otp");
      }
    } catch (err) {
      console.error("Error submitting registration:", err);
      setError("Registration failed. Please try again.");
    }
  };
  return (
    <div className='bg-[url("/assets/register.png")] bg-cover bg-center overflow-x-hidden  py-16 px-12'>
      <h2 className="text-center font-bold text-[42px] mb-8 text-white">
        Register
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid  grid-cols-1 lg:grid-cols-2 justify-items-center lg:justify-items-start "
      >
        <div className="">
          <div>
            <label className="font-semibold text-white text-xl mb-2 block">
              Full Name
            </label>
            <input
              className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
              type="text"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold text-white text-xl mb-2 block">
              Email
            </label>
            <input
              className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold text-white text-xl mb-2 block">
              Phone Number
            </label>
            <input
              className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
              type="text"
              placeholder="Phone"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <label className="font-semibold text-white text-xl mb-2 block">
              Image
            </label>
            <input
              className="block px-4 py-2 w-[300px] md:w-[400px] outline- mb-5 "
              type="url"
              placeholder="Image"
            />
            {/* <input
              className="block px-4 py-2 w-[500px] outline- mb-5"
              type="file"
            />{" "} */}
            <label className="absolute top-[39px] right-[10px] z-10 bg-white text-xm cursor-pointer text-[#f05b1f] py-1 px-2 border border-[#f05b1f] ">
              <input
                className=" px-4 py-2 w-[300px] md:w-[400px] outline- mb-5 hidden"
                type="file"
              />
              Select the image
            </label>
          </div>
          <div>
            <label className="font-semibold text-white text-xl mb-2 block">
              Paswword
            </label>
            <input
              className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-semibold text-white text-xl mb-2 block">
              Confirm Password
            </label>
            <input
              className="block px-4 py-2 w-[300px] md:w-[400px] outline-none mb-5"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-[#F05B1F] mx-auto block lg:mx-0 w-[300px] md:w-[400px] px-4 py-2 font-bold mt-5 mb-10"
          >
            Register
          </button>
          <p className="w-[400px] text-center text-lg text-white">
            Already have an account ?
            <span>
              {" "}
              <Link to="/login" className="text-[#F05B1F] font-bold">
                Log in
              </Link>
            </span>
          </p>
        </div>
      </form>
      {error && (
        <p style={{ color: "red", textAlign: "center", fontSize: "2rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Register;
