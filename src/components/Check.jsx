import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// Import authentication context or hook if available
// import { AuthContext } from '../context/AuthContext';

function Check() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const navigate = useNavigate();
  
  // Mock login status check
  const isLoggedIn = false; // Replace with actual login check, e.g., `const { isLoggedIn } = useContext(AuthContext);`

  const handleInputChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("Please log in to track your shipment.", {
        style: {
          background: 'orange',
          color: 'white',
        },
      });
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      return;
    }

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
      setTrackingData(data);
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
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Loading...' : 'Check'}
        </button>
      </form>

      {loading && <p className="text-white text-center mt-4">Loading...</p>}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {trackingData && (
        <div className="text-center mt-4 text-white">
          <h3 className="font-bold text-lg">Tracking Result</h3>
          <p><strong>Status:</strong> {trackingData.status || 'N/A'}</p>
          <p><strong>Location:</strong> {trackingData.location || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default Check;
