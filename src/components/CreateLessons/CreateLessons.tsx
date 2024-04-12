import React, { ChangeEvent, useState } from "react";
import "./CreateLessons.css";
import { useAppDispatch } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile } from "../../slices/coursesSlice";
import { createLesson } from "../../slices/lessonsSlice";

interface LessonData {
  title: string;
  content: string;
}

const CreateLessons: React.FC = () => {
  const [lesson, setLesson] = useState<LessonData>({
    title: "",
    content: "",
  });
  const [lessonPhoto, setLessonPhoto] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>() as { courseId: string };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  };
  const handleFileChange =
  (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  // Проверка выбран ли файл для загрузки
  if (!lessonPhoto) {
    toast.error("Please select a photo for the lesson.");
    return; 
  }

  try {
    // Попытка загрузки файла
    const uploadResponse = await dispatch(uploadFile(lessonPhoto)).unwrap();
    const updatedLesson = { ...lesson, photoPath: uploadResponse };
    await dispatch(createLesson({ courseId, lessonData: updatedLesson })).unwrap();
    toast.success("Lesson created successfully");
    // navigate(`/courses/${courseId}`);
  } catch (error) {
    toast.error("Failed to upload lesson photo or create the lesson.");
  }
  };

  return (
    <div className="create-lesson-container">
      <div className="create-lesson-header">
        <h2>Create Lesson</h2>
      </div>
      <form onSubmit={handleSubmit} className="create-lesson-form">
        {/* Поля формы для ввода данных урока */}
        <div className="create-lesson-form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={lesson.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="create-lesson-form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={lesson.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="create-lesson-form-group">
          <label htmlFor="lessonPhoto">Lesson Photo</label>
          <input
            type="file"
            id="lessonPhoto"
            name="lessonPhoto"
            onChange={handleFileChange(setLessonPhoto)}
          />
        </div>
        <div className="create-lesson-button-container">
          <button type="submit" className="create-lesson-submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLessons;
