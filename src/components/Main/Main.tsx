import React from "react";
import "./Main.css";

const Main = () => (
  <div id="home" className="mainContainer">
    <div className="mainContentContainer">
      <img className="mainBulb" src="./icons/bulbIcon.svg" alt="bulbIcon" />
      <h1 className="mainTagline">
        Start <span className="mainColorTitle">learning</span> with us or upload
        your course
      </h1>
    </div>
    <img
      className="mainBackGroundImg"
      src="./img/backgraundmain.png"
      alt="backgroundmain"
    />
    <img className="mainGirl" src="./img/girlMain.png" alt="girlMain.png" />
  </div>
);

export default Main;
