import axios from "axios";
import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://51.20.121.157/core/services/");
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="Services" className="px-3 py-2 md:px-10">
      <h1 className="md:my-5 font-semibold text-center md:text-[30px] lg:text-[40px] text-[22px] mb-2">
        Our Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.id} className="service-item group">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={service.img}
                className="w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                alt={service.name || "Service Image"}
              />
              <div className="overlay absolute inset-0 flex flex-col justify-center items-center opacity-0 bg-black bg-opacity-60 text-white transition-opacity duration-300 group-hover:opacity-100 p-4">
                <h3 className="text-2xl font-semibold drop-shadow-lg">{service.name}</h3>
                <p className="text-lg mt-2 drop-shadow-lg text-center">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
