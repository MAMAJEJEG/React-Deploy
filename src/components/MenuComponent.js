import React from "react";
import { useNavigate } from "react-router-dom";

const MenuComponent = (props) => {
  let navigate = useNavigate();

  function routeChange() {
    navigate(props.path);
  }

  return (
    <div className="MenuTitleContainer" onClick={routeChange}>
      <img src={props.src} alt="" />
      <p className="MenuTitle">{props.title}</p>
    </div>
  );
};

export default MenuComponent;
