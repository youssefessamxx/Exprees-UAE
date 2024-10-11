function Team() {
  return (
    <div className="px-10 py-6">
      <h2 className="text-center font-semibold md:text-[30px] lg:text-[40px] text-[20px] text-[#F05B1F] mb-4">
        Our Team
      </h2>
      {/* <div className="flex flex-col gap-8 md:flex-row  md:justify-center"> */}
      <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-4 gap-4">
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659772/team-1_ru7ptk.png"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659778/team-2_ewltlq.png"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659791/team-3_qouyvg.png"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659797/team-4_g4vx5k.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Team;
