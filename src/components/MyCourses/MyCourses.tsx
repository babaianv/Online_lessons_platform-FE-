import React from "react";
import "./MyCourses.css";

const MyCourses: React.FC = () => {
  interface Course {
    id: number;
    title: string;
    description: string;
  }

  // Example courses data
  const courses: Course[] = [
    { id: 1, title: "Course 1", description: "Course 1 description" },
    { id: 2, title: "Course 2", description: "Course 2 description" },
    { id: 3, title: "Course 3", description: "Course 3 description" },
    // More courses...
  ];

  return (
    <div className="my-courses-container">
      <h1 className="my-courses-header">MY COURSES</h1>

      {courses.map((course) => (
        <div className="course-item" key={course.id}>
          <img
            src="/path-to-your-icon.svg"
            alt="Course"
            className="course-icon"
          />
          <div className="course-content">
            <div className="course-title">{course.title}</div>
            <div className="course-description">{course.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyCourses;
