function Team() {
  return (
    <div className="px-10 py-6">
      <h2 className="text-center font-semibold md:text-[30px] lg:text-[40px] text-[20px] text-[#F05B1F] mb-4">
        Our Team
      </h2>
      {/* <div className="flex flex-col gap-8 md:flex-row  md:justify-center"> */}
      <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-4 gap-4">
        <img src="/public/static/images/team-1.png" alt="" />
        <img src="/public/static/images/team-2.png" alt="" />
        <img src="/public/static/images/team-3.png" alt="" />
        <img src="/public/static/images/team-4.png" alt="" />
      </div>
    </div>
  );
}

export default Team;
