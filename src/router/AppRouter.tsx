import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Registration from "../components/Register/Registration";
import CourseDetailsP from "../pages/CouresesDetails/CouresesDetailsP";
import Layout from "../layout/Layout";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />} />
      <Route path="/" element={<Home />} />
      <Route path="/reg" element={<Registration />} />
      <Route path="/courses/:courseId" element={<CourseDetailsP />} />
    </Routes>
  );
};

export default AppRouter;
