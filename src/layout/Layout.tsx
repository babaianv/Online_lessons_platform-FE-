import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function visibleToTop() {
    setIsVisible(window.scrollY >= 40);
  }

  useEffect(() => {
    document.addEventListener("scroll", visibleToTop);
    return () => {
      document.removeEventListener("scroll", visibleToTop);
    };
  }, []);

  return (
    <div className="layout_container">
      <main>
        <Outlet />
      </main>
      {isVisible && (
        <button className="scrollToTop" onClick={() => window.scrollTo(0, 0)}>
          &#9650;
        </button>
      )}
    </div>
  );
};

export default Layout;
