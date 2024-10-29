import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import toast, { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define a custom car SVG icon for the map marker
const carSvgIcon = `
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 11h14l-1.34-4.03A2 2 0 0 0 15.73 5H8.27a2 2 0 0 0-1.93 1.37L5 11ZM7 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2h-1a3 3 0 0 1-5.8 0h-2.4a3 3 0 0 1-5.8 0H4a2 2 0 0 1-2-2V9Z" fill="#F05B1F"/>
  </svg>
`;

const carIcon = L.divIcon({
  html: carSvgIcon,
  iconSize: [30, 30],
  className: "custom-svg-icon",
});

function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleTrack = async () => {
    if (!trackingNumber) {
      toast.error("Please enter a tracking number.");
      return;
    }

    try {
      setTrackingInfo(null);
      setLocation(null);
      setIsLoading(true);

      const response = await axios.get(`http://13.60.18.142/api/shipping/track/${trackingNumber}`);
      
      if (response.data.error) {
        toast.error("Tracking number not found. Please check and try again.", {
          style: { background: "orange", color: "white" },
        });
      } else {
        setTrackingInfo(response.data);
        
        // Parse location from the "current_location" field
        const locationString = response.data.current_location.match(/POINT \(([^ ]+) ([^ ]+)\)/);
        if (locationString) {
          const [_, longitude, latitude] = locationString;
          setLocation({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
        }
      }
    } catch (err) {
      toast.error("Unable to track the provided number. Please check your internet connection or try again later.", {
        style: { background: "orange", color: "white" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuotationClick = () => {
    navigate("/quotation");
  };

  return (
    <div id="Track" className="bg-[#1E1E1E] text-white px-4 py-2 text-center md:flex items-center md:py-4">
      <Toaster position="top-center" reverseOrder={false} />

      <button
        onClick={handleQuotationClick}
        className="bg-[#F05B1F] font-semibold px-3 py-1 md:px-6 md:py-2 rounded-full cursor-pointer md:mb-0 mb-2 inline-block"
      >
        Get Quotation
      </button>

      <div className="md:mx-auto flex justify-center md:gap-1 gap-0">
        <input
          className="font-bold font-sans text-md px-8 py-1 rounded-[8px] mr-3 outline-none text-black lg:w-[500px] lg:py-3"
          type="text"
          name="track"
          placeholder="Insert tracking number here..."
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <button
          type="button"
          className="bg-[#F05B1F] font-bold cursor-pointer ml-[-6px] px-3 py-1 rounded-[8px] lg:py-3 lg:px-7"
          onClick={handleTrack}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Track"}
        </button>
      </div>

      {/* Display tracking information */}
      {trackingInfo && location && (
        <div className="mt-4">
          <h3 className="font-semibold">Tracking Information:</h3>
          <p>Status: {trackingInfo.status}</p>
          <p>Location: {location.lat}, {location.lng}</p>

          {/* Display map with marker */}
          <MapContainer center={location} zoom={13} style={{ height: "400px", width: "100%" }} className="mt-4">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={location} icon={carIcon}>
              <Popup>
                Status: {trackingInfo.status}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default Track;
