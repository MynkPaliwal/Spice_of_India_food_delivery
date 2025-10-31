import React from "react";
import "../css/CircularLoader.scss"; // Import CSS

const CircularLoader: React.FC = () => {
  return (
    <div className="loaderContainer">
      <div className="spinner"></div>
    </div>
  );
};

export default CircularLoader;
