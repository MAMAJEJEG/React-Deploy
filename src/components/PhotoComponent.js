import React from "react";

const PhotoComponent = (props) => {
  return (
    <div>
      <div className="Image">
        <img src={props.src} alt="" />
        <p className="Phototitle">{props.title}</p>
      </div>
    </div>
  );
};

export default PhotoComponent;
