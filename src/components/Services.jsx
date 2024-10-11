import axios from "axios";
import { useEffect, useState } from "react";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://rawiaa.pythonanywhere.com/core/services/"
        );
        setServices(response.data); // Assuming the data is an array
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  console.log(services);

  return (
    <div id="Services" className="px-3 py-2 md:px-10 ">
      <h1 className="md:my-5 font-semibold text-center md:text-[30px] lg:text-[40px] text-[22px] mb-2">
        Our Services
      </h1>
      <div className="flex flex-col md:flex-row gap-2 lg:gap-3">
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659154/service_1_jnmyth.png"
          className="md:w-1/3  object-cover"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659164/service_2_vbq6cb.png"
          className="md:w-1/3  object-cover"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dqsruh1bz/image/upload/v1728659173/service_3_jyemua.png"
          className="md:w-1/3  object-cover"
          alt=""
        />
      </div>
    </div>
  );
}

export default Services;
