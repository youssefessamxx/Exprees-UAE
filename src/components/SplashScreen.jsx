// src/components/SplashScreen.js
import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <img src="/static/images/logo.png" alt="Logo" className="splash-logo" /> {/* Add your logo here */}
      <BounceLoader color={"#000000"} size={150} aria-label="Loading Spinner" />
    </div>
  );
};

export default SplashScreen;
