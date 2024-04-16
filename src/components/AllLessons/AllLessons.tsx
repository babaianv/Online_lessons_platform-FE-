import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { fetchLessons, selectLessons } from "../../slices/lessonsSlice";
import { selectUser } from "../../slices/userSlice";
import "./AllLessons.css";
import { Lesson } from "../../types/types";

const AllLessons: React.FC<{ isDemo?: boolean }> = ({ isDemo }) => {
  const lessons = useAppSelector(selectLessons);
  const sortedLessons = useMemo(() => lessons.slice().sort((a, b) => a.number - b.number), [lessons]);
  const loading = useAppSelector((state) => state.lessons.loading);
  const error = useAppSelector((state) => state.lessons.error);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const { courseId } = useParams();
  const [lessonInfo, setLessonInfo] = useState<Lesson>({
    title: "",
    content: "",
    photoPath: "",
    number: 0,
  });
  // console.log(lessonInfo);

  const handleLessonClick = (lesson: Lesson, index: number) => {
    if (!isDemo || index < 2) {
      // Позволяет взаимодействие только с первыми двумя уроками в демо-режиме
      setLessonInfo(lesson);
    }
  };

  useEffect(() => {
    if (user.userInfo?.name) {
      dispatch(fetchLessons(Number(courseId)));
    }
  }, [courseId, dispatch, user.userInfo?.name]);

  if (loading) return <p className="lessons-loading">Loading...</p>;

  if (error) {
    return <h2 className="lessons-error">Error loading courses: {error}</h2>;
  }

  if (lessons.length === 0) {
    // Проверяем, есть ли уроки в массиве
    return (
      <div className="lessons-main">
        <p className="no-lessons">
          There are currently no lessons for this course
        </p>
      </div>
    );
  }

  return (
    <div className="lessons-main">
      <ul className="lessons-container">
        {user.userInfo?.name &&
            sortedLessons.map((lesson, index) => (
              <li
                key={lesson.id}
                className={`lesson-title ${lessonInfo.id === lesson.id ? "active" : ""} ${isDemo && index >= 2 ? "disabled" : ""}`}
                onClick={() => handleLessonClick(lesson, index)}
              >
                {lesson.title}
              </li>
            ))}
      </ul>
      <div className="title-photo-content-container">
        {" "}
        {/* Контейнер для деталей урока */}
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
