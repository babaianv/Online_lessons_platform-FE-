import React from "react";
import "./Companies.css";

const Companies: React.FC = () => {
  return (
    <div>
      <div className="companiesContainer">
        <img className="companyImage" src="./img/AmstradLogo.png" alt="AmstradLogo" />
        <img className="companyImage" src="./img/AirbusLogo.png" alt="AirbusLogo" />
        <img className="companyImage" src="./img/SophosLogo.png" alt="SophosLogo" />
        <img className="companyImage" src="./img/AcceltysLogo.png" alt="AcceltysLogo" />
        <img className="companyImage" src="./img/SpaceXLogo.png" alt="SpaceXLogo" />
        <img className="companyImage" src="./img/AvevaLogo.png" alt="AvevaLogo" />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default Companies;
