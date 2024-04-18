import React, { useState } from "react";
import MyCourses from "../MyCourses/MyCourses";
import MyCreatedCourses from "../MyCreatedCourses/MyCreatedCourses";
import myCoursesIcon from "/img/forMyCourses.png"
import myCreatedCoursesIcon from "/img/forCreatedCourses.png"
import "./CoursePanel.css";

const CoursePanel: React.FC = () => {
  const [activeView, setActiveView] = useState("myCourses");

  return (
    <div className="course-panel-container">
      <nav className="course-panel-nav">
        <ul>
          <li>
            <button onClick={() => setActiveView("myCourses")}>
            <img src={myCoursesIcon} alt="myCoursesIcon" />
              My Courses
            </button>
          </li>
          <li>
            <button onClick={() => setActiveView("myCreatedCourses")}>
            <img src={myCreatedCoursesIcon} alt="myCreatedCoursesIcon" />
              My Created Courses
            </button>
          </li>
        </ul>
      </nav>

      <div className="course-panel-content">
        {activeView === "myCourses" && <MyCourses />}
        {activeView === "myCreatedCourses" && <MyCreatedCourses />}
      </div>
    </div>
  );
};

export default CoursePanel;
