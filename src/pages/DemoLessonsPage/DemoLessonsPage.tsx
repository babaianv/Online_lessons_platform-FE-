import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DemoLessons from "../../components/DemoLessons/DemoLessons";

const DemoLessonsPage: React.FC = () => {
  return (
    <>
      <Header />
      <DemoLessons />
      <Footer />
    </>
  );
};

export default DemoLessonsPage;
