import React from "react";
import { NavLink } from "react-router-dom";

const EndDisplay = (props) => {
  return (
    <div className="InterfaceEnd">
      <div className="TopEnd">
        <h2>Félicitations !</h2>
      </div>
      <div className="BotEnd">
        <div className="para">
          <p>
            Vous obtenez un total de {props.score} sur {props.total}. <br />{" "}
            Voulez-vous recommencer ?
          </p>
        </div>
        <div className="Button">
          <div
            className="YesButton"
            onClick={() => {
              window.location.reload();
            }}
          >
            <p>Oui</p>
          </div>
          <div className="NoButton">
            <NavLink to="/">Non</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndDisplay;
