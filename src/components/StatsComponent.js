import React from "react";

const StatsComponent = (props) => {
  return (
    <div className="stats">
      <div className="Title">
        <img src={props.flag} alt="" />
        <p>France région</p>
      </div>
      <p className="Score">
        Score : {props.score}/{props.total}
      </p>
    </div>
  );
};

export default StatsComponent;
