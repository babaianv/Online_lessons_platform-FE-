import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Course, FileUploadResponse } from "../types/types";
import instance from "../api/axios";
import { AxiosError } from "axios";
import { RootState } from "../store/store";

interface CoursesState {
  coursesData: Course[] | null;
  loading: boolean;
  error: string | null;
  uploadedFileUrl?: string;
}

const initialState: CoursesState = {
  coursesData: null,
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk<
  Course[],
  void,
  { rejectValue: string }
>("courses/fetchCourses", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get<Course[]>("/courses");

    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch courses data");
  }
});

export const uploadFile = createAsyncThunk(
  "courses/uploadFile",
  async (file: File, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await instance.post("/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.message; // Предполагается, что ответ содержит URL файла.
    } catch (err) {
      const error: AxiosError<string> = err as AxiosError<string>;
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (courseData: Course, { rejectWithValue, getState }) => {

       // Получаем текущее состояние хранилища
       const state = getState() as RootState;
       // Извлекаем username из состояния пользователя
       const username = state.user.userInfo?.name;

    try {
      const response = await instance.post(`/courses/${username}`, courseData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // Предполагается, что ответ содержит данные созданного курса.
    } catch (err) {
      const error: AxiosError<{ message: string }> = err as AxiosError<{
        message: string;
      }>;
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const updateCourse = createAsyncThunk<Course, Course, { rejectValue: string }>(
  "courses/updateCourse",
  async (courseData, { rejectWithValue }) => {
    const { id, ...updateData } = courseData;
    try {
      const response = await instance.put<Course>(`/courses/${id}`, updateData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // Предполагается, что ответ содержит обновлённые данные курса.
    } catch (err) {
      const error: AxiosError<{ message: string }> = err as AxiosError<{ message: string }>;
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("An unknown error occurred during course update");
      }
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.error = null;
          state.coursesData = action.payload;
        }
      )
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      // Обработка состояний для uploadFile
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        uploadFile.fulfilled,
        (state, action: PayloadAction<FileUploadResponse>) => {
          state.loading = false;
          state.error = null;
          state.uploadedFileUrl = action.payload.message;
        }
      )
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false; // Загрузка завершена
        state.error = action.error?.message || "Error uploading file";
      })
      // Обработка состояний для createCourse
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCourse.fulfilled,
        (state, action: PayloadAction<Course>) => {
          state.loading = false;
          state.error = null;
          // Добавить новый курс в массив coursesData
          if (state.coursesData) {
            state.coursesData = [...state.coursesData, action.payload];
          } else {
            state.coursesData = [action.payload];
          }
        }
      )
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || null;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.error = null;
        // Обновляем курс в состоянии, если он уже существует
        const index = state.coursesData?.findIndex(course => course.id === action.payload.id);
        if (index !== undefined && index !== -1) {
          state.coursesData![index] = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update course";
      });
  },
});

export default coursesSlice.reducer;
