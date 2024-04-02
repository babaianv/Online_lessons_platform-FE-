import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Course, FileUploadResponse } from "../types/types";
import instance from "../api/axios";
import { AxiosError } from "axios";

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

const username = "user123"; //затычка, пока не реализована авторизация

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
      return response.data.message; 
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
  async (courseData: Course, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/courses/${username}`, courseData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
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
        state.loading = false; 
        state.error = action.error?.message || "Error uploading file";
      })
      
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createCourse.fulfilled,
        (state, action: PayloadAction<Course>) => {
          state.loading = false;
          state.error = null;
         
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
      });
  },
});

export default coursesSlice.reducer;
