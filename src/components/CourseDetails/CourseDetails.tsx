import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchCourseDetails } from "../../Slices/courseDetailsSlice";
import { Course } from "../../types/types";
import { Link } from "react-router-dom";
import { addToCart } from "../../Slices/cartSlice";
import { incrementTotalCount } from "../../Slices/totalCountSlice";

import "./CourseDetails.css";

interface Props {
  courseId?: number;
}

const CourseDetails: React.FC<Props> = ({ courseId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const autoCloseTimeout = 1800;
  const [isCourseAdded, setIsCourseAdded] = useState<boolean>(false);
  const selectedCourseId = useSelector<RootState, number | null>(
    (state) => state.coursesDetails.selectedCourseId
  );
  const courseDetails = useSelector<RootState, Course | null>(
    (state) => state.coursesDetails.courseDetails
  );

  const error = useSelector<RootState, string | null>(
    (state) => state.coursesDetails.error
  );

  useEffect(() => {
    if (!courseId && selectedCourseId) {
      dispatch(fetchCourseDetails(selectedCourseId));
    } else if (courseId) {
      dispatch(fetchCourseDetails(courseId));
    }
  }, [dispatch, courseId, selectedCourseId]);

  const handleAddToCart = () => {
    if (courseDetails && !isCourseAdded) {
      dispatch(
        addToCart({
          id: courseDetails.id.toString(),
          name: courseDetails.title,
          count: 1,
          price: courseDetails.price,
        })
      );
      dispatch(incrementTotalCount());
      setShowPopup(true);
      setIsCourseAdded(true);

      setTimeout(() => {
        setShowPopup(false);
      }, autoCloseTimeout);
    }
  };

  return (
    <>
      {error && <div>Error: {error}</div>}
      {courseDetails && (
        <div className="courseContainer">
          <div className="coursePreviewWrapper">
            <div className="coverPhoto">
              <img className="" src={courseDetails.photoPath} alt="imgCover" />
            </div>
            <div className="coursePreviewWrapperContent">
              <div className="courseDet">
                <h1 className="titleDet">{courseDetails.title}</h1>
                <p className="taxes">EUR(incl. of all taxes)</p>
                <p className="priceDet">€{courseDetails.price}</p>
              </div>
              <div className="dividerCourseM"></div>
              <div className="coursePreviewWrapperBtnWrapper">
                <Link to="/demo_lessons">
                  <button className="demoBtn">View lessons</button>
                </Link>
                <button className="addToCartBtn" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="coursesDescriptionWrapper">
            <h2 className="description">Description:</h2>
            <br />
            <p className="descriptionText">{courseDetails.description}</p>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Done!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
