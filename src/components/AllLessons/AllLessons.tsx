import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLessons, selectLessons } from "../../slices/lessonsSlice";
import { selectUser } from "../../slices/userSlice";
import "./AllLessons.css";
import { LessonResponse } from "../../types/types";

const AllLessons: React.FC = () => {
  const lessons = useAppSelector(selectLessons);
  const user = useAppSelector(selectUser);
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const [lessonInfo, setLessonInfo] = useState<LessonResponse>({
    title: "",
    content: "",
    photoPath: "",
  });
  console.log(lessonInfo);

  const handleLessonClick = (lesson: LessonResponse) => {
    setLessonInfo(lesson);
  };

  useEffect(() => {
    if (user.userInfo?.name) {
      dispatch(fetchLessons(Number(courseId)));
    }
  }, [courseId, dispatch, user.userInfo?.name]);

  if (lessons.status === "loading") return <p id="loading">Loading...</p>;

  if (lessons.error) {
    return <h2 id="error">No lessons found for this course</h2>;
  }

  return (
    <div id="lessons-main">
      <div id="choose-lesson-photo-container">
        <div id="lessons-container">
          {user.userInfo?.name &&
            lessons.lessonsResponse?.map((lesson) => (
              <p
                key={lesson.title + Math.random()}
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
