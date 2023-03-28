import React from "react";
import "./ResultSet.css";
const ResultSet = ({ box, color, concept }) => {
  return (
    <div
      className="bounding-box"
      style={{
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol,
        boxShadow: `0 0 0 3px ${color} inset`,
      }}
    >
      <h3 style={{ color: color }}>{concept}</h3>
    </div>
  );
};

export default ResultSet;
