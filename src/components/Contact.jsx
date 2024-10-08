import axios from "axios";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    msg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // cancel
  const handleCancel = () => {
    setFormData({
      full_name: "",
      phone_number: "",
      email: "",
      msg: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://rawiaa.pythonanywhere.com/core/contact/",
        formData, // axios will automatically convert it to JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      if (response.status === 201) {
        console.log("contact successfully", response.data);
        handleCancel();
      }
    } catch (err) {
      console.error("Error submitting registration:", err);
    }
  };

  return (
    <div id="Contact" className="mt-4 mb-4">
      <h2 className="text-[25px] lg:text-[42px] text-center text-[#F05B1F] font-semibold">
        Contact Us
      </h2>
      <div className="flex flex-col lg:flex-row items-center mt-8 gap-6">
        <form
          onSubmit={handleSubmit}
          className=" w-full px-8 lg:w-1/2 lg:gap-7  flex flex-col gap-3"
        >
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block">
              Full Name
            </label>
            <input
              className="block w-full border-[1px] rounded-sm border-black outline-none px-2 py-1 lg:px-4 lg:py-3"
              type="text"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block">
              Phone Number
            </label>
            <input
              className="block w-full border-[1px] rounded-sm  border-black outline-none px-2 py-1 lg:px-4 lg:py-3"
              type="number"
              placeholder="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block">
              Email
            </label>
            <input
              className="block w-full border-[1px] rounded-sm  border-black outline-none lg:px-4 lg:py-3 px-2 py-1"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block">
              Message
            </label>
            <input
              className="block w-full border-[1px] rounded-sm  border-black outline-none px-2 py-1 lg:px-4 lg:py-3"
              type="text"
              placeholder="Message"
              name="msg"
              value={formData.msg}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#F05B1F] font-bold cursor-pointer px-3 py-1 rounded-sm lg:py-3 lg:px-7 text-white lg:text-[25px]"
          >
            Send
          </button>
          {/* {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                fontSize: "3rem",
                fontWeight: "600",
              }}
            >
              {error}
            </p>
          )} */}
        </form>

        <img
          src="../../public/assets/contact.png"
          className="w-1/2 hidden lg:block"
          alt=""
        />
      </div>
    </div>
  );
}

export default Contact;
