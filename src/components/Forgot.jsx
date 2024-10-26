import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Forgot() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://51.20.121.157/core/forget-password/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success with toast
      if (response.status === 200 || response.status === 201) {
        console.log("Forgot password request sent successfully", response.data);
        toast.success(`Success: ${response.data.detail}`, {
          style: { background: "#4caf50", color: "white" },
        });
      }
    } catch (err) {
      // Handle errors with toast
      if (err.response) {
        console.error("Server responded with an error:", err.response.data);
        toast.error(`Error: ${err.response.data.detail}`, {
          style: { background: "red", color: "white" },
        });
      } else if (err.request) {
        console.error("Request was made but no response received", err.request);
        toast.error("Error: No response received from the server.", {
          style: { background: "red", color: "white" },
        });
      } else {
        console.error("Error setting up the request:", err.message);
        toast.error(`Error: ${err.message}`, {
          style: { background: "red", color: "white" },
        });
      }
    }
  };

  return (
    <div className='bg-[url("https://res.cloudinary.com/dqsruh1bz/image/upload/v1728660153/login_kofjvl.jpg")] bg-cover bg-center py-9 px-8 md:px-12 h-[60vh]'>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-center font-bold text-[32px] mb-4 text-white">
        Forgot Password
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

          <button
            className="bg-[#F05B1F] md:text-xl font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
