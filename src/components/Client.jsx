import { useEffect, useState } from "react";
import Swiper from "./Swiper";

function Client() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://51.20.121.157/core/reviews/")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`text-yellow-500 ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="px-8 flex flex-col items-center py-4">
      <h2 className="font-semibold text-[30px] md:text-[35px] lg:text-[40px] text-[#F05B1F] mb-7 mt-3">
        Our Client Say!
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-center p-4 border rounded-lg shadow-lg bg-white"
          >
            <img
              src={review.reviewer_image}
              alt={review.reviewer_name}
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="font-semibold text-lg text-center">{review.reviewer_name}</h3>
            <p className="text-center text-gray-500 text-sm mb-2">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
            {renderStars(review.rating)}
            <p className="text-gray-700 mt-2 text-center">{review.comment}</p>
          </div>
        ))}
      </div>
      <Swiper />
    </div>
  );
}

export default Client;
