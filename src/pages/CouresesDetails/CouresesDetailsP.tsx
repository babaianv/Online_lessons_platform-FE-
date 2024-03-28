import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseDetails } from "../../Slices/courseDetailsSlice";
import { RootState } from "../../store/store";
import { Course } from "../../types/types";
import { AppDispatch } from "../../store/store";


const CourseDetailsP: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const selectedCourseId = useSelector<RootState, number | null>(
    (state) => state.coursesDetails.selectedCourseId 
  );

  const courseDetails = useSelector<RootState, Course | null>(
    (state) => state.coursesDetails.courseDetails
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.coursesDetails.loading
  );
  const error = useSelector<RootState, string | null>(
    (state) => state.coursesDetails.error
  );

  useEffect(() => {
    if (selectedCourseId) {
  
      dispatch(fetchCourseDetails(selectedCourseId));
    }
  }, [dispatch, selectedCourseId]);

  if (!selectedCourseId) {
    return <div>No course selected</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!courseDetails) {
    return <div>Course details not found</div>;
  }

  return (
    <div className="courseDetailsContainer">
      <h1>{courseDetails.title}</h1>
      <p>Price: €{courseDetails.price}</p>
      <p>Description: {courseDetails.description}</p>
      <p>Author ID: {courseDetails.authorId}</p>
    </div>
  );
};

export default CourseDetailsP;
