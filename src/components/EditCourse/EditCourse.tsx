import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchCourseDetails } from "../../slices/courseDetailsSlice";
import { updateCourse } from "../../slices/coursesSlice";
import "./EditCourse.css";

interface CourseData {
  title: string;
  price: string; 
  description: string;
  photoPath: string;
}

const EditCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const courseIdNumber = courseId !== undefined ? parseInt(courseId, 10) : 0;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const courseDetails = useAppSelector(
    (state) => state.coursesDetails.courseDetails
  );

  const [course, setCourse] = useState<CourseData>({
    title: "",
    price: "",
    description: "",
    photoPath: "",
  });

  // const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  // const [presentation, setPresentation] = useState<File | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    // Теперь price обрабатывается как строка без преобразования в число
    setCourse({ ...course, [name]: value });
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetails(parseInt(courseId)));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    if (courseDetails) {
      setCourse({
        title: courseDetails.title,
        price: courseDetails.price.toString(), // преобразование в строку для input
        description: courseDetails.description,
        photoPath: courseDetails.photoPath,
      });
      // Добавьте также значения для coverPhoto и presentation, если они есть
    }
  }, [courseDetails]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Обработка отправки данных формы, включая загрузку файлов и обновление курса
    // Преобразуйте price обратно в число, если потребуется
    const updatedCourseData = {
      id: courseIdNumber, 
      ...course,
      photoPath: course.photoPath,
      price: course.price === "" ? 0 : parseFloat(course.price), // Задайте значение по умолчанию, если price пустая строка
    };
    dispatch(updateCourse(updatedCourseData)).then(() => {
      navigate("/my_courses");
    });
  };

  return (
    <div className="edit-course-container">
      <div className="edit-course-header">
        <h2>Edit Course</h2>
      </div>
      <form onSubmit={handleSubmit} className="edit-course-form">
        <div className="edit-main-container">
          <div className="edit-files-container">
            <div className="edit-course-form-group">
              <label htmlFor="coverPhoto">Cover Photo</label>
              <input
                type="file"
                id="coverPhoto"
                name="coverPhoto"
                disabled={true}
                // onChange={handleFileChange(setCoverPhoto)}
              />
            </div>
            <div className="edit-course-form-group">
              <label htmlFor="presentation">Presentation</label>
              <input
                type="file"
                id="presentation"
                name="presentation"
                disabled={true}
                // onChange={handleFileChange(setPresentation)}
              />
            </div>
          </div>
          <div className="edit-fields-container">
            <div className="edit-course-form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-course-form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                name="price"
                value={course.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-course-form-group">
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
        <div className="edit-course-button-container">
          <button type="submit" className="edit-course-submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
