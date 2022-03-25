import React from "react";
import SpainFlag from "../../assets/Espagne/SpainFlag.png";
import MenuComponent from "../../components/MenuComponent";

const SpainTransition = () => {
  return (
    <div>
      <div className="HomeContainer">
        <MenuComponent title={"Région"} src={SpainFlag} path={"/SpainRegion"} />
      </div>
    </div>
  );
};

export default SpainTransition;
