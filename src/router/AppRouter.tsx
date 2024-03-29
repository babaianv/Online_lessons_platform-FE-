import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CourseDetailsP from "../pages/CouresesDetails/CouresesDetailsP";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />} />
      <Route path="/" element={<Home />} />
      <Route path="/log" element={<LoginPage/>} />
      <Route path="/reg" element={<RegistrationPage/>} />
      <Route path="/course_detail" element={<CourseDetailsP/>} />
    </Routes>
  );
};

export default AppRouter;
