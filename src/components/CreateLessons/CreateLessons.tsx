import React, { ChangeEvent, useRef, useState } from "react";
import "./CreateLessons.css";
import { useAppDispatch } from "../../hooks/hooks";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile } from "../../slices/coursesSlice";
import { createLesson } from "../../slices/lessonsSlice";
import axios from "axios";

interface LessonData {
  title: string;
  content: string;
  photoFile?: File;
}

const CreateLessons: React.FC = () => {
  const [lesson, setLesson] = useState<LessonData>({
    title: "",
    content: "",
  });
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [lessonPhoto, setLessonPhoto] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>() as {
    courseId: string;
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const removeLesson = (index: number) => {
    const newLessons = lessons.filter((_, i) => i !== index);
    setLessons(newLessons);
  };

  const handleAddLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проверка выбран ли файл для загрузки
    if (!lessonPhoto) {
      toast.error("Please select a photo for the lesson.");
      return;
    }

    const newLesson = { ...lesson, photoFile: lessonPhoto };
    setLessons([...lessons, newLesson]);
    setLesson({ title: "", content: "" }); // Reset form
  // Reset file input
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

    setLessonPhoto(null); // Reset file input
    toast.success("Lesson added to list");
  };

  const handleSubmitAllLessons = async () => {
    try {
      for (const lesson of lessons) {
        let photoPath = "";
  
        if (lesson.photoFile) {
          const uploadResponse = await dispatch(uploadFile(lesson.photoFile)).unwrap();
          photoPath = uploadResponse; // URL файла после загрузки
        }
  
        const lessonToSave = { ...lesson, photoPath: photoPath };
        await dispatch(createLesson({ courseId, lessonData: lessonToSave }));
      }
      setLessons([]); // Clear lessons after submission
      toast.success("All lessons created successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Обработка ошибки Axios
        const message = error.response?.data.message || "An unknown error occurred";
        toast.error("Error submitting lessons: " + message);
      } else {
        // Обработка стандартной ошибки JavaScript
        toast.error("Error submitting lessons: " + (error as Error).message);
      }
    }
  };
  

  return (
    <div className="create-lesson-container">
      <div className="create-lesson-header">
        <h2>Create Lesson</h2>
      </div>
      <form onSubmit={handleAddLesson} className="create-lesson-form">
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
            ref={fileInputRef}
          />
        </div>
        <div className="create-lesson-button-container">
          <button type="submit" className="create-lesson-submit">
            Add Lesson
          </button>
        </div>
      </form>
      <div>
        {lessons.map((lesson, index) => (
          <div key={index}>
            <h4>{lesson.title}</h4>
            <p>{lesson.content}</p>
            <button onClick={() => removeLesson(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleSubmitAllLessons}>Submit All Lessons</button>
    </div>
  );
};

export default CreateLessons;
