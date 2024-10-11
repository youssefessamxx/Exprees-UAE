import Swiper from "./Swiper";

function Client() {
  return (
    <div className="px-8 flex flex-col items-center py-4">
      <h2 className="font-semibold text-[30px] md:text-[35px] lg:text-[40px] text-[#F05B1F] mb-7 mt-3">
        Our Client Say!
      </h2>
      <div className="flex gap-2 flex-wrap justify-center">
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659797/team-4_g4vx5k.png"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659875/client-2_l9tnds.png"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659883/client-3_fcd2tv.png"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659890/client-4_gu631u.png"
          alt=""
        />
      </div>
      <Swiper />
    </div>
  );
}

export default Client;
