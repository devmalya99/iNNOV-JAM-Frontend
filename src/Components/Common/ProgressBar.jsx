// ProgressBar.js
import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container" style={{ width: "100%", height: "10px", background: "#eee" }}>
      <div
        className="progress-bar"
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: "green",
          transition: "width 0.3s ease-in-out"
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
