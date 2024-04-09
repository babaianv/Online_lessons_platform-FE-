import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../slices/coursesSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Course } from "../../types/types";
import "./AllCourses.css";
import { Link } from "react-router-dom";
import { setSelectedCourseId } from "../../slices/courseDetailsSlice";

const AllCourses: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const coursesData = useSelector<RootState, Course[] | null>(
    (state) => state.courses.coursesData
  );

  const error = useSelector<RootState, string | null>(
    (state) => state.courses.error
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleCourseClick = (courseId: number) => {
    dispatch(setSelectedCourseId(courseId));
  };

  return (
    <div id="courses" className="mainContainerCourses">
      <div>
        <h4 className="coursesTitle">Our Explore Course</h4>
        <p className="subtitleCourses">Choose the course of your dreams</p>
      </div>
      <div className="cardsWrapper">
        {error && <p>Error: {error}</p>}
        {coursesData &&
          coursesData.map((course) => (
            <div className="productCardWrapper" key={course.id}>
              <Link
                to={`/courses/${course.id}`}
                className="linkStyle"
                onClick={() => handleCourseClick(course.id!)}
              >
                <div>
                  <img
                    className="productCardImg"
                    src={course.photoPath}
                    alt="imgCover"
                  />
                </div>
                <h2 className="productCardTitle">{course.title}</h2>
                <div className="price-containter">
                  <p className="productCardPrice">€{course.price}</p>
                  <p className="productCardOldPrice">€{course.oldPrice}</p>
                </div>
              </Link>
              <div className="dividerCourseM"></div>
              <div className="counter-container">
                <img
                  className="icon"
                  src="./icons/studentIcon.svg"
                  alt="studentIcon"
                />
                <p className="counter">{course.counter} Students</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCourses;
