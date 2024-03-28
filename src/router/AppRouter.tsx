import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CourseDetailsP from "../pages/CouresesDetails/CouresesDetailsP";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reg" element={<RegistrationPage/>} />
      <Route path="/course_detail" element={<CourseDetailsP/>} />
    </Routes>
  );
};

export default AppRouter;
