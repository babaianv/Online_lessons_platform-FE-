import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchCourseDetails } from "../../slices/courseDetailsSlice";
import { Course } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, selectCart } from "../../slices/cartSlice";
import { incrementTotalCount } from "../../slices/totalCountSlice";
import { selectUser } from "../../slices/userSlice";

import "./CourseDetails.css";

interface Props {
  courseId?: number;
}

const CourseDetails: React.FC<Props> = ({ courseId }) => {
  const dispatch: AppDispatch = useDispatch();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState<boolean>(false);
  const autoCloseTimeout = 1800;
  const navigate = useNavigate(); 

  const user = useSelector(selectUser);
  const selectedCourseId = useSelector<RootState, number | null>(
    (state) => state.coursesDetails.selectedCourseId
  );
  const courseDetails = useSelector<RootState, Course | null>(
    (state) => state.coursesDetails.courseDetails
  );
  const error = useSelector<RootState, string | null>(
    (state) => state.coursesDetails.error
  );
  const cart = useSelector(selectCart);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!courseId && selectedCourseId) {
      dispatch(fetchCourseDetails(selectedCourseId));
    } else if (courseId) {
      dispatch(fetchCourseDetails(courseId));
    }
  }, [dispatch, courseId, selectedCourseId]);

  const handleAddToCart = () => {
    if (!user.userInfo) {
      navigate("/reg"); 
      return;
    }
    if (courseDetails && courseDetails.id !== undefined) {
      // Принудительно утверждаем, что id есть, используя "!"
      const id = courseDetails.id!;
      const existingCartItem = cart.items.find(item => item.id === id.toString());
    
      if (!existingCartItem) {
        dispatch(addToCart({
          id: courseDetails.id.toString(), // TypeScript понимает, что id здесь есть
          name: courseDetails.title,
          count: 1,
          price: courseDetails.price,
        }));
        dispatch(incrementTotalCount());
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, autoCloseTimeout);
      } else {
        setIsAlreadyAdded(true);

        setTimeout(() => {
          setIsAlreadyAdded(false);
        }, autoCloseTimeout);
      }
    }
  };

  return (
    <>
      {error && <div>Error: {error}</div>}
      {courseDetails && (
        <div className="courseContainer">
          <div className="coursePreviewWrapper">
            <div className="coverPhoto">
              <img
                className=""
                src={courseDetails.photoPath}
                alt="imgCover"
              />
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
                  <button className="demoBtn">Demo lessons</button>
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
        <div className="popupDone">
          <div className="popupText">
            <p>Done!</p>
          </div>
        </div>
      )}

      {isAlreadyAdded && (
        <div className="popupReject">
          <div className="popupText">
            <p>Course is already added to cart!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
