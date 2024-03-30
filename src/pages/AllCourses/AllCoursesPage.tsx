import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AllCourses from "../../components/AllCourses/AllCourses";

const AllCoursesPage: React.FC = () => {
  return (
    <div>
      <Header />
      <AllCourses />
      <Footer />
    </div>
  );
};

export default AllCoursesPage;
