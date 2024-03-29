import React from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import CourseDetails from "../../components/CourseDetails/CourseDetails";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const CourseDetailsP: React.FC = () => {
  const selectedCourseId = useSelector<RootState, number | null>(
    (state) => state.coursesDetails.selectedCourseId 
  );

  if (!selectedCourseId) {
    return <div>No course selected</div>;
  }

  return (
    <div>
      <Header/>
      <CourseDetails/>
      <Footer/>
    </div>
  )
};

export default CourseDetailsP;
