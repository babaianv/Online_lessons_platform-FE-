import React, { useState } from "react";
import MyAccountInfo from "../MyAccount/MyAccountInfo";
import ChangePassword from "../ChangePassword/ChangePassword";
import "./AccountPanel.css";

const AccountPanel: React.FC = () => {
  const [activeView, setActiveView] = useState("accountInfo");

  return (
    <div className="account-panel-container">
      <nav className="account-panel-nav">
        <ul>
          <li>
            <button onClick={() => setActiveView("accountInfo")}>
              Account info
            </button>
          </li>
          <li>
            <button onClick={() => setActiveView("changePassword")}>
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
