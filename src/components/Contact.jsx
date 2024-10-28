import axios from "axios";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast, { Toaster } from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "", // Removed default +20, as PhoneInput handles it
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

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone_number: value });
  };

  const handleCancel = () => {
    setFormData({
      full_name: "",
      phone_number: "",
      email: "",
      msg: "",
    });
  };

  const validateFormData = () => {
    const { full_name, phone_number, email, msg } = formData;

    if (!full_name || !phone_number || !email || !msg) {
      return "All fields are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email format is invalid.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateFormData();
    if (validationError) {
      toast.error(`Validation Error: ${validationError}`, {
        style: { background: "orange", color: "white" },
      });
      return;
    }

    console.log("Form data being sent:", formData);

    try {
      const response = await axios.post(
        "http://13.60.18.142/api/core/contact/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Thank you for contacting us. A representative will reach out soon.", {
          style: { background: "#4caf50", color: "white" },
        });
        handleCancel();
      }
    } catch (err) {
      if (err.response) {
        console.error("Error response data:", err.response.data);
        toast.error("Error submitting form: Please check your details and try again.", {
          style: { background: "red", color: "white" },
        });
      } else {
        console.error("Error:", err.message);
        toast.error("Error: Could not submit the form.", {
          style: { background: "red", color: "white" },
        });
      }
    }
  };

  return (
    <div id="Contact" className="mt-4 mb-4">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-[25px] lg:text-[42px] text-center text-[#F05B1F] font-semibold">
        Contact Us
      </h2>
      <div className="flex flex-col lg:flex-row items-center mt-8 gap-6">
        <form
          onSubmit={handleSubmit}
          className="w-full px-8 lg:w-1/2 lg:gap-7 flex flex-col gap-3"
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
            <PhoneInput
              country={'eg'}
              value={formData.phone_number}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'phone_number',
                required: true,
                autoFocus: true,
              }}
            />
          </div>
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block">
              Email
            </label>
            <input
              className="block w-full border-[1px] rounded-sm border-black outline-none lg:px-4 lg:py-3 px-2 py-1"
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
              className="block w-full border-[1px] rounded-sm border-black outline-none px-2 py-1 lg:px-4 lg:py-3"
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
        </form>

        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659977/contact_qkn9y4.png"
          className="w-1/2 hidden lg:block"
          alt="Contact Illustration"
        />
      </div>
    </div>
  );
}

export default Contact;
