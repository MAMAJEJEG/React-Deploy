import React from "react";
import { useRef, useState } from "react";
import PhotoComponent from "../../components/PhotoComponent";
import SaintMichel from "../../assets/France/SaintMichel.png";
import EffeilTower from "../../assets/France/EiffeilTower.png";
import ToulouseCapitol from "../../assets/France/capitoleToulouse.png";
import EndDisplay from "../../components/EndDisplay";
import StatsComponent from "../../components/StatsComponent";
import FrenchFlag from "../../assets/France/Frenchflag.png";

const FrenchCities = () => {
  const containerEnd = useRef();
  let [data, setData] = useState([
    { name: "Lille", point: useRef(), area: useRef() },
    { name: "Strasbourg", point: useRef(), id: useRef() },
    { name: "Paris", point: useRef(), id: useRef() },
    { name: "Rennes", point: useRef(), id: useRef() },
    { name: "Nantes", point: useRef(), id: useRef() },
    { name: "Nice", point: useRef(), id: useRef() },
    { name: "Marseille", point: useRef(), id: useRef() },
    { name: "Toulouse", point: useRef(), id: useRef() },
    { name: "Bordeaux", point: useRef(), id: useRef() },
    { name: "Lyon", point: useRef(), id: useRef() },
    { name: "Montpellier", point: useRef(), id: useRef() },
    { name: "Orléans", point: useRef(), id: useRef() },
  ]);

  function Over(e) {
    let id = e.target.id;
    if (e.target.id !== "svg") {
      data[id].point.current.classList.replace("cls-1", "zoom");
    }
  }

  function Out() {
    for (let i = 0; i < data.length; i++) {
      data[i].point.current.classList.replace("zoom", "cls-1");
    }
  }

  let [alea, setAlea] = useState(Math.floor(Math.random() * 13));
  let [Departement, setDepartement] = useState(
    "Cliquez sur la Ville " + data[alea].name
  );
  let [score, setScore] = useState(0);
  let [total, setTotal] = useState(0);
  let [Listuse, setListuse] = useState([]);

  function verifId(id) {
    // permet de ne pas pouvoir cliquer sur une même région
    console.log(Listuse);
    for (let i = 0; i <= Listuse.length - 1; i++) {
      if (total === 0) {
        return false;
      } else {
        if (data[id].name === Listuse[i].name) {
          return true;
        }
      }
    }
    return false;
  }

  async function click(e) {
    // vérifie si la région cliqué est bien une région et non le fond (svg),
    //vérifie qu'on clique pas plusieurs fois sur la même région deja coloré, vérfie que le total ne soit
    //pas supérieur à 13 pour éviter une boucle infinie
    //&& verifId(e.target.id) === false
    if (e.target.id !== "svg" && verifId(e.target.id) === false && total < 12) {
      setListuse((Listuse = [...Listuse, data[alea]]));
      let id = e.target.id;
      if (data[alea].name === data[id].name) {
        setDepartement((Departement = "Vrai"));
        setScore((score += 1));
        setTotal((total += 1));
        data[id].point.current.style.stroke = "green";
        data[id].point.current.style.fill = "green";

        // e.target.style.fill = "green";
        setTimeout(After, 1000);
      } else {
        setDepartement((Departement = "Faux"));
        setTotal((total += 1));
        data[alea].point.current.style.stroke = "red";
        data[alea].point.current.style.fill = "red";
        setTimeout(After, 1000);
      }

      if (total === 12) {
        setTimeout(() => {
          containerEnd.current.style.display = "block";
        }, 100);
      }
    }
  }

  function After() {
    // fonction qui s'occupe de la génération du nombre donc de la région
    if (total < 12) {
      setAlea((alea = Math.floor(Math.random() * 12)));
      for (let i = 0; i < Listuse.length; i++) {
        if (Listuse[i].name === data[alea].name) {
          After();
        } else {
          setDepartement(
            (Departement = "Cliquez sur la Ville " + data[alea].name)
          );
        }
      }
    }
  }

  return (
    <div className="map">
      <div className="LeftPhoto">
        <PhotoComponent src={SaintMichel} title={"Normandie"} />
        <PhotoComponent src={EffeilTower} title={"Paris"} />
        <PhotoComponent src={ToulouseCapitol} title={"Occitanie"} />
      </div>

      <div className="Midle">
        <div ref={containerEnd} className="containerEnd">
          <EndDisplay total={total} score={score} />
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2100"
          height="1500"
          viewBox="0 0 2100 1500"
        >
          <path
            id="Fond_13"
            data-name="Fond 13"
            class="cls-1"
            d="M1669,1235c24.8,7.75,4.75,43.23,13,61l11,11c1.49,3.52,8.8,69.73,7,75q-6.495,8.505-13,17c-6.02,18.59,6.5,41.36-4,58-5.8.16-5.34-.49-7,4,4.19-1.95,3.03-1.97,8-2l3,3c-2.41,3.74-9.42,5.85-11,9-1.67,3.34-1.06,9.1-4,15,3.36,1.97,4.04,2.45,3,6-1.89,10.78-15.54,3.43-20,1,0.67-1.67,1.33-3.33,2-5-16.96-4.97-32.43-9.7-43-21q3-5.505,6-11c4.89,0.21,6.33-1.53,9-6v-1c-10.82.5-22.06-.45-27-6,2.88-5.32,5.03-8.75,10-12-3.18-5.78.35-9.83-2-14a20.1,20.1,0,0,1-19,0c0.17-13.52,7.25-15.52,13-23-4.55-7.11-13.85-5.94-19-12-2.2-4.81-3.68-13.25-3-17,6.29-.15,9.36-1.5,13-4v-1c-5.58-4.41-12.24-7.67-16-14,3.11-4.88,7.83-8.18,12-12-3.17-8.45,3.19-11.25,4-21,3.33,0.33,6.67.67,10,1,3.88-14.52,13.99-9.73,25-17,2.97-1.96,7.43-12.11,10-15,9.4-.24,15.8-0.55,19,6,6.04-1.84,7.85-6.47,8-14l-6-6,3-30C1665.67,1237,1667.33,1236,1669,1235Z"
          />
          <path
            id="Fond_12"
            data-name="Fond 12"
            class="cls-1"
            d="M764,482c0-15.533-3.8-26.264-6-40-1.436-8.982,4.459-9.1,6-14q-1-12.5-2-25l17-2,14,12c13.9-7.267,39.458-5.164,56-17l6,3c1.133,11.6,8.229,18.524,14,26h9c5.835-8.079,18.392-18.908,31-11q2.5,11.5,5,23c9.523,1.892,7.894,8.146,14,11l16,1c0.807,0.32,14.52,10.918,18,13v3l-9,13c4.639,5.951,6.286,12.757,3,22l-6,1c0.308,21.122-11.123,14.895-18,26-2.372,3.83.747,5.867-2,9-5.957,3.018-11.216,4.517-16,8l-7-4q1,5.5,2,11h-3l-11-7c-6.24,7.369-1.778,10.939-4,19-5.18,18.79-22.087,59.113-39,65-4.3-9.91-37.142-3.114-47,0-0.786,18.957-13.255,5.8-25,8l-9,4q-0.5,1-1,2c6.533,16.381,17.45,26.452,22,40,5.484,16.33,1.079,40.273,5,58-10.605,7.506-22.338,5.92-35,3l-3-6c-13.206.284-22.315,8.839-29,16-7.431-3.139-11.229-10.758-17-13H702l-4-10-14-1s-18.95-14.029-20-15l-10-30c-4.577-7.8-15.594-16.314-22-23V647a57.406,57.406,0,0,0,16-22l-13-11-12,1c-0.024-5.447-.432-4.678,1-8,6.542-.787,5.9-2.454,10-5q-1-5.5-2-11l5-4v-1h-4l-8,8c-10.6.03-21-3.923-31-7q-0.5-2.5-1-5c5.709-4.408,2.448-6.383,1-13l13-11c13.182,2.937,34.253-3.423,41-13-0.589-2.873-.7-10.393,2-13,8.3-8.306,28.428-8.313,45-8,3.414-11.908,14.456-11.667,22-19,8.517,3.357,10.086,8.683,22,10,2.77-9.988,7.129-26.437,14-33h11Z"
          />
          <path
            id="Fond_11"
            data-name="Fond 11"
            class="cls-1"
            d="M897,653c12.806,0.387,24.869.076,33-4v-6l4,1c8.092,15.589,17.671,31.561,28,45q-1,8-2,16a173.446,173.446,0,0,1,33,30l-4,9c9.729,0.513,14.64-.057,22-2q3.5,3.5,7,7,5.5-5.5,11-11l23,3c1.33-2.666,2.67-5.334,4-8,20.87,0.03,33.89,3.969,55,4l9,20c4.1-2.3,2.63-2.9,7-1,7.87,13.094,17.93,29.41,19,50-7.24,9.253-14.89,13.963-23,22,1.69,9.993,9.12,11.328,13,19,1.78,7.538-2.23,8.11-4,13-2.43,6.731,7.74,28.262,3,40h-1c-5.93-1.082-10.59-5.294-14-9-0.67.333-1.33,0.667-2,1,0.25,6.663-.08,13.048-2,17-21.51,9.123-6.68,20.879-17,35-2.24,3.064-7.43,4.426-10,8,3.39,4.455,5.02,4.838,3,10-0.67.333-1.33,0.667-2,1-11.1-4.535-21.89-1.608-28,7h-1c-2.67-1-5.33-2-8-3-4.09-10.442-11.98-13.569-22-18-6.92,3.541-13.63,5.835-18,12,0.78,7.39,3.39,8.14,4,13-5.77,7.139-7.87,11.724-18,15,1.32,9.289,1.36,10.326-3,17-5.8-.22-9.408.09-12,3-3.234,7.25-5.262,11.97-9,18-3.333.33-6.667,0.67-10,1v1q4,12.495,8,25c-0.667.67-1.333,1.33-2,2-7.041,1.43-9.968-.32-15-3-0.667.67-1.333,1.33-2,2-3.213,14.29.012,23.25-3,38q-8.5,1.995-17,4c0.333,2.67.667,5.33,1,8-2.333.67-4.667,1.33-7,2q-3.5-3.495-7-7-9,1.995-18,4l-3,6c-9.274.9-16.532,4.08-20-3-5.159,1.52-6.37,4.18-10,7l-8-3a59.85,59.85,0,0,0-4,15c-1.667-.33-3.333-0.67-5-1q-2.5-4.995-5-10c-7.494,5.57-9.6,4-20,6-1.667,2.33-3.333,4.67-5,7,9.748,19.87-8.069,29.41-4,44,1.333,2.33,2.667,4.67,4,7,7.052-.17,11.753.79,16,3q2.5,4.995,5,10c-1.333,2.33-2.667,4.67-4,7q5,8.505,10,17c-6.286,6.97-7.383,16.98-13,25q-7.5,6.495-15,13c0.667,2.67,1.333,5.33,2,8-5.17-.32-6.743-1.39-9,1-4.318,10.09-3.035,25.44-10,33-4.108,4.57-19.973,8.84-25,7l-20-15q-0.5-6-1-12c-19.31.78-62.817-12.87-64-26-1,.67-2,1.33-3,2l-4,9c-5.592-1.64-8.068-4.05-12-7v-6c8.031-3.09,10.923-14.51,10-23l-15-6c-3.693,3.02-5.821,4.8-12,3v-6h-9q-4-3.495-8-7c2.167-11.86,10.306-5.11,18-11q10.5-15,21-30,13-54.99,26-110c3.669-16.92,1.723-49.19,17-54,4.713,2.56,6.124,2.31,14,2-1.918-7.019-7.781-12.235-13-16l-9,10-2-1q5.5-36.5,11-73,1.5-26,3-52l11-13c1.9,1.373,1.636.973,3,3q0.5,5.5,1,11l27,23,10,41,3-3-10-51c-7.808-18.614-34.866-26.852-49-40-8.578-21.257.764-26.726-18-42,0.378-4.613.717-13.044,3-16,4.921,3.51,10.029,5.944,16,9,1.123,15.972,4.279,12.407,1,27l1,1h6v-1c-1.191-3.2-1.488-4.452,0-9l6-1c0.523-11.546-1.187-9.74-3-20,6.829,0.236,7.543.46,9-5-6.763-3.33-10.544-12.453-17-16-10.776-5.921-14.876,1.934-25-10q0.5-2,1-4h1c7.7,3.176,14.734,6.573,24,7,1.678-11.577,14.683-24,28-25l6,8c17.213-4,29.452,4.242,43-12l-9-8c8.849-20.394-8.754-44.95-7-62-8.458-6.036-13.248-12.059-16-24,11.848-2.831,32.964,5.588,34-12,24.543-1.878,27.457-4.734,48,2,3.6-7.191,8.488-11.811,14-17l3,2c2.529,9.057,14.931,16.189,24,19v17Z"
          />
          <path
            id="Fond_10"
            data-name="Fond 10"
            class="cls-1"
            d="M1320,1200c-0.33-3.67-.67-7.33-1-11-24.23-1.76-38.78,16.62-54,28q-5.505,6.495-11,13-8.505.495-17,1a132.653,132.653,0,0,1-21,11c-0.57,10.67-6.93,18.07-17,19-4.64-3.74-4.63-5.73-10-4,0.33,2.33.67,4.67,1,7a51.011,51.011,0,0,0,10,4q0.495,39.99,1,80c5.82,1.57,8.74,3.94,11,9v10c-9.96-.8-11.36-4.5-17-9-5.54.03-38.06,12.96-39,14-4.56,5.06,2.02,6.25-6,9-6.63-3.45-4.17.02-13,1-7.23-5.89-24.55-23.31-41-15-6.62,3.34-6.04,14.18-17,11-8.54-1.75-4.3-10.78-11-16-22.84-11.24-15.7-4.34-26-28-10.65-.4-29.75-0.69-34-3q-3-5.505-6-11c-30.933,3.12-17.992-3.72-32-11l-26-3c-6.8-2.48-9.294-7.78-19-9q-1,13.005-2,26l-38-3c-3.421,1.39-1.749,4.82-7,4-7.6-1.01-10.534-5.09-14-10-6.844,3.73-13.4,6.97-23,8-11.112-5.85-17.346-18.71-31-27-0.055-3.08,8-31,8-31,1.552-.77,7.934-0.12,10-1-1.223-5.61-2.208-7.24,0-12,13.015-5.85,17.46-23.8,25-35q-4.5-8.505-9-17c1.333-1.67,2.667-3.33,4-5q-5-8.505-10-17c-29.9,1.27-8.94-25.2-6-37,1.79-7.18-7.127-8.39-2-17,8.73-1.22,10.98-1.08,19-3,1,5.33,2.54,7.3,6,10,2-.67,4-1.33,6-2q0.5-6,1-12c0.667-.33,1.333-0.67,2-1l7,3,6-6c19.151,5,24.648-7.31,43-9q5,4.005,10,8c2.666-1.33,5.334-2.67,8-4q0.5-4.5,1-9c23.561-.75,17.86-20.35,15-35l4-6c5.883,3.42,11.079,2.43,19,1-2.167-9.94-7.193-15.79-8-28,3-.33,6-0.67,9-1,8.163-19.7,18.385-17.72,28-33-1.33-1-2.67-2-4-3,0.67-1,1.33-2,2-3,8.62-1.071,15.19-12.356,17-20-3.54-2.623-4.4-3.062-5-9,0.33-.667.67-1.333,1-2,6-2.384,8.81-5.24,17-6,9.8,6.282,13.71,13.173,22,20,7.84-.481,10.18-3.77,14-8,5.41,3.534,5.65,4.065,10-2h1c2.33,1,4.67,2,7,3,0.1,14.639,5.25,18,11,26q-3,7-6,14c5.39,5.78,5.27,4.48,4,14,2.67,0.33,5.33.67,8,1,1.67-2.33,3.33-4.67,5-7,7.22,0.67,16.56,4.13,24,1,11.59-8.36,9.7-24.134,17-37q5.505-3.5,11-7l3,10c6-.6,7.22-1.921,10,2q1.005,5.5,2,11l6,2c-0.5,10.9,1.24,15.6,7,20h1q7.005-19,14-38c0.67-.333,1.33-0.667,2-1l9,4c2.23-8.694,9.15-15.42,19-13,1.62,7.717,5.09,18.163,10,23,6.21-3.571,13.75-8.71,19-11,0.67,2.333,1.33,4.667,2,7l12-1,12,16q1.995,10.5,4,21l8,8c1.8,5.65-1,9.42,1,14q4.5,2.505,9,5,1.005,7.995,2,16c10.74-4.38,13.32,5.21,26,7l1-1c0.33-3,.67-6,1-9h6c0.88,7.94,3.85,7.39,11,6,0.33-2,.67-4,1-6h3c9.55,4.6,19.82,10.35,23,21q0.495,7.5,1,15,7.995,8.505,16,17l-3,6q-9.495,4.995-19,10-1.995,13.995-4,28c-7.42-.6-10.86-2.24-16,0-1.99,7.05-2.04,13.96-4,19-11.14,4.28-14.62,10.99-20,21h-17Z"
          />
          <path
            id="Fond_9"
            data-name="Fond 9"
            class="cls-1"
            d="M1643,1063c18.76-.33,25.86,7.19,36,15,17.04-.29,27.04-10.73,42-9,2.61,12.05,4.76,16.47,4,32l-11,3c-1.94,8.86-2.8,10.32-8,17,2.57,5.49,4.27,6.78,4,13-15.04,6.29-19.78,20.89-42,21q-1.005,8.505-2,17c-7.71.98-13.09,2.23-19,3,0.35,13.38-3.61,14.25-9,21l-16,3c-0.62,10.84-5.38,12.59-11,18,4.51,0.22,5.39.71,8,2v14c-13.24,2.53-21.76,2.93-33,7-2.16,5.4-2.67,10.24-9,12-2.38-4.04-7.42-5.38-13-6-5.69,4.68-5.98,4.95-4,13l-1,1h-5l-2-2c0.67-1.67,1.33-3.33,2-5-18.58-1.09-19.48,4.9-34,8-16.52-16.99-19.27-24.41-56-24l3-9-1-1h-9v-4c4.01-1.89,5.06-2.81,6-8-11.43,2.45-30.25,3.14-39,2-3.11-6.26-9.49-16.6-17-12-1.33.67-2.67,1.33-4,2,0.67,1,1.33,2,2,3,3.29,1.67,4.13,3.01,6,6-0.33.67-.67,1.33-1,2-14.75,1.03-26.64,1.83-39-3q1.5-4.995,3-10c2.33-.33,4.67-0.67,7-1-7.42-5.43-27.12-4.25-39-4,0.46-6.58,2.41-8.88,5-13q7.995-4.995,16-10c-3.35-6.4-2.36-9.56,1-16,6.21,1.23,12.79,3.5,16-1q1.995-13.005,4-26c7.18-4.52,17.57-8.61,22-16-2.06-11.86-13.29-12.41-17-21v-13q-4.995-7.995-10-16c1-1.33,2-2.67,3-4h14c-0.4,8.36-.74,11.03,2,16l7-7c7.16-1.43,8.78-3.21,13-7q7.5,1.995,15,4c0.33,2.33.67,4.67,1,7q13.995,1.995,28,4c1.35,8.1,7.65,11.95,17,12q4.5-4.995,9-10c2.33,1.67,4.67,3.33,7,5v-2q1.5-9.495,3-19c-8.57-7.81-15.43-10.37-28-15-0.33-2.33-.67-4.67-1-7,2-1.67,4-3.33,6-5l-5-5c0.33-.67.67-1.33,1-2,8.03,0.24,9.7,2.47,16,4q3-4.005,6-8c-3.37-4.01-5.23-3.75-6-11,6.39-10.79,14.28-10.04,25-16l-3-10c0.33-.333.67-0.667,1-1,8.69,0.326,11.54-.864,16-4-0.58-4.89-.7-5.38,1-9,12.86-1.408,26.39-4.393,43-9V957c-7.52-5.443-7.8-8.761-19-12-0.02-7.229,1.38-9.962,4-14,13.06-.7,9.01,2.378,15,10l11-2c0.67-3,1.33-6,2-9,19.71-.651,27.94,14.129,30,31a246.154,246.154,0,0,1,28,8c-0.26,9.06-.04,12.142,3,17,3.36,0.543,4.32,1.016,6,6-12.34,2.613-22.76,26.26-21,37,2.67,1,5.33,2,8,3-1.55,4.22-2.41,3.35-5,6v8l11,8v9Z"
          />
          <path
            id="Fond_8"
            data-name="Fond 8"
            class="cls-1"
            d="M1616,778h6q4.995,6,10,12v16q-10.005,5-20,10-0.495,8.5-1,17c3.99,2.182,5.16,7.5,9,9,4.78,1.873,7.43-.467,11,1q0.495,9.5,1,19c10.33,3.466,15.19,11.131,22,18-1.71,10.244-3.2,14.238-5,25q-10.995,6.5-22,13c-2.66,2.43-1.81,5.755-5,8-4.59,1.072-6.73-2.724-10-3h-1l-31,6c-1.33,2.666-2.67,5.334-4,8h-6c-1.53-11.861-13-10.279-20-5-1.45,7.418-2.45,11.391,1,17,5.3-.084,8.02.525,11,2,1.08,5.529,2.19,4.8,5,8-0.33,3-.67,6-1,9-14.45-1.118-34.34,4.778-44,11-0.01,4.134,1.04,4.927-1,9l-15,1c0.34,7.137,2.34,8.844,2,13q-9.495,2-19,4c-4.71,9.74-3.02,15.68,0,25-1,.67-2,1.33-3,2-6.66-1.11-10.89-3.85-18-2-0.33,1-.67,2-1,3,1.32,3.83,0,2.08,3,4-1.33,2.33-2.67,4.67-4,7,0.9,4.76,1.42,7.76,5,10,11.33,5.25,16.92,6.06,24,15q-1.005,5.505-2,11l-6-3c-3.13,3.7-3.62,8.37-8,11-1.67.33-3.33,0.67-5,1-6.35-3.45-7.05-9.72-12-13l-26-3c0.37-6.93,2.47-10.42,1-13-4.53,2.99-9.69,5.22-17,3v-3q3-4.995,6-10-4.005-3.495-8-7c-6.33-.01-7.58.86-11,3-1.33,2.33-2.67,4.67-4,7,1.13,8.76,4.03,9.47,7,15-5.45.99-5.59,2.46-9,5h-3c0.56-7.53.17-8.61-2-14-10.16.23-14.84,2.21-20,7l-18-9c-0.67,3-1.33,6-2,9-1.67-.33-3.33-0.67-5-1-0.67-2.33-1.33-4.67-2-7-3.33.67-6.67,1.33-10,2-0.14,5.36-.5,6.4-3,9-8.02-3.83-11.81-8.82-21-9,0.21-5.98-.31-10.57-2-14q-4.5-2.505-9-5c1.06-18.66-16.74-46.182-26-59h-11c-0.77-4.419-.6-3.714-3-6l-6,1c-0.67,2.333-1.33,4.667-2,7l-12,1q-4.995-11.5-10-23c-10.48,3.773-13.97,6.05-20,14q-4.995-2.5-10-5-6.495,19-13,38h-4v-2c-4.58-11.386-7.45-18.39-10-30l-11-1-3-10h-3q-7.005,6.5-14,13v10c-2.42,6.384-8.73,15.91-12,22-15.72,1.56-22.17-1.88-32,6-0.67-.33-1.33-0.67-2-1,1.75-8.94-.58-6.14-3-14q2.505-6.5,5-13c-7.68-5.28-11.06-10.777-11-24l6-6c-1.33-2.666-2.67-5.334-4-8,3.92-5.553,9.94-8.163,12-16q-0.495-6.5-1-13c3.62-11,12.55-6.753,18-27h1q3.495,3.5,7,7c6.39-.368,6.44-1.482,10-4v-1c-0.78-3.083-5.45-35.253-5-37,0.99-3.9,6.15-5.24,5-12-1.52-8.9-11.45-10.68-14-20,10.25-6.651,15.33-13.061,23-22-0.22-7.87-8.08-41.368-12-47-2.91-4.179-8.72-6.007-12-11-1.33,1-2.67,2-4,3-0.67-1-1.33-2-2-3-2.58-5.007-6.65-13.129-5-18q2.505-4,5-8c6.19-1.389,19.97-1.286,23-3,4.46-1.8,6.4-3.057,7-9-2.08-3.09-4.17-6.19-2-11q4.995-6,10-12,4.005,2,8,4c6.58-4.652,11.96-10.123,18-15l9,1c3.13,8.511,11.39,13.2,18,18,7.11-2.331,22.1-4.537,27-3,0.58,4.439.77,4.668,3,7,7.18-3.457,8.78-8.922,14-14l4,1c9.52,20.97,10.39,34.814,36,38,2.82,6.208,2.23,13.455,2,24q-5.505,4-11,8,1.995,6.5,4,13c7.47,1.087,5.94,3.6,13,5,8.28-4.681,18.98-3.75,27,2,3.68-2.479,6.65-3.4,12-5l3-17c6.63-1.577,7.58,1.959,12,3,4.68,1.1,11.62-3.6,18-5,0.67,0.667,1.33,1.333,2,2q1.995,8.5,4,17h6c2.29-11.5,9.34-51.826,21-54,8.73,4.883,9.64,1.7,20,0,8.64,13.955,28.64,20.508,32,37h5c7.14-2.845,8.75-6.778,14-11,2.33,0.667,4.67,1.333,7,2,0.33,2.666.67,5.334,1,8h17c6.28-8.736,15.6-20.5,25-26q4.005,3,8,6c-4.13,9.59-4.98,10.169-6,21-7.9-.727-9.46.608-15,4-0.33,3-.67,6-1,9l3,1c13.58-2.935,19.78-5.158,31-14-4-3.082-5.36-3.164-6-10,1.67-3.433,2.78-7.858,6-10,2.05-2.1,1.76-1.635,6-2,2.01,1.437,2.43,2.253,4,4,8.04-7.257,26.43-17.016,43-9,1.29,7.951,5.96,8.981,9,15,2.71,10.953-5.62,12.788-2,20,3.91,0.882,4.98,1.375,7,4C1615.33,770.666,1615.67,774.334,1616,778Z"
          />
          <path
            id="Fond_7"
            data-name="Fond 7"
            class="cls-1"
            d="M1396,533c18.06-.011,24.43,6.642,34,15,14.1-2.794,10.56-8.593,19-15,8.29-2.283,17.38,4.193,25-4q2.505-7,5-14c-5.27-1.1-3.81.175-5-5,6.93-1.912,9.21-4.724,15-6,1.54-15.1,15.5-16.554,22-27l9,1c0.46,8.451,4,9.5,10,12,5.92-2.579,9.59-4.081,19-4q4.005,4.5,8,9c7.04-1.691,6.71-5.059,13-7,14.31,9.546,31.83,18.51,46,29-0.41,9.264-3.06,15.32,0,22,3.89-.935,4.85-0.53,8,1q0.495,7.5,1,15c-7.12,1.618-14.94,10.416-17,17,6.22-1.13,10.12-2.285,15,0v6q-5.505,4-11,8c1.33,3.485,1.85,5.31,1,9-6.07,3.4-18.76,15.482-23,21q-1.005,6-2,12-13.005,8-26,16v27l-33,29,3,9c-6.61,5.667-3.07,7.631-7,17q-12,12.5-24,25l-13-1c-0.73-7.322-4.55-8.82-12-9-2.98,4.77-6.04,8.173-11,11l-4-1c-2.92-16.085-25.72-20.872-31-35-7.77-.713-9.96.084-15,4-3.64-2.585-6.51-6.109-12-4-12.23,6.967-12.98,38.882-19,52h-1c-3.03-5.376-3.82-13.72-8-18-7.76.871-29.88,1.589-34,4l-3,16c-11.6,1.278-25.23-.222-39,2-4.54-6.806-9.21-3.123-9-16l9-7q-0.495-10.5-1-21c-4.78-10.023-14.59-4.511-24-10-1.72-1-8.71-29.309-20-36l-3,2c-2.03,5.23-5.24,10.256-11,12-1.14-5.74-2.28-6.84-8-8-2.4,3.395-2.34,3.563-8,4-0.67-1.667-1.33-3.333-2-5-10.34,6.1-19.96,4.356-27-7,13.07-32.519-6.09-66.513-18-90,7.32-13.652,1.65-17.581-2-30q5.505-2.5,11-5c-3.65-10.018-9.28-19.527-11-29,9.49,0.342,14.08-1.921,17-8,1.59-6-.48-7.947-2-13l12-11c0.12-17.406-11.27-25.17-18-36q4.995-6.5,10-13l-3-8c0.67-1.333,1.33-2.667,2-4,13.55-4.9,31.01-4.493,45-4q6.495,7,13,14c1.62,5.5-3.01,11.392,1,16q4.005,3.5,8,7c1.67-1,3.33-2,5-3,7.6,5.852,14.88,23.5,18,33,14.34,0.749,22.42,1.808,32-3,3.56,2.911,2.77,4.1,9,5,10.05-8.706,24.06-4.392,31-17,23.66-.46,34.13,16.079,42,31l-6,7C1394.29,523.461,1395.93,524.606,1396,533Z"
          />
          <path
            id="Fond_6"
            data-name="Fond 6"
            class="cls-1"
            d="M1029,341c16.46,5.628,6.8,26.254,10,39,2.38,9.5,14.94,13.715,19,21,3.75,6.732-.04,12.014,6,16l12,4,3,22c11.11-1.032,18.45-2.239,25-7,14.02,5.133,22.26,8.621,32,17-0.22,4.513-.71,5.391-2,8-2.33,1.666-4.67,3.334-7,5v1l6,4c8.86-2.706,24.63-5.418,32-8l3,4c16.49-6.128,15.76-5.972,24,10,3.2,6.207,8.09,4.58,8,16q-7.005,6.5-14,13c4.52,6.215,4.5,9.916,0,16l-15,1v3c4,9.646,7.52,15.317,11,27q-4.995,3-10,6c1.29,6.947,5.24,7.452,7,12,3.71,9.58-5.05,13.479-5,19,0.06,7.327,8.07,7.876,11,12,7.58,10.686,14.1,65.069,7,74-12.62-4.031-18.47,5.968-27,12-2.33-1.333-4.67-2.667-7-4l-15,16c0.41,7.877,2.96,10.272,2,16-19.49,6.559-22.91-.383-37,18-19.81.786-33.78-3.647-54-4-1.33,2.666-2.67,5.334-4,8-8.25.024-15.62-1.408-21-4q-4.995,5-10,10l-9-6c-4.92,2.37-7.75,5.045-15,3,1.391-20.623-21.744-25.607-32-38q1-8,2-16c-15.194-11.745-18.2-35.854-33-48l-3,2-4,7c-5.69,1.522-18.742,6.058-24,1q-0.5-7.5-1-15c-10.664-2.661-14.908-9-24-14-1.993-19.454,8.788-25.642,13-38,4.749-13.931.4-23.454,7-34,5.74,3.245,7.6,5.789,17,6v-7c6.849-1.75,15.468-6.876,23-10-2.134-5.47-1.693-6.635,1-11,14.368-4.125,9.448-9.9,16-22l5-1c7.244-7.943-.406-23.641-1-28l9-12c-4.883-7.667-14.585-21.632-10-30a45.81,45.81,0,0,0,18-9V402c-6.9-4.743-12.462-8.547-13-20l5-6c9.913-1.371,16.519-7.686,25-10,9.55-2.605,18.39,3.788,27-2C1018.67,351.1,1026.14,353.26,1029,341Z"
          />
          <path
            id="Fond_5"
            data-name="Fond 5"
            class="cls-1"
            d="M1060,397c-2.33-.667-4.67-1.333-7-2-1.8-7.942-8.78-8.248-11-15-2.78-8.444,3.62-18.776,1-27-3.45-10.854-11.2-19.453-16-29,4.21-3.753,11.04-2.552,16-6q4.995-10.5,10-21,3.495,4,7,8c14.96,0.268,23.38-2.894,33-5,14.39,11.183,38.24,1.146,49,20,13.79-3.4,12.95,3.429,22,1,2.04-.548,1.41-3.671,6-3,2.33,0.341,2.55,3.9,7,3,8.18-1.654,12.92-5.6,23-7,8.35,16.07,15.5,33.954,34,39-1.73,5.956-4.24,7.3-5,15,7.35,5.6,4.08,10.256,5,19,3.69,1.316,4.14.53,6,4-10.61,4.878-9.81,24.711-15,35-14.01,2.424-30.4-3.007-36,9-3.04,6.516,2.42,8-1,13-3.36,7.479-9.84,11.337-17,15l-11-3c-3.31,7.04-19.33,5.037-26,8-0.67-1.333-1.33-2.667-2-4l6-4V450c-6.17-3.163-8.02-9-13-12-6.48-3.912-15.8-2.533-21-6-6.69,5.031-10.44,5.316-21,8-0.67-.333-1.33-0.667-2-1q-1.995-11-4-22c-7.54-1.78-11.98-1.588-15-8Q1060.995,403,1060,397Z"
          />
          <path
            id="Fond_4"
            data-name="Fond 4"
            class="cls-1"
            d="M1245,385h-9v-3c3.27-8.735-2.4-11.05-4-20,10.16-10.784,17.8-24.4,27-36-2.17-3.139-4.43-4.427-7-7,3.18-7.247-.9-7.225,1-13l12-1c-2.87-6.114-5.81-7.647-10-12-0.23-6.209.24-11.4,2-15,6.24-2.785,8.67-5.047,19-5,0.67-2.333,1.33-4.667,2-7,7.43,1.533,8.31,4.9,16,4,2.57-10.128,2.53-25.231,4-34-2.58-1.721-3.41-2.111-5-5,0.33-.667.67-1.333,1-2l9-2c0.78-11.037,8.19-8.044,10-16-0.67-3-1.33-6-2-9-0.3-7.646,3.13-5.388,5-9,0,0-4.01-15.987-3-21h8q3.495,3,7,6a73.148,73.148,0,0,0,25-10c-0.42-12.526,4.1-18.176,11-23h11v11l-6,4c3.56,5.841,1.41,10.1,1,16,4.46,2,5.64,2.955,8,7-1.24,5.059-2.71,11.068-1,17,20.91-.2,14.49,4.922,24,12,2.8,2.085,15.78,2.346,20,5,0.42,4.528,13.52,21.735,17,26,11.93-4.155,17.79-9.923,33-10,5.55,9.307,16.33,14.041,31,14,3.27-5.644,7.74-8.152,17-8,6.29,9.2,10.19,1.46,21,5l15,11c0.05,9.7,12.31,32.868,20,35,3.1-1.313,14.45-8.849,16-10,6.44,3.325,11.95,11.267,18,13,19.65,5.629,25.62-12.249,41-6,2.77,5.9,13.68,13.907,21,15,9.1-4.813,43.96,1.312,56,9v3c-14.88,7.893-3.29,17.2-10,26l-8,2c-5.15,3.091-2.08,7.224-5,13q-7.005,5.5-14,11c-0.59.99-8.3,34.977-9,38q1.005,9.5,2,19-7.005,13-14,26c-3.38,12.3,6.68,19.941,5,27-3.13,13.138-7.79,29.992-10,44l9,13c-2.17,11.286-7.83,23.147-16,29-7.13.335-18,1.055-22-2-5.57-5.425-8.01-15.085-10-24-4.17-1.176-6.4-1.614-9-4q1.995-6.5,4-13c-5.54-6.793-50.74-34.84-54-33q-3.495,3-7,6-4.995-4.5-10-9c-9.66.312-17.81,4.593-22,2-4.18-2.438-4.06-6.7-6-11l-11,1q-3.495,4-7,8c-4.36-1.669-3.3-2.234-8-2-3.37,12.709-9.89,21.882-24,27,0.38,8.59,1.68,11.839,1,20-8.1.889-21.42-.054-27,4-3.39,3.652-2.46,8.187-7,11l-8,2-9-13c-7.81,2.136-15.69,2.487-22-4q-1.995-4.5-4-9,2.505-3.5,5-7c-6.44-16.463-23.13-36.6-47-33-13.67,15.436-19.28,5.708-31,16-1.67-2-3.33-4-5-6-9.39,4.853-18.21,6.845-32,4-5.22-10.645-11.13-23.874-18-33-7.81,1.733-8.27,1.22-14-3,0.89-19.576-6.8-28.656-22-31-3.77-14.872,6.81-28.407,14-36v-5Z"
          />
          <path
            id="Fond_3"
            data-name="Fond 3"
            class="cls-1"
            d="M1309,172c0.19,20.7,4.05,38.043-9,53-2.16,2.474-7.68,1.31-10,4-1.82,3.477-1.66,2.435,0,6,1.67,0.667,3.33,1.333,5,2-1.76,7.9-1.51,21.72-4,31h-1l-12-5c-8.63,6.883-35.08,12.114-24,34,4.01,1.572,4.57,1.637,6,6-5.59.034-8.75,0.5-11,4-0.97,4.162.79,4.138,2,9-3.65,1.059-2.94.814-5,3,0.33,1.666.67,3.334,1,5,4.54,0.056,5.75.2,8,2-6.53,8.843-11.72,17.013-20,24-8.22-2.425-24.23-14.955-28-22-4.6-8.605-.5-11.675-8-17-5.8.87-6.26,3.96-10,5-13.43,3.734-18.82-2.665-29,3-11.05-7.834-9.7-.465-18-3q-12.495-8-25-16c-2.86-1.137-7.69,5.971-14,4l-9-7c-7.92-2.647-22.39,11.1-37,1-0.33-2.333-.67-4.667-1-7l8-1v-3q-4.005-12-8-24,3.495-6,7-12l-6-2c-0.77-15.942-4.24-30.34,5-40-10.81-19.173-19.45-45.3-44-50v-4c6.97-5.156,8.18-14.642,19-16q5.505,3,11,6v-3l-12-12q0.495-46.5,1-93,12.495-9.5,25-19c7.28-3.2,72.81-15.26,74-15h3c10.47,5.919,4.46,29.887,7,40,13.5,0.185,13.87,9.126,19,17l5,1c8.42-6.7,13.75-12.372,28-14,2.49,6.275,9.19,8.943,11,14q1.005,13,2,26l12,6c7.94-4.629,16.35-3.409,23,0,5.23,9.4,6.59,12.767,6,28,9.28-3.319,24.32-12,38-6q9,7.5,18,15c-1.84,5.284-6.04,10.953-9,17q4.995,2.5,10,5c-0.33,3.666-.67,7.334-1,11-4.23,1.724-7.09,2.8-9,7,0.33,0.667.67,1.333,1,2h9Z"
          />
          <path
            id="Fond_2"
            data-name="Fond 2"
            class="cls-1"
            d="M713,381l13-3v-5c-14.347-2.789-14.934-9.541-20-21l6-14c2.149-7.8-6.927-58.466-11-66l-16-20c-4.625-14.061,5.09-23.5-1-36-4.574-1.581-6.452-3.546-9-7q0.5-2,1-4l3-2c10.719,5.158,23.605,12.016,34,15,6.015-7.629,24.985-11.965,36-5,1.452,14.135-.614,11.478-6,22,3.913,12.01,12.049,16.29,14,31h1c29.749-10.745,69.021,9.327,95,17,14.917-12.965,35.666-14.015,51-24-9.113-3.979-14.16-5.841-21-11,3.7-57.844,67.7-46.091,108-68l24-19c6.08,0.9,8.9,1.6,13,4,8.33,17.122,24.79,21.946,30,45-15.2,13.858,1.98,31.483,0,46-0.47,3.413-7.58,6.312-5,13,1.84,4.756,7.08,10.345,5,18-1.67-.667-3.33-1.333-5-2-0.74,10.525-7.19,23.244-12,31-7.26.526-13.47,2.631-17,7,3.49,10.306,5.57,16.239,0,27l-9,4c-0.33,3.333-.67,6.667-1,10-7.24,1.689-17.174-2.6-23-1-8.565,2.347-28.751,11.928-34,19,4.35,11.339,7.709,14,14,22q0.5,8,1,16c-4.98,8.581-15.313,8.43-22,15,2.172,5.668,8.127,13.278,3,20l-11-12c-10.65,4.289-21.962-3.961-27-11-3.618-9.5-3.472-17-8-24l-16,1-14,13-6-1c-8.8-7.245-10.467-26.211-24-28-14.934,12.952-10.043,2.395-27,7l-12,8-6-3-11,4c-3.209-3.494-7.012-10.626-12-12l-17,3c-5.265-1.6-10.774-5.466-16-7h-4l-1,1c-2.4,4.577-9.082,8-13,11C718.567,401.78,713.47,393.192,713,381Z"
          />
          <path
            id="Fond_1"
            data-name="Fond 1"
            class="cls-1"
            d="M761,479l-12,2-11,30-2,1c-10.459-2.6-11.289-8.5-23-10q-1,3.5-2,7c-15.215.187-11.768,7.786-21,12-18.538,4.428-32.116,3.144-45,10q-1,8-2,16h-2l-2,1c-6.22,2.319-27.04,15.534-30,5l-2,1-2,3-3,1-3-2,3-5h-2c-5.134-2.314-23.863-.766-31,2-5.157-3.244-7.015-7.227-13-10l3-6h1l14,5,2-1v-4l-4-5-5-1c-2.307,3.826-11.786,7.091-16,8l-6-6c-4.014,3.258-2.669,3.508-9,3v8l3,8c-6.386-.368-6.435-1.482-10-4,3.316-33.939-10.548-22.285-29-35l-4-9c-1.2-1.328-17.879-6.431-20-7-4.393-1.178-13.214,3.249-19-1l-7-11c-8.309,2.8-13.21-2.193-22-3,2.2,5.122,1.6,5.713-1,10-9.538.583-18.365,1.915-23-4,10.985-24.491-14.863-32.01-33-38v-4l3-2,44-4q1-2.5,2-5c-2.587-7.07-13.734-14.943-20-14l-4,9-4-1q0.5-6.5,1-13l-9-2c1.141-4.023,1.374-3.827,4-6,2.1-3.19,1.039-2.478,6-3,9.557,4.66,17.037,8.033,32,8v-1c-2.46-1.754-8.565-2.195-11-4l1-4c-5.474,1.259-5.706,2.487-11,2q1-3.5,2-7c-10.334,3.047-27.074,6.451-37,4,0.44-8.908.387-10.065-1-18l7-6-4-7c7.238-5.775,19.052-8.671,25-16,13.025,1.044,12.738-2.819,27-3l3,5c10.2-5.876,20.868-7.251,32-10q0.5,5,1,10c7.3,0.672,5.561,2.31,10,5l1-3q0.5-4.5,1-9c11.891,0.087,20.982,4.591,26,3,1.209-4.317,2.051-4.727,5-7-2.883-4.219-3.245-3.08-3-9l12-4c9.089,4.852,16.118-.579,28-3q1,2,2,4c3.6-2.621,7.311-3.746,13-2,1.719,9.342,8.56,10.524,12,17v8l11,8c2.068,4.41-.554,7.557,1,11,4.416,0.934,5.994,1.647,8,5l3,9h1c4-13.292,18.263-10.712,23-23,6.529,0.217,12-.3,16-2,1.318,1.664,1.932,4.848,3,7,3.674-1.25,2.512-1.1,7-1,1.663,6.322.283,7.69,8,7q0.5-2.5,1-5l10,1,10-11,10,1c-0.92,5.688-2.791,7.459-1,10,7.382,9.025,18.729-.941,30,5,8.795,4.636,1.139,23.68,22,28l14-12,15,5c-0.08,9.723,5.209,18.385,2,27-1.708,4.584-6.387,6.249-5,16C757.868,457.128,760.833,465.967,761,479Z"
          />
        </svg>

        <div className="QuestionDisplay">
          <p>{Departement}</p>
        </div>

        <svg
          id="svg"
          className="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="2100"
          height="1500"
          viewBox="0 0 2100 1500"
          onMouseOver={Over}
          onMouseOut={Out}
          onClick={click}
        >
          <rect
            ref={data[0].area}
            id="0"
            data-name="Fond 1"
            x="1113"
            y="27"
            width="147"
            height="140"
          />
          <rect
            ref={data[1].area}
            id="1"
            data-name="Fond 7"
            x="1611"
            y="328"
            width="117"
            height="116"
          />
          <rect
            ref={data[2].area}
            id="2"
            data-name="Fond 2"
            x="1093"
            y="337"
            width="85"
            height="74"
          />
          <rect
            ref={data[3].area}
            id="3"
            data-name="Fond 3"
            x="666"
            y="408"
            width="86"
            height="77"
          />
          <rect
            ref={data[4].area}
            id="4"
            data-name="Fond 4"
            x="631"
            y="556"
            width="113"
            height="101"
          />

          <rect
            ref={data[5].area}
            id="5"
            data-name="Fond 12"
            x="1602"
            y="1078"
            width="114"
            height="112"
          />
          <rect
            ref={data[6].area}
            id="6"
            data-name="Fond 11"
            x="1422"
            y="1144"
            width="108"
            height="100"
          />
          <rect
            ref={data[7].area}
            id="7"
            data-name="Fond 9"
            x="946"
            y="1173"
            width="139"
            height="128"
          />
          <rect
            ref={data[8].area}
            id="8"
            data-name="Fond 10"
            x="723"
            y="931"
            width="114"
            height="127"
          />
          <rect
            ref={data[9].area}
            id="9"
            data-name="Fond 6"
            x="1308"
            y="802"
            width="99"
            height="92"
          />

          <rect
            ref={data[10].area}
            id="10"
            data-name="Fond 8"
            x="1198"
            y="1126"
            width="107"
            height="107"
          />
          <rect
            ref={data[11].area}
            id="11"
            data-name="Fond 5"
            x="948"
            y="514"
            width="99"
            height="100"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2100"
          height="1500"
          viewBox="0 0 2100 1500"
          className="CitiesPoints"
        >
          <path
            ref={data[0].point}
            id="0"
            data-name="Fond 1"
            class="cls-1"
            d="M1183,76l8,1c5.61,2.449,7.85,5.989,8,14q-2.505,4-5,8c-3.33.667-6.67,1.333-10,2-6.48-3.022-9.59-5.772-10-15C1177.15,81.267,1178.54,79.362,1183,76Z"
          />
          <path
            ref={data[1].point}
            id="1"
            data-name="Fond 2"
            class="cls-1"
            d="M1664,365l8,1,6,7c0.33,2.666.67,5.334,1,8q-3.495,4.5-7,9c-13.84.924-19.06-5.576-16-18Q1660.005,368.5,1664,365Z"
          />
          <path
            ref={data[2].point}
            id="2"
            data-name="Fond 3"
            class="cls-1"
            d="M1134,356l8,1,6,7c3.15,9.964-4.78,21.591-16,16-1.67-1-3.33-2-5-3-1.22-3.848-2.97-8.511-1-13C1128.05,359.537,1130.33,358.687,1134,356Z"
          />
          <path
            ref={data[3].point}
            id="3"
            data-name="Fond 5"
            class="cls-1"
            d="M709,427l9,1c4.6,3.333,6.752,6.078,7,14q-2.5,4-5,8l-10,2c-6.478-3.022-9.589-5.772-10-15C703.151,432.267,704.536,430.362,709,427Z"
          />
          <path
            ref={data[4].point}
            id="4"
            data-name="Fond 6"
            class="cls-1"
            d="M684,580l9,1c4.6,3.333,6.752,6.078,7,14q-0.5,1.5-1,3l-7,7-9-1c-5.6-2.481-7.692-6.2-8-14A39.657,39.657,0,0,1,684,580Z"
          />
          <path
            ref={data[5].point}
            id="5"
            data-name="Fond 8"
            class="cls-1"
            d="M1654,1126c3,0.33,6,.67,9,1,3.88,1.71,5.25,3.16,7,7,0.33,2.33.67,4.67,1,7q-2.505,4.005-5,8c-3.33.67-6.67,1.33-10,2-2.33-1.33-4.67-2.67-7-4q-1.5-5.505-3-11Q1650.005,1131.005,1654,1126Z"
          />
          <path
            ref={data[6].point}
            id="6"
            data-name="Fond 9"
            class="cls-1"
            d="M1468,1181c12.87-.63,17.91,6.24,15,18q-3.495,3-7,6h-10q-3-3.495-6-7c-0.15-7.92,1.27-10.59,4-15C1465.33,1182.33,1466.67,1181.67,1468,1181Z"
          />

          <path
            ref={data[7].point}
            id="7"
            data-name="Fond 11"
            class="cls-1"
            d="M1007,1211c12.33-.34,17.64,6.62,15,18l-7,7c-3-.33-6-0.67-9-1-7.572-2.98-10.143-13.08-4-19C1003.56,1213.53,1005.01,1212.88,1007,1211Z"
          />
          <path
            ref={data[8].point}
            id="8"
            data-name="Fond 12"
            class="cls-1"
            d="M773,975l9,1,5,6a11.213,11.213,0,0,1-4,16c-2.557,2.31-4.054,2.71-9,3-3.152-2.186-5.007-2.475-7-6-2.308-2.557-2.71-4.054-3-9C766.486,980.239,768.633,978.634,773,975Z"
          />

          <path
            ref={data[9].point}
            id="9"
            data-name="Fond 7"
            class="cls-1"
            d="M1357,825c6.1,0.332,8.28,1.746,12,4,0.67,1.667,1.33,3.333,2,5,1.91,6.287-.06,11.5-5,14-1.67,1-3.33,2-5,3-7.49-.929-9.11-3.8-13-8,0.33-3.333.67-6.667,1-10C1351.05,828.537,1353.33,827.687,1357,825Z"
          />
          <path
            ref={data[10].point}
            id="10"
            data-name="Fond 10"
            class="cls-1"
            d="M1243,1169c2.33,0.33,4.67.67,7,1q3.495,4.005,7,8c0.33,2,.67,4,1,6-2.93,4.56-3.81,7.57-9,10-2,.33-4,0.67-6,1-3.15-2.19-5.01-2.48-7-6-2.31-2.56-2.71-4.05-3-9,1.66-4,2.31-5.94,6-8C1240.33,1171,1241.67,1170,1243,1169Z"
          />

          <path
            ref={data[11].point}
            id="11"
            data-name="Fond 4"
            class="cls-1"
            d="M990,546l9,1c5.6,2.481,7.69,6.2,8,14q-2.5,4-5,8l-10,2c-6.478-3.022-9.589-5.772-10-15Z"
          />
        </svg>
      </div>
      <StatsComponent score={score} total={total} flag={FrenchFlag} />
    </div>
  );
};

export default FrenchCities;
