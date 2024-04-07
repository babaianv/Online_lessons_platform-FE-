import React, { useEffect } from "react";
import "./MyCreatedCourses.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  deleteCreatedCourse,
  fetchCreatedCourses,
  selectCreatedCourses,
} from "../../slices/createdCoursesSlice";
import { selectUser } from "../../slices/userSlice";

const MyCreatedCourses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { createdCourses, loading, error } =
    useAppSelector(selectCreatedCourses);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userInfo?.name) {
      dispatch(fetchCreatedCourses());
    }
  }, [dispatch, user.userInfo?.name]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses: {error}</p>;

  const handleEdit = (courseId: number) => {
    console.log("Editing course with id:", courseId);
    // Здесь будет логика для редактирования курса
    navigate(`/edit_course/${courseId}`); //переход на страницу редактирования курса
  };

  const handleDelete = (courseId: number) => {
    console.log("Deleting course with id:", courseId);
    dispatch(deleteCreatedCourse(courseId));
  };

  const handleCreateCourse = () => {
    navigate("/create_course"); // переход на страницу создания курса
  };

  return (
    <div className="my-created-courses-container">
      <div className="create-new-course-button-container">
        <button onClick={handleCreateCourse} className="create-course-button">
          Create New Course
        </button>
      </div>
      <h1 className="my-created-courses">MY CREATED COURSES</h1>
      {createdCourses?.map((course) => (
        <div className="created-course-item" key={course.id}>
          <img src={course.photoPath} alt="Course" className="course-icon" />
          <div className="course-content">
            <div className="course-title">{course.title}</div>
            <div className="course-description">
              {course.description.length > 300
                ? `${course.description.substring(0, 300)}...`
                : course.description}
            </div>
          </div>
          <button
            onClick={() => handleEdit(course.id!)}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(course.id!)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyCreatedCourses;
