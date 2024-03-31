import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CreateCourse from "../../components/CreateCourse/CreateCourse";

const CreateCoursePage: React.FC = () => {
  return (
    <>
      <Header />
      <CreateCourse />
      <Footer />
    </>
  );
};

export default CreateCoursePage;
