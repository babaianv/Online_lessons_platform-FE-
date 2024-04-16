import React, { useState, useRef, useEffect } from "react";
import NavItem from "../NavItem/NavItem";
import { Link } from "react-router-dom";
import headerLogo from "/icons/logo.svg";
import cartIcon from "/icons/cartIcon.svg";
import { useSelector } from "react-redux";
import { fetchCart, selectCart } from "../../slices/cartSlice";
import { selectUser, logout } from "../../slices/userSlice";
import "./Header.css";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { AppDispatch } from "../../store/store";

const Header: React.FC = () => {
  const { items } = useSelector(selectCart);
  const { userInfo } = useSelector(selectUser);
  const dispatch: AppDispatch = useAppDispatch();
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector(selectUser);
  const cartId = user.userInfo?.cartId;

  console.log(items.length);
  

  const handleLogout = async () => {
    dispatch(logout());
    toast.success("You logged out.", {toastId: "logout"});
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

  useEffect(() => {
    if (cartId) {
      dispatch(fetchCart(cartId));
    }
  }, [cartId, dispatch]);


  

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
              <span className="count">{items.length}</span>
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
