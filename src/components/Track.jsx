import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import toast, { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";

function Track() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  // Mock login status check
  const isLoggedIn = false; // Replace with actual login check, e.g., `const { isLoggedIn } = useContext(AuthContext);`

  const handleTrack = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to track your shipment.", {
        style: { background: "orange", color: "white" },
      });
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      return;
    }

    if (!trackingNumber) {
      setError("Please enter a tracking number.");
      return;
    }

    try {
      setError("");
      setTrackingInfo(null);
      setLocation(null);
      setIsLoading(true);

      const response = await axios.get(`http://51.20.121.157/shipping/track/${trackingNumber}`);
      
      if (response.data.error) {
        toast.error("Tracking number not found. Please check and try again.", {
          style: { background: "orange", color: "white" },
        });
      } else {
        setTrackingInfo(response.data);
        
        const { latitude, longitude } = response.data.location || {};
        if (latitude && longitude) {
          setLocation({ lat: latitude, lng: longitude });
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
    if (!isLoggedIn) {
      toast.error("Please log in to access the quotation page.", {
        style: { background: "orange", color: "white" },
      });
      setTimeout(() => navigate("/login"), 2000);
    } else {
      navigate("/quotation");
    }
  };

  return (
    <div
      id="Track"
      className="bg-[#1E1E1E] text-white px-4 py-2 text-center md:flex items-center md:py-4"
    >
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

      {/* Display error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display tracking information */}
      {trackingInfo && (
        <div className="mt-4">
          <h3 className="font-semibold">Tracking Information:</h3>
          <p>Status: {trackingInfo.status}</p>
          <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
          <p>Location: {trackingInfo.location?.description || "Not available"}</p>

          {/* Display map if location data is available */}
          {location && (
            <MapContainer center={location} zoom={13} style={{ height: "400px", width: "100%" }} className="mt-4">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={location}>
                <Popup>Car Location</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      )}
    </div>
  );
}

export default Track;
