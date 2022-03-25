import React from "react";
import MenuComponent from "../../components/MenuComponent";
import FrenchFlag from "../../assets/France/Frenchflag.png";

const FranceTransition = () => {
  return (
    <div>
      <div className="HomeContainer">
        <MenuComponent
          title={"Région"}
          src={FrenchFlag}
          path={"/FrenchRegion"}
        />
        <MenuComponent
          title={"Villes"}
          src={FrenchFlag}
          path={"/FrenchCities"}
        />
      </div>
    </div>
  );
};

export default FranceTransition;
