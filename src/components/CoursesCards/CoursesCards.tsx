import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../Slices/coursesSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Course } from "../../types/types";
import "./CoursesCards.css";

const Courses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const coursesData = useSelector<RootState, Course[] | null>(
    (state) => state.courses.coursesData
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.courses.loading
  );
  const error = useSelector<RootState, string | null>(
    (state) => state.courses.error
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="mainContainerCourses">
      <div>
        <h4 className="coursesTitle">Our Explore Course</h4>
        <p className="subtitleCourses">Choose the course of your dreams</p>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {coursesData &&
        coursesData.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>Price: €{course.price}</p>
            <p>{course.description}</p>
            <p>Author ID: {course.authorId}</p>
          </div>
        ))}
    </div>
  );
};

export default Courses;
