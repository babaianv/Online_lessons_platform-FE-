// AppRouter.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import LoginPage from "../pages/Login/LoginPage";
import Home from "../pages/Home/Home";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import CourseDetailsP from "../pages/CoursesDetails/CoursesDetailsP";
import ShoppingCartP from "../pages/ShoppingCart/ShoppingCartP";
import CreateCoursePage from "../pages/CreateCourse/CreateCoursePage";
import AllCoursesPage from "../pages/AllCourses/AllCoursesPage";
import MyAccountInfoPage from "../pages/MyAccount/MyAccountInfoPage";
import ChangePassowrdPage from "../pages/MyAccount/ChangePasswordPage";
import MyCoursesPage from "../pages/MyCoursesAndCreatedCourses/MyCoursesPage";
import EditCoursePage from "../pages/EditCourse/EditCoursePage";

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
        <Route path="/create_course" element={<CreateCoursePage />} />
        <Route path="/edit_course/:courseId" element={<EditCoursePage />} />
        <Route path="/account_info" element={<MyAccountInfoPage />} />
        <Route path="/change_password" element={<ChangePassowrdPage />} />
        <Route path="/my_courses" element={<MyCoursesPage/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
