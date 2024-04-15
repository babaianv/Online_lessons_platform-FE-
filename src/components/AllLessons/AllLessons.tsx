import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLessons, selectLessons } from "../../slices/lessonsSlice";
import { selectUser } from "../../slices/userSlice";
import "./AllLessons.css";
import { Lesson } from "../../types/types";

const AllLessons: React.FC = () => {
  const lessons = useAppSelector(selectLessons);
  const loading = useAppSelector((state) => state.lessons.loading);
  const error = useAppSelector((state) => state.lessons.error);
  const user = useAppSelector(selectUser);
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const [lessonInfo, setLessonInfo] = useState<Lesson>({
    title: "",
    content: "",
    photoPath: "",
  });
  console.log(lessonInfo);

  const handleLessonClick = (lesson: Lesson) => {
    setLessonInfo(lesson);
  };

  useEffect(() => {
    if (user.userInfo?.name) {
      dispatch(fetchLessons(Number(courseId)));
    }
  }, [courseId, dispatch, user.userInfo?.name]);

  if (loading) return <p className="lessons-loading">Loading...</p>;

  if (error) {
    return <h2 id="error">No lessons found for this course</h2>;
  }

  return (
    <div className="lessons-main">
      <ul className="lessons-container"> {/* Контейнер с уроками */}
        {user.userInfo?.name && lessons.map((lesson) => (
          <li
            key={lesson.id}
            className={`lesson-title ${lessonInfo.id === lesson.id ? "active" : ""}`}
            onClick={() => handleLessonClick(lesson)}
          >
            {lesson.title}
          </li>
        ))}
      </ul>
      <div className="title-photo-content-container"> {/* Контейнер для деталей урока */}
        <div className="title-photo-container">
          <p className="lesson-title-main">{lessonInfo.title}</p>
          {lessonInfo.photoPath && (
            <div className="lesson-photo-container">
              <img
                src={lessonInfo.photoPath}
                alt="lessonPhoto"
                className="lesson-photo"
              />
            </div>
          )}
        </div>
        <p className="lesson-content">{lessonInfo.content}</p>
      </div>
    </div>
  );
};

export default AllLessons;
