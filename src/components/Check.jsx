import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import toast, { Toaster } from 'react-hot-toast';

// Define SVG icon as a constant
const carSvgIcon = `
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 11h14l-1.34-4.03A2 2 0 0 0 15.73 5H8.27a2 2 0 0 0-1.93 1.37L5 11ZM7 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2h-1a3 3 0 0 1-5.8 0h-2.4a3 3 0 0 1-5.8 0H4a2 2 0 0 1-2-2V9Z" fill="#F05B1F"/>
  </svg>
`;

// Create a custom Leaflet icon with the SVG
const carIcon = L.divIcon({
  html: carSvgIcon,
  iconSize: [30, 30],
  className: 'custom-svg-icon',
});

// Component to center the map based on new location
function RecenterMap({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, 8); // Center map at new location with zoom level 13
    }
  }, [location, map]);
  return null;
}

function Check() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackingData, setTrackingData] = useState(null);

  const handleInputChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number.');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingData(null);
    const url = `http://13.60.18.142/api/shipping/track/${trackingNumber}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Tracking information not found. Please check the tracking number and try again.');
        } else {
          throw new Error('Something went wrong. Please try again later.');
        }
      }
      const data = await response.json();

      // Parse the location string from the API response
      const locationMatch = data.current_location.match(/POINT \(([^ ]+) ([^ ]+)\)/);
      if (locationMatch) {
        const longitude = parseFloat(locationMatch[1]);
        const latitude = parseFloat(locationMatch[2]);
        setTrackingData({
          status: data.status,
          location: { lat: latitude, lng: longitude },
        });
      } else {
        throw new Error('Invalid location format received from API.');
      }
    } catch (error) {
      toast.error(error.message, {
        style: {
          background: 'orange',
          color: 'white',
        },
      });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="Check">
      <Toaster position="top-center" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="flex justify-center py-3 bg-[#1E1E1E]">
        <input
          className="font-sans font-semibold text-md px-8 py-1 rounded-[8px] mr-3 outline-none text-black lg:w-[500px] lg:py-3"
          type="text"
          name="track"
          placeholder="Insert tracking number here..."
          value={trackingNumber}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-[#F05B1F] font-bold cursor-pointer px-3 py-1 rounded-[8px] lg:py-3 lg:px-7 text-white"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Check'}
        </button>
      </form>

      {loading && <p className="text-white text-center mt-4">Loading...</p>}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {trackingData && trackingData.location && (
        <div className="mt-4">
          <MapContainer center={trackingData.location} zoom={10} style={{ height: '400px', width: '100%' }}>
            <RecenterMap location={trackingData.location} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={trackingData.location} icon={carIcon}>
              <Popup>
                <strong>Status:</strong> {trackingData.status || 'N/A'} <br />
                <strong>Location:</strong> {trackingData.location.lat}, {trackingData.location.lng}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default Check;
