import React from "react";
import NavItem from "../NavItem/NavItem";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logoContainer">
        <img className="headerLogo" src="./icons/logo.svg" alt="logo" />
        <p className="logoText">Learn.</p>
      </div>
      <div className="navContainer">
        <NavItem to="/" textContent="Home"></NavItem>
        <NavItem to="/courses" textContent="Courses"></NavItem>
        <NavItem to="/contact" textContent="Contact"></NavItem>
      </div>
      <div className="headerBtnContainer">
        <button className="loginBtn">Login</button>
        <button className="signUpBtn">Sign up</button>
      </div>
    </div>
  );
};

export default Header;
