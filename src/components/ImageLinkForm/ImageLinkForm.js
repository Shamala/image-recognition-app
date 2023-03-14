import React from "react";
import "./ImageLinkForm.css";
const ImageLinkForm = ({ onInputChange, input, onSubmit, imageRef }) => {
  return (
    <div>
      <p className="f3 near-white">
        {
          "This application can detect a variety of objects in your picture. Give it a Try"
        }
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5 ">
          <input
            type="url"
            className=" f4 pa2 w-70 center"
            onChange={(e) => onInputChange(e)}
            value={input}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-blue ba b--near-white"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
