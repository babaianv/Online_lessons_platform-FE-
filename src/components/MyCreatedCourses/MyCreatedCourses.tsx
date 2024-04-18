import React, { useEffect } from "react";
import "./MyCreatedCourses.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  deleteCreatedCourse,
  fetchCreatedCourses,
  selectCreatedCourses,
} from "../../slices/createdCoursesSlice";
import { selectUser } from "../../slices/userSlice";
import { toast } from "react-toastify";

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

  const handleAddLesson = (courseId: number) => {
    navigate(`/create_lesson/${courseId}`); //переход на страницу создания урока
  };

  const handleEdit = (courseId: number) => {
    console.log("Editing course with id:", courseId);
    navigate(`/edit_course/${courseId}`); //переход на страницу редактирования курса
  };

  const handleDelete = (courseId: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone."
      )
    ) {
      console.log("Deleting course with id:", courseId);
      dispatch(deleteCreatedCourse(courseId))
        .then(() => {
          // После успешного удаления можно обновить список курсов или показать уведомление
          toast.success("Course deleted successfully.", {
            toastId: "course_delete_success",
          });
          dispatch(fetchCreatedCourses()); // Перезагружаем список курсов, если нужно
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
          toast.error("Failed to delete the course.", {
            toastId: "course_delete_error",
          });
        });
    }
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
      {(createdCourses?.length ?? 0) > 0 ? (
        createdCourses?.map((course) => (
          <div className="created-course-item" key={course.id}>
            <Link to={`/lessons/${course.id}`} className="course-link">
              <img src={course.photoPath} alt="Course" className="course-icon" />
              <div className="course-content">
                <div className="course-title">{course.title}</div>
                <div className="course-description">
                  {course.description.length > 300
                    ? `${course.description.substring(0, 300)}...`
                    : course.description}
                </div>
              </div>
            </Link>
            <div className="course-buttons-container">
              <button
                onClick={() => handleAddLesson(course.id!)}
                className="add-button"
              >
                Add Lesson
              </button>
              <button
                onClick={() => handleEdit(course.id!)}
                className="edit-button"
              >
                Edit Course
              </button>
              <button
                onClick={() => handleDelete(course.id!)}
                className="delete-button"
              >
                Delete Course
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-created-courses-message">No courses created yet.</p>
      )}
    </div>
  );
  
};

export default MyCreatedCourses;
