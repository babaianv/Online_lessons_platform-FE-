import React, { useEffect } from "react";
import NavItem from "../NavItem/NavItem";
import { Link } from "react-router-dom";
import headerLogo from "/icons/logo.svg";
import cartIcon from "/icons/cartIcon.svg";
import "./Header.css";
import { useSelector } from "react-redux";
import { selectCart } from "../../Slices/cartSlice";

const Header: React.FC = () => {
  const { items } = useSelector(selectCart);
  const totalCount = items.reduce(
    (acc: number, item: { count: number }) => acc + item.count,
    0
  );

  useEffect(() => {}, [totalCount]);

  return (
    <div className="header">
      <Link to="/" className="logoContainer"> 
        <img className="headerLogo" src={headerLogo} alt="logo" />
        <p className="logoText">Learn.</p>
      </Link>
      <div className="navContainer">
        <NavItem to="/" textContent="Home"></NavItem> 
        <NavItem to="/courses" textContent="Courses"></NavItem>
      </div>

      <div className="headerBtnContainer">
        <Link to="/shopping_cart" className="cartLink">
          <span className="count">{totalCount}</span>
          <img className="cartIcon" src={cartIcon} alt="cartIcon" />
        </Link>
        <Link className="loginBtn" to="/log">
          Log in
        </Link>
        <Link className="signUpBtn" to="/reg#">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Header;
