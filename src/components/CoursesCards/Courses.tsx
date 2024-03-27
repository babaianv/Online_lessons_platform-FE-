import React, { useState, useEffect } from "react";
import "./Courses.css";

interface Course {
  id: number;
  title: string;
  price: number;
  description: string;
  authorId: number;
}

const Courses: React.FC = () => {
  const [coursesData, setCoursesData] = useState<Course[] | null>(null);

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses data");
        }
        const data: Course[] = await response.json();
        setCoursesData(data);
      } catch (error) {
        console.error("Error fetching courses data:", error);
      }
    };

    fetchCoursesData();
  }, []);

  return (
    <div id="courses" className="mainContainerCourses">
      <div>
        <h4 className="coursesTitle">Our Explore Course</h4>
        <p className="subtitleCourses">Choose the course of your dreams</p>
      </div>

      {coursesData &&
        coursesData.map((course) => (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>Price: ${course.price}</p>
            <p>{course.description}</p>
            <p>Author ID: {course.authorId}</p>
          </div>
        ))}
    </div>
  );
};

export default Courses;
