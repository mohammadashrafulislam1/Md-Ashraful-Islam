// LoadingSpinner.jsx
import React from 'react';0
import './LoadingSpinner.css'; // Import your CSS styles for the spinner
const glowImage = 'https://i.ibb.co/XLZZBJh/20220902-193547.png'; // Import your glowing image

const LoadingSpinner = ({ loading }) => (
  <div className={`${loading ? 'glowing' : ''} `}>
    <img className="spinner-img" src={glowImage} alt="Loading..." />
  </div>
);

export default LoadingSpinner;
