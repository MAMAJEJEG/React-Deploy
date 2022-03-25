import { click } from "@testing-library/user-event/dist/click";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const navigation = useRef();
  const menu = useRef();
  const openMenuButton = useRef();
  // function click() {
  //   navigation.current.style;
  // }

  function close() {
    menu.current.style.display = "none";
  }

  function show() {
    menu.current.style.display = "grid";
  }

  return (
    <div className="navContainer">
      <div className="Menu" ref={menu}>
        <div className="TitleMenuContainer">
          <h2 className="TitleMenu">Culture</h2>
          <div className="close" onClick={close}>
            <span class="material-icons-sharp">close</span>
          </div>
        </div>
        <div className="Bot">
          <div ref={navigation}>
            <NavLink to="/Europe">
              <li className="link">Europe</li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/NorthAmerica"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Amérique du Nord</li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/SouthAmerica"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Amérique du Sud</li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/Africa"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Afrique</li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/Asia"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Asie</li>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/Oceania"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Océanie</li>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="NavInContainer">
        <div className="left">
          <NavLink to="/">
            <h2 className="Title">Culture</h2>
          </NavLink>
          <div className="MenuButton">
            <div className="openMenu" ref={openMenuButton} onClick={show}>
              <span id="openMenuButton" class="material-icons-sharp">
                reorder
              </span>
            </div>
          </div>
          <div className="linkDiv" onClick={click} ref={navigation}>
            <NavLink
              to="/Europe"
              // className={(nav) => (nav.isActive ? "nav-active" : "")}
              // onClick={click}
              // ref={navigation}
            >
              <li className="link">Europe</li>
            </NavLink>
          </div>
          <div className="linkDiv">
            <NavLink
              to="/NorthAmerica"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Amérique du Nord</li>
            </NavLink>
          </div>
          <div className="linkDiv">
            <NavLink
              to="/SouthAmerica"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Amérique du Sud</li>
            </NavLink>
          </div>
          <div className="linkDiv">
            <NavLink
              to="/Africa"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Afrique</li>
            </NavLink>
          </div>
          <div className="linkDiv">
            <NavLink
              to="/Asia"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Asie</li>
            </NavLink>
          </div>
          <div className="linkDiv">
            <NavLink
              to="/Oceania"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              <li className="link">Océanie</li>
            </NavLink>
          </div>
        </div>
        <div className="Right">
          <button>Se connecter</button>
          <button>S'inscrire</button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
