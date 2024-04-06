import React, { useEffect } from "react";
import "./MyCourses.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
import { fetchAvailableCourses } from "../../slices/availableCourses";
import { selectUser } from "../../slices/userSlice";

const MyCourses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { enrollments, loading, error } = useAppSelector(
    (state: RootState) => state.availableCourses
  );
  const user = useAppSelector(selectUser);

  useEffect(() => {
    // Проверяем, загружены ли данные пользователя и только после этого запрашиваем курсы
    if (user.userInfo?.name) {
      dispatch(fetchAvailableCourses());
    }
  }, [dispatch, user.userInfo?.name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses: {error}</p>;

  return (
    <div className="my-courses-container">
      <h1 className="my-courses-header">MY COURSES</h1>

      {enrollments?.map(({ course }) => (
        <div className="my-course-item" key={course.id}>
          <img src={course.photoPath} alt="Course" className="my-course-icon" />
          <div className="my-course-content">
            <div className="my-course-title">{course.title}</div>
            <div className="my-course-description">
              {course.description.length > 300
                ? `${course.description.substring(0, 300)}...`
                : course.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
