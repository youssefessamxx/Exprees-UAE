import { Link } from "react-router-dom";

function Track() {
  return (
    <div
      id="Track"
      className="bg-[#1E1E1E] text-white px-4 py-2 text-center md:flex  items-center  md:py-4"
    >
      <Link
        to="quotation"
        className="bg-[#F05B1F] font-semibold px-3 py-1  md:px-6 md:py-2  rounded-full cursor-pointer md:mb-0 mb-2 inline-block "
      >
        Get Quotation
      </Link>
      <div className="md:mx-auto flex justify-center md:gap-1 gap-0">
        <input
          className="font-bold font-sans text-md px-8 py-1 rounded-[8px] mr-3 outline-none text-black lg:w-[500px] lg:py-3"
          type="text"
          name="track"
          placeholder="Insert tracking number here..."
        />
        <button
          type="submit"
          className="bg-[#F05B1F] font-bold cursor-pointer ml-[-6px] px-3 py-1 rounded-[8px] lg:py-3 lg:px-7"
        >
          Track
        </button>
      </div>
    </div>
  );
}

export default Track;
