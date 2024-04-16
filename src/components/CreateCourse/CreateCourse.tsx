import React, { ChangeEvent, useState } from "react";
import "./CreateCourse.css";
import { useAppDispatch } from "../../hooks/hooks";
import { createCourse, uploadFile } from "../../slices/coursesSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface CourseData {
  title: string;
  price: number | null;
  description: string;
}

interface CourseErrors {
  title?: string;
  price?: string;
  description?: string;
  photo?: string;
}

const CreateCourse: React.FC = () => {
  const [course, setCourse] = useState<CourseData>({
    title: "",
    price: null,
    description: "",
  });
  const [errors, setErrors] = useState<CourseErrors>({});
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [presentation, setPresentation] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: CourseErrors = {};
    if (!course.title || course.title.length < 5) {
      newErrors.title = "The title must be at least 5 characters long.";
    }
    if (
      course.price === null ||
      isNaN(course.price) ||
      course.price < 0 ||
      course.price > 9999
    ) {
      newErrors.price = "The price must be between 0 and 9999.";
    }
    if (!course.description || course.description.length < 300) {
      newErrors.description =
        "The description must be at least 300 characters long.";
    }
    if (!coverPhoto) {
      newErrors.photo = "Cover photo is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчики изменения полей формы и файлов
  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "price") {
      if (value === "") {
        setCourse((prevCourse) => ({
          ...prevCourse,
          [name]: null,
        }));
      } else {
        const numericValue = parseInt(value, 10);
        // Проверяем, что значение является числом и не отрицательным
        if (!isNaN(numericValue) && numericValue >= 0) {
          setCourse((prevCourse) => ({
            ...prevCourse,
            [name]: numericValue,
          }));
        }
      }
    } else {
      setCourse((prevCourse) => ({
        ...prevCourse,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    let photoPath = "";
    let presentationPath = "";

    // Загрузка фото
    if (coverPhoto) {
      try {
        photoPath = await dispatch(uploadFile(coverPhoto)).unwrap();
      } catch (error) {
        toast.error("Failed to upload cover photo.");
        return;
      }
    }

    // Загрузка презентации
    if (presentation) {
      presentationPath = await dispatch(uploadFile(presentation)).unwrap();
    }

    const finalCourseData = {
      ...course,
      photoPath,
      presentationPath,
      title: course.title.trim(),
    };

    try {
      console.log("Отправка данных курса на сервер:", finalCourseData);
      await dispatch(
        createCourse({
          ...finalCourseData,
          price: finalCourseData.price as number,
        })
      ).unwrap();
      toast.success("Course created successfully", {
        toastId: "create_course_success",
      });
      navigate("/my_courses");
    } catch (error) {
      toast.error("Failed to create the course.", {
        toastId: "create_course_error",
      });
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
              {errors.photo && (
                <p className="create-course-error">{errors.photo}</p>
              )}
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
                disabled
                onChange={handleFileChange(setPresentation)}
              />
            </div>
          </div>
          <div className="create-fields-container">
            <div className="create-course-form-group">
              <label htmlFor="title">Title</label>
              {errors.title && (
                <p className="create-course-error">{errors.title}</p>
              )}
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
              {errors.price && (
                <p className="create-course-error">{errors.price}</p>
              )}
              <input
                type="text"
                id="price"
                name="price"
                value={course.price !== null ? course.price.toString() : ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="create-course-form-group">
              <label htmlFor="description">Description</label>
              {errors.description && (
                <p className="create-course-error">{errors.description}</p>
              )}
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
