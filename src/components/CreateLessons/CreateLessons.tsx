import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./CreateLessons.css";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadFile } from "../../slices/coursesSlice";
import { createLesson, fetchLessons } from "../../slices/lessonsSlice";
import axios from "axios";
import { Lesson } from "../../types/types";

interface LessonData {
  title: string;
  content: string;
  photoFile?: File;
  number: number;
  previewUrl?: string;
}

const CreateLessons: React.FC = () => {
  const [existingLessons, setExistingLessons] = useState<Lesson[]>([]);
  const [lesson, setLesson] = useState<LessonData>({
    title: "",
    content: "",
    number: 0,
  });
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [lessonPhoto, setLessonPhoto] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>() as {
    courseId: string;
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchLessons(Number(courseId)))
      .then((response) => {
        // Assuming response.payload is Lesson[], explicitly assert the type
        setExistingLessons(response.payload as Lesson[]);
      })
      .catch((error) => {
        console.error("Failed to fetch lessons:", error);
        setExistingLessons([]);
      });
  }, [dispatch, courseId]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLesson({ ...lesson, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLessonPhoto(file);

      // Создаем URL для предпросмотра изображения, если нужно
      const previewUrl = URL.createObjectURL(file);
      setLesson((prevLesson) => ({
        ...prevLesson,
        previewUrl: previewUrl,
      }));
    }
  };

  const removeLesson = (index: number) => {
    const newLessons = lessons.filter((_, i) => i !== index);
    setLessons(newLessons);
  };

  const handleAddLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const num = Number(lesson.number);

    if (!lesson.title.trim() || !lesson.content.trim() || !num) {
      toast.error("Please fill in all the fields.", {
        toastId: "lesson_fields_required",
      });
      return;
    }

    if (num < 1) {
      toast.error("Lesson number must be at least 1 or more.", {
        toastId: "lesson_number_invalid",
      });
      return;
    }

    if (
      existingLessons.some((l) => l.number === num) ||
      lessons.some((l) => l.number === num)
    ) {
      toast.error(
        "Lesson number is already in use. Please use a different number.", 
        {
          toastId: "lesson_number_in_use",
        }
      );
      return;
    }

    // Проверка выбран ли файл для загрузки
    if (!lessonPhoto) {
      toast.error("Please select a photo for the lesson.", {
        toastId: "lesson_photo_required",
      });
      return;
    }

    const newLesson = {
      ...lesson,
      number: Number(lesson.number),
      photoFile: lessonPhoto,
      previewUrl: lesson.previewUrl,
    };
    setLessons([...lessons, newLesson]);
    setLesson({ title: "", content: "", number: 0, previewUrl: undefined }); // Reset form
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setLessonPhoto(null); // Reset file input
    toast.success("Lesson added to list", { toastId: "lesson_added" });
  };

  const handleSubmitAllLessons = async () => {
    if (lessons.length === 0) {
      toast.error("No lessons to submit. Please add at least one lesson.", {
        toastId: "no_lessons_to_submit",
      });
      return;
    }

    try {
      for (const lesson of lessons) {
        let photoPath = "";

        if (lesson.photoFile) {
          const uploadResponse = await dispatch(
            uploadFile(lesson.photoFile)
          ).unwrap();
          photoPath = uploadResponse; // URL файла после загрузки
        }

        const lessonToSave = {
          ...lesson,
          photoPath: photoPath,
          title: lesson.title.trim(),
        };
        await dispatch(createLesson({ courseId, lessonData: lessonToSave }));
      }
      setLessons([]); // Clear lessons after submission
      toast.success("All lessons created successfully", {
        toastId: "lessons_created",
      });
      navigate("/my_courses");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Обработка ошибки Axios
        const message =
          error.response?.data.message || "An unknown error occurred";
        toast.error("Error submitting lessons: " + message, {
          toastId: "lesson_submit_error",
        });
      } else {
        toast.error("Error submitting lessons: " + (error as Error).message, {
          toastId: "lesson_submit_diff_error",
        });
      }
    }
  };

  return (
    <div className="create-lesson-page-container">
      <div className="create-lesson-header">
        <h2>Create Lesson</h2>
      </div>
      <div className="create-lesson-main-container">
        <div className="create-lesson-list-container">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <div key={index} className="create-lesson-list-item">
                <div className="create lesson-list-info">
                  {lesson.previewUrl && (
                    <img
                      src={lesson.previewUrl}
                      alt="Preview"
                      className="create-lesson-preview-img"
                    />
                  )}
                  <h4 className="create-lesson-list-title">{lesson.title}</h4>
                  <p className="create-lesson-list-content">{lesson.content}</p>
                </div>
                <button
                  onClick={() => removeLesson(index)}
                  className="create-lesson-list-remove-btn"
                >
                  x
                </button>
              </div>
            ))
          ) : (
            <p className="create-lesson-no-lessons">Lessons not added yet</p>
          )}
        </div>
        <div className="create-lesson-form-container">
          <form onSubmit={handleAddLesson} className="create-lesson-form">
            {/* Поля формы для ввода данных урока */}
            <div className="create-lesson-form-group">
              <label htmlFor="number">Lesson Number</label>
              <input
                type="number"
                id="number"
                name="number"
                value={lesson.number || ""}
                onChange={handleInputChange}
              />
            </div>
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
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            <div className="create-lesson-button-container">
              <button type="submit" className="create-lesson-submit">
                Add Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="create-lesson-submit-all-container">
        <button onClick={handleSubmitAllLessons}>Submit All Lessons</button>
      </div>
    </div>
  );
};

export default CreateLessons;
