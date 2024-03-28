import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../components/Register/Registration";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reg" element={<Registration/>} />
    </Routes>
  );
};

export default AppRouter;
