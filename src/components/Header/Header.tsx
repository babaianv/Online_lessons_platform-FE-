import React from "react";
import NavItem from "../NavItem/NavItem";
import { Link } from "react-router-dom";
import headerLogo from "../../../public/icons/logo.svg"
import cartIcon from "../../../public/icons/cartIcon.svg"
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logoContainer">
        <img className="headerLogo" src={headerLogo} alt="logo" />
        <p className="logoText">Learn.</p>
      </div>
      <div className="navContainer">
        <NavItem to="/" textContent="Home"></NavItem>
        <NavItem to="/courses" textContent="Courses"></NavItem>
        <NavItem to="/contact" textContent="Contact" ></NavItem>
      </div>
      
      <div className="headerBtnContainer">
      <Link to="/shopping_cart" className="cartLink">
          <img className="cartIcon" src={cartIcon} alt="cartIcon" />
        </Link>
        <Link className="loginBtn" to="/log#">Log in</Link>
        <Link className="signUpBtn" to="/reg#">Sign up</Link>
      </div>
    </div>
  );
};

export default Header;
