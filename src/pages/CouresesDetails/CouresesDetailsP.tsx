import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CourseDetailsP";

interface CourseDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  authorId: number;
}

const CourseDetailsP: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [loading, setLoading] = useState(true);
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data: CourseDetails = await response.json();
        setCourseDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courseDetails) {
    return <div>Course details not found</div>;
  }

  return (
    <div className="courseDetailsContainer">
      <h1>{courseDetails.title}</h1>
      <p>Price: €{courseDetails.price}</p>
      <p>Description: {courseDetails.description}</p>
      <p>Author ID: {courseDetails.authorId}</p>
      
      <div className="buttonsContainer">
        <button className="demoButton">View demo lessons</button>
        <Link to={`/cart/${courseDetails.id}`}>
          <button className="cartButton">Add to Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetailsP;
