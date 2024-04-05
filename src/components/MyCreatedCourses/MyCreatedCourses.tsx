import React from "react";
import "./MyCreatedCourses.css";
import { useNavigate } from "react-router-dom";

const MyCreatedCourses: React.FC = () => {
  const navigate = useNavigate();

  const courses = [
    { id: 1, title: "Course 1", description: "Description of Course 1" },
    { id: 2, title: "Course 2", description: "Description of Course 2" },
    { id: 3, title: "Course 3", description: "Description of Course 3" },
  ];

  const handleEdit = (courseId: number) => {
    console.log("Editing course with id:", courseId);
    // Здесь будет логика для редактирования курса
  };

  const handleDelete = (courseId: number) => {
    console.log("Deleting course with id:", courseId);
    // Здесь будет логика для удаления курса
  };

  const handleCreateCourse = () => {
    navigate("/create_course"); // переход на страницу создания курса
  };

  return (
    <div className="my-created-courses-container">
      <button onClick={handleCreateCourse} className="create-course-button">
        Create New Course
      </button>
      <h1 className="my-created-courses">MY CREATED COURSES</h1>
      {courses.map((course) => (
        <div className="created-course-item" key={course.id}>
          <img
            src="/path-to-your-icon.svg"
            alt="Course"
            className="course-icon"
          />
          <div className="course-content">
            <div className="course-title">{course.title}</div>
            <div className="course-description">{course.description}</div>
          </div>
          <button onClick={() => handleEdit(course.id)} className="edit-button">
            Edit
          </button> 
          <button
            onClick={() => handleDelete(course.id)}
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
