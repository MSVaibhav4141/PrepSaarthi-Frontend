import React from "react";
import "./BlobButton.css";

const BlueBlob = ({ text }) => {
  // Determine the background color based on the text prop
  let blobColor = text == "Products" ? "#F8CB3A" : "#3A5AFF";
  
  return (
    <div className="buttons">
      <button
        className="blob-btn"
        style={{
          fontWeight: 700,
          fontSize: "1.2vmax", // Adjust based on screen size
          width: "19vmax",
          height: "5vmax",
        }}
      >
        {text} {/* Use the prop value here */}
        <span className="blob-btn__inner">
          <span className="blob-btn__blobs">
            <span
              className="blob-btn__blob"
              style={{ backgroundColor: blobColor }} // Apply dynamic background color
            ></span>
            <span
              className="blob-btn__blob"
              style={{ backgroundColor: blobColor }} // Apply dynamic background color
            ></span>
            <span
              className="blob-btn__blob"
              style={{ backgroundColor: blobColor }} // Apply dynamic background color
            ></span>
            <span
              className="blob-btn__blob"
              style={{ backgroundColor: blobColor }} // Apply dynamic background color
            ></span>
          </span>
        </span>
      </button>
      <br />

      {/* SVG for gooey effect */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default BlueBlob;
