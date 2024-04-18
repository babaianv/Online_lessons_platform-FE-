import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";


interface INavItemProps extends NavLinkProps {
  textContent: string;
}

const NavItem: React.FC<INavItemProps> = ({ textContent, ...rest }) => {
  return (
    <div className="navItem">
      <NavLink {...rest}>{textContent}</NavLink>
    </div>
  );
};

export default NavItem;