import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchCourseDetails } from "../../slices/courseDetailsSlice";
import { Course } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, fetchAddToCart } from "../../slices/cartSlice";
import { incrementTotalCount } from "../../slices/totalCountSlice";
import { selectUser } from "../../slices/userSlice";
import { toast } from 'react-toastify';

import "./CourseDetails.css";

interface Props {
  courseId?: number;
}

interface AddToCartData {
  cartId: number | undefined;
  courseId: number | undefined;
}

const CourseDetails: React.FC<Props> = ({ courseId }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(selectUser);

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
  const addToCartData: AddToCartData = {
    cartId: userInfo?.cartId,
    courseId: courseDetails?.id,
  };

  useEffect(() => {
    console.log(courseDetails);
    window.scrollTo(0, 0);
    if (!courseId && selectedCourseId) {
      dispatch(fetchCourseDetails(selectedCourseId));
    } else if (courseId) {
      dispatch(fetchCourseDetails(courseId));
    }
  }, [dispatch, courseId, selectedCourseId]);

  const handleAddToCart = async () => {
    if (!user.userInfo) {
      navigate("/reg");
      return;
    }
    // console.log(courseDetails, "courseDetails");
    // console.log(userInfo?.cartId, "cartId");
    // console.log(courseDetails?.id, "courseId");
    if (courseDetails?.id && userInfo?.cartId !== null) {
      try {
        const response = await dispatch(fetchAddToCart(addToCartData));
        console.log(response.meta.requestStatus);
        if (response.meta.requestStatus !== "rejected") {
          dispatch(
            addToCart({
              id: courseDetails?.id,
              name: courseDetails.title,
              count: 1,
              price: courseDetails.price,
            })
          );
          dispatch(incrementTotalCount());
          toast.success('Done!');
        } else {
          toast.error('Course is already added to cart!');
        }
      } catch (error) {
        toast.error('Error adding course to cart.');
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
    </>
  );
};

export default CourseDetails;
