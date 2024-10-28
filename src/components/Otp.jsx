import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Otp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const formData = { email, otp };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://13.60.18.142/api/core/verify_otp/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      if (response.status === 200 || response.status === 201) {
        toast.success("OTP verified successfully!", {
          style: { background: "#4caf50", color: "white" },
        });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Error verifying OTP. Please try again.", {
        style: { background: "red", color: "white" },
      });
      console.error("Error verifying OTP:", err);
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")] bg-cover bg-center py-9 px-8 md:px-12 h-[60vh]'>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center font-bold text-[32px] mb-4 text-white">
        Confirm OTP
      </h2>
      <div className="flex justify-between gap-[200px] lg:w-[50%] mx-auto">
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
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-[500] lg:text-[25px] mb-[2px] block text-white">
              OTP
            </label>
            <input
              className="border-[1px] border-black block md:px-4 md:py-3 px-3 py-2 mx-auto outline-none w-full"
              type="text"
              placeholder="OTP"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
