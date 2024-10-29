import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuotationBtn() {
  const [showDiv, setShowDiv] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowDiv(scrollY > 900);
  };

  const handleClick = () => {
    navigate("/quotation");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {showDiv && (
        <div
          onClick={handleClick}
          className="bg-[#F05B1F] font-semibold px-6 py-2 rounded-full cursor-pointer md:mb-0 mb-2 inline-block fixed right-[5%] bottom-[5%] text-white"
        >
          Get Quotation
        </div>
      )}
    </div>
  );
}

export default QuotationBtn;
