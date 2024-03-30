// AppRouter.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CourseDetailsP from "../pages/CoursesDetails/CoursesDetailsP";
import ShoppingCartP from "../pages/ShoppingCart/ShoppingCartP";
import AllCoursesPage from "../pages/AllCourses/AllCoursesPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/log" element={<LoginPage />} />
        <Route path="/reg" element={<RegistrationPage />} />
        <Route path="/courses" element={<AllCoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsP />} />
        <Route path="/shopping_cart" element={<ShoppingCartP />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
