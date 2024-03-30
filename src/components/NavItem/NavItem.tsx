import React from "react";
import { Link } from "react-router-dom";

interface INavItemProps {
  to: string;
  textContent: string;
}

const NavItem: React.FC<INavItemProps> = ({ to, textContent }) => {
  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const target = document.getElementById(to.substring(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navItem">
      <Link to={to} onClick={scrollToSection}>
        {textContent}
      </Link>
    </div>
  );
};

export default NavItem;
