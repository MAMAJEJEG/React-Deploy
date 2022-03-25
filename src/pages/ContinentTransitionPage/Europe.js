import React from "react";
import MenuComponent from "../../components/MenuComponent";
import FrenchFlag from "../../assets/France/Frenchflag.png";
import SpainFlag from "../../assets/Espagne/SpainFlag.png";

const Europe = () => {
  return (
    <div>
      <div className="HomeContainer">
        <MenuComponent
          title={"France"}
          src={FrenchFlag}
          path={"/FranceChoice"}
        />
        <MenuComponent
          title={"Espagne"}
          src={SpainFlag}
          path={"/SpainChoice"}
        />
        <MenuComponent title={"Italie"} src={FrenchFlag} />
        <MenuComponent title={"Allemagne"} src={FrenchFlag} />
        <MenuComponent title={"Belgique"} src={FrenchFlag} />
        <MenuComponent title={"Luxembourg"} src={FrenchFlag} />
        <MenuComponent title={"Suisse"} src={FrenchFlag} />
        <MenuComponent title={"Littuanie"} src={FrenchFlag} />
        <MenuComponent title={"Létonnie"} src={FrenchFlag} />
      </div>
    </div>
  );
};

export default Europe;
