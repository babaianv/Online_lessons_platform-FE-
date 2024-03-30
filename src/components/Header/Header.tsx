import React, { useEffect } from "react";
import NavItem from "../NavItem/NavItem";
import { Link } from "react-router-dom";
import headerLogo from "../../../public/icons/logo.svg";
import cartIcon from "../../../public/icons/cartIcon.svg";
import "./Header.css";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";

const Header = () => {
  const { items } = useSelector(selectCart);
  const totalCount = items.reduce(
    (acc: number, item: { count: number }) => acc + item.count,
    0
  );

  useEffect(() => {}, [totalCount]);

  return (
    <div className="header">
      <div className="logoContainer">
        <img className="headerLogo" src={headerLogo} alt="logo" />
        <p className="logoText">Learn.</p>
      </div>
      <div className="navContainer">
        <NavItem to="/" textContent="Home"></NavItem>
        <NavItem to="/courses" textContent="Courses"></NavItem>
        <NavItem to="/contact" textContent="Contact"></NavItem>
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
