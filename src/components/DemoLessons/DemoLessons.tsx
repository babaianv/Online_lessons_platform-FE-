import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDemoLessons, selectLessons } from "../../slices/lessonsSlice";
import "./DemoLessons.css";
import { Lesson } from "../../types/types";

const DemoLessons: React.FC = () => {
  const lessons = useAppSelector(selectLessons);
  const loading = useAppSelector((state) => state.lessons.loading);
  const error = useAppSelector((state) => state.lessons.error);
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const [lessonInfo, setLessonInfo] = useState<Lesson>({
    title: "",
    content: "",
    photoPath: "",
  });

  const handleLessonClick = (lesson: Lesson) => {
    setLessonInfo(lesson);
  };

  useEffect(() => {
    if (courseId) {
      console.log(courseId);

      dispatch(fetchDemoLessons(Number(courseId)));
    }
  }, [courseId, dispatch]);

  if (loading) return <p id="loading">Loading...</p>;

  if (error) {
    return <h2 id="error">No lessons found for this course</h2>;
  }

  return (
    <div id="lessons-main">
      <div id="choose-lesson-photo-container">
        <div id="lessons-container">
          {lessons.map((lesson, index) => (
            <p
              key={index}
              id="choose-lesson-title"
              onClick={() => handleLessonClick(lesson)}
            >
              {lesson.title}
            </p>
          ))}
        </div>
        <div id="title-photo-container">
          <p id="lesson-title">{lessonInfo.title}</p>
          {lessonInfo.photoPath && (
            <div id="lesson-photo-container">
              <img
                src={lessonInfo.photoPath}
                alt="lessonPhoto"
                id="demoLessonPhoto"
              />
            </div>
          )}
        </div>
      </div>
      <p id="content">{lessonInfo.content}</p>
    </div>
  );
};

export default DemoLessons;
