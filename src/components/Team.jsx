import { useEffect, useState } from "react";

function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch("http://51.20.121.157/core/team/")
      .then((response) => response.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error("Error fetching team data:", error));
  }, []);

  return (
    <div className="px-10 py-6">
      <h2 className="text-center font-semibold md:text-[30px] lg:text-[40px] text-[20px] text-[#F05B1F] mb-4">
        Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <img
              src={member.profile_pic}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-white font-bold text-xl drop-shadow-lg">{member.name}</h3>
              <p className="text-gray-200 text-lg mt-1 drop-shadow-md">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
