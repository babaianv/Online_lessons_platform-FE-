import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCourseDetails } from "../../slices/courseDetailsSlice";
import CourseDetails from "../../components/CourseDetails/CourseDetails";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

const fetchCourseDetailsWrapper = (
  dispatch: AppDispatch,
  courseId: string | undefined
) => {
  if (courseId) {
    dispatch(fetchCourseDetails(Number(courseId)));
  }
};

const CourseDetailsP: React.FC = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();

  useEffect(() => {
    fetchCourseDetailsWrapper(dispatch, courseId);

    return () => {};
  }, [courseId, dispatch]);

  if (!courseId) {
    return <div>No course selected</div>;
  }

  return (
    <div>
      <Header />
      <CourseDetails />
      <Footer />
    </div>
  );
};

export default CourseDetailsP;
