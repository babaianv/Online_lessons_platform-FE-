import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CourseDetailsP from "../pages/CouresesDetails/CoursesDetailsP";
import ShoppingCartP from "../pages/ShoppingCart/ShoppingCartP";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route  element={<Layout />} />
      <Route path="/" element={<Home />} />
      <Route path="/log" element={<LoginPage/>} />
      <Route path="/reg" element={<RegistrationPage/>} />
      <Route path="/courses/:courseId" element={<CourseDetailsP />} />
      <Route path="/shopping_cart" element={<ShoppingCartP/>} />
    </Routes>
  );
};

export default AppRouter;
