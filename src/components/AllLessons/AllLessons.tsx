import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLessons, selectLessons } from "../../slices/lessonsSlice";
import { selectUser } from "../../slices/userSlice";
import "./AllLessons.css";
import { Lesson  } from "../../types/types";

const AllLessons: React.FC = () => {
  const lessons = useAppSelector(selectLessons);
  const loading = useAppSelector(state => state.lessons.loading);
  const error = useAppSelector(state => state.lessons.error);
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

  if (loading) return <p id="loading">Loading...</p>;

  if (error) {
    return <h2 id="error">No lessons found for this course</h2>;
  }

  return (
    <div id="lessons-main">
      <div id="choose-lesson-photo-container">
        <div id="lessons-container">
          {user.userInfo?.name &&
            lessons.map((lesson, index) => (
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
              <img src={lessonInfo.photoPath} alt="lessonPhoto" id="lessonPhoto"/>
            </div>
          )}
        </div>
      </div>
      <p id="content">{lessonInfo.content}</p>
    </div>
  );
};

export default AllLessons;
