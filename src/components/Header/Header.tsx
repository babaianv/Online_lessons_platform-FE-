import React, { useState, useRef, useEffect } from "react";
import NavItem from "../NavItem/NavItem";
import { Link } from "react-router-dom";
import headerLogo from "/icons/logo.svg";
import cartIcon from "/icons/cartIcon.svg";
import { useSelector } from "react-redux";
import { selectCart } from "../../slices/cartSlice";
import { selectUser, logout } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import "./Header.css";
import { toast } from "react-toastify";

const Header: React.FC = () => {
  const { items } = useSelector(selectCart);
  const { userInfo } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const totalCount = items.reduce(
    (acc: number, item: { count: number }) => acc + item.count,
    0
  );

  const handleLogout = async () => {
    dispatch(logout());
    toast.success("You logged out.");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      burgerMenuRef.current &&
      !burgerMenuRef.current.contains(event.target as Node)
    ) {
      setBurgerMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        {userInfo ? (
          <>
            <Link to="/shopping_cart" className="cartLink">
              <span className="count">{totalCount}</span>
              <img className="cartIcon" src={cartIcon} alt="cartIcon" />
            </Link>
            <div
              className="burgerMenu"
              onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
              ref={burgerMenuRef}
            >
              <div className="burgerIcon"></div>
              <div className="burgerIcon"></div>
              <div className="burgerIcon"></div>
            </div>
            <div
              className={`burgerMenuContent ${burgerMenuOpen ? "show" : ""}`}
            >
              <Link className="navLinkBurger" to="/my_account">
                My&nbsp;Account
              </Link>
              <Link className="navLinkBurger" to="/my_courses">
                My&nbsp;Courses
              </Link>
              <Link className="navLinkBurger" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link className="loginBtn" to="/log">
              Log in
            </Link>
            <Link className="signUpBtn" to="/reg#">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
