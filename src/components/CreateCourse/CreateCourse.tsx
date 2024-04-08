import React, { ChangeEvent, useState } from "react";
import "./CreateCourse.css";
import { useAppDispatch } from "../../hooks/hooks";
import { createCourse, uploadFile } from "../../slices/coursesSlice";
import { useNavigate } from "react-router-dom";

interface CourseData {
  title: string;
  price: number;
  description: string;
}

const CreateCourse: React.FC = () => {
  const [course, setCourse] = useState<CourseData>({
    title: "",
    price: 0,
    description: "",
  });
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [presentation, setPresentation] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Обработчики изменения полей формы и файлов
  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: parseFloat(value) || value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let photoPath = "";
    let presentationPath = "";

    // Загрузка фото
    if (coverPhoto) {
        photoPath = await dispatch(uploadFile(coverPhoto)).unwrap();
    }

    // Загрузка презентации
    if (presentation) {
        presentationPath = await dispatch(uploadFile(presentation)).unwrap();
    }

    const finalCourseData = { ...course, photoPath, presentationPath };

    try {
      console.log("Отправка данных курса на сервер:", finalCourseData);
      await dispatch(createCourse(finalCourseData)).unwrap();
      console.log("Course created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Course creation error:", error);
    }
  };

  return (
    <div className="create-course-container">
      <div className="create-course-header">
        <h2>Create Course</h2>
      </div>
      <form onSubmit={handleSubmit} className="create-course-form">
        <div className="create-main-container">
          <div className="create-files-container">
            <div className="create-course-form-group">
              <label htmlFor="coverPhoto">Cover Photo</label>
              <input
                type="file"
                id="coverPhoto"
                name="coverPhoto"
                onChange={handleFileChange(setCoverPhoto)}
              />
            </div>
            <div className="create-course-form-group">
              <label htmlFor="presentation">Presentation</label>
              <input
                type="file"
                id="presentation"
                name="presentation"
                onChange={handleFileChange(setPresentation)}
              />
            </div>
          </div>
          <div className="create-fields-container">
            <div className="create-course-form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="create-course-form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={course.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="create-course-form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="create-course-button-container">
          <button type="submit" className="create-course-submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
