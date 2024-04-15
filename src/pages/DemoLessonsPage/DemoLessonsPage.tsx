import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AllLessons from "../../components/AllLessons/AllLessons";

const DemoLessonsPage: React.FC = () => {
  return (
    <>
      <Header />
      <AllLessons isDemo={true} />
      <Footer />
    </>
  );
};

export default DemoLessonsPage;
