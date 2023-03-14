import React from "react";

import ResultSet from "../ResultSet/ResultSet";

const FaceRecognition = ({ imageUrl, imageRef, regions }) => {
  const getObject = (region) => {
    const clarifaiConcept = region.region_info.bounding_box;

    const width = Number(imageRef.current.width);
    const height = Number(imageRef.current.height);

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return {
      box: {
        leftCol: clarifaiConcept.left_col * width,
        topRow: clarifaiConcept.top_row * height,
        rightCol: width - clarifaiConcept.right_col * width,
        bottomRow: height - clarifaiConcept.bottom_row * height,
      },
      color: randomColor,
      concept: region.data.concepts[0].name,
    };
  };
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageUrl} alt="" width="500px" height="auto" ref={imageRef} />
        {regions.map((region) => {
          const { box, color, concept } = getObject(region);
          return (
            <ResultSet
              box={box}
              color={`#${color}`}
              key={region.id}
              concept={concept}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
