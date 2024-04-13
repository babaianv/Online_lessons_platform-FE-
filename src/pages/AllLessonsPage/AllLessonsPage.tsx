import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AllLessons from "../../components/AllLessons/AllLessons";

const AllLessonsPage: React.FC = () => {
  return (
    <>
      <Header />
      <AllLessons />
      <Footer />
    </>
  );
};

export default AllLessonsPage;
