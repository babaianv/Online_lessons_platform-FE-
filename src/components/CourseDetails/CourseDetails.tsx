import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchCourseDetails } from "../../Slices/courseDetailsSlice";
import { Course } from "../../types/types";
import { Link } from "react-router-dom";

const CourseDetails: React.FC<{ courseId: number }> = ({ courseId }) => {
  const dispatch: AppDispatch = useDispatch();
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
    dispatch(fetchCourseDetails(courseId));
  }, [dispatch, courseId]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {courseDetails && (
        // <div>
        //   <h2>{courseDetails.title}</h2>
        //   <p>{courseDetails.description}</p>
        // </div>

        <div className="CourseContainer">
          <div>
          <img className="imgCourse" src="./img/mainImg1.png" alt="mainImg1" />
          </div>
          <div className="CourseDetWrapper">
          <h1 className="courseTitle">Web design basic to advance</h1>
          <p className="currency">EUR(incl. of all taxes)</p>
          <p className="price">€400</p>
          </div>
          <div className="dividerCourseM"></div>
          <div>
            <div className="buttonsContainer">
              <Link className="lessonsBtn" to="/lessons">
                View demo lessons
              </Link>
              <button className="cartButton">Add to Cart</button>
            </div>
          </div>

          <div>
            <h2 className="description">Description</h2>
            <div className="dividerCourseM"></div>
          </div>
          <p className="subDescription"></p>
        </div>
      ) 
      }
    </div>
  );
};

export default CourseDetails;
