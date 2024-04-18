import React, { useState } from "react";
import MyAccountInfo from "../MyAccount/MyAccountInfo";
import ChangePassword from "../ChangePassword/ChangePassword";
import "./AccountPanel.css";
import myAccountIcon from "/img/forAccountInfo.jpg";
import changePasswordIcon from "/img/forPassword.png";

const AccountPanel: React.FC = () => {
  const [activeView, setActiveView] = useState("accountInfo");

  return (
    <div className="account-panel-container">
      <nav className="account-panel-nav">
        <ul>
          <li>
            <button onClick={() => setActiveView("accountInfo")}>
              <img src={myAccountIcon} alt="myAccountIcon" />
              Account info
            </button>
          </li>
          <li>
            <button onClick={() => setActiveView("changePassword")}>
              <img src={changePasswordIcon} alt="changePasswordIcon" />
              Change password
            </button>
          </li>
        </ul>
      </nav>

      <div className="account-panel-content">
        {activeView === "accountInfo" && <MyAccountInfo />}
        {activeView === "changePassword" && <ChangePassword />}
      </div>
    </div>
  );
};

export default AccountPanel;
