import { Link } from "react-router-dom";

function QuotationBtn() {
  return (
    <div className="bg-[#F05B1F] font-semibold px-6 py-2 rounded-full cursor-pointer md:mb-0 mb-2 inline-block fixed right-[5%] bottom-[5%] text-white ">
      <Link to="quotation">Get Quotation</Link>
    </div>
  );
}

export default QuotationBtn;
