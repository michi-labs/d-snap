import React from "react";

export const AppLoader = () => {
  return (
    <div style={fullscreenStyle}>
      <div style={loaderStyle}></div>
    </div>
  );
};

const fullscreenStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const loaderStyle = {
  border: "6px solid rgba(255, 255, 255, 0.3)",
  borderTop: "6px solid #3498db",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 1s linear infinite",
};
