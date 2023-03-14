import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./icons8-image-recognition-100.png";
const Logo = () => {
  return (
    <div className="ma6 mt0">
      <Tilt>
        <div
          className="tilt-bg br2 shadow-2 mr7 pa3"
          style={{ height: 150, width: 150 }}
        >
          <img style={{ paddingTop: "5px" }} src={brain} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
