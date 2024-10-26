import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function QuotationBtn() {
  const [showDiv, setShowDiv] = useState(false);
  const navigate = useNavigate();

  // Replace this with your actual authentication logic
  const isLoggedIn = false; // Example: set this to true if the user is logged in

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 900) {
      setShowDiv(true);
    } else {
      setShowDiv(false);
    }
  };

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/quotation");
    } else {
      toast.error("Please log in to access the quotation page.", {
        style: { background: "orange", color: "white" },
      });
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {showDiv && (
        <div
          onClick={handleClick}
          className="bg-[#F05B1F] font-semibold px-6 py-2 rounded-full cursor-pointer md:mb-0 mb-2 inline-block fixed right-[5%] bottom-[5%] text-white "
        >
          Get Quotation
        </div>
      )}
    </div>
  );
}

export default QuotationBtn;
