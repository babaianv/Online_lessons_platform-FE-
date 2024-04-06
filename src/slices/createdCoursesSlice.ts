import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Course } from "../types/types";
import { AxiosError } from "axios";
import instance from "../api/axios";
import { RootState } from "../store/store";

interface CreatedCoursesState {
  createdCourses: Course[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CreatedCoursesState = {
  createdCourses: null,
  loading: false,
  error: null,
};

export const fetchCreatedCourses = createAsyncThunk<
  Course[],
  void,
  { rejectValue: string }
>(
  "createdCourses/fetchCreatedCourses",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const username = state.user.userInfo?.name;

    try {
      const response = await instance.get<Course[]>(
        `/courses/created/${username}`
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

export const deleteCreatedCourse = createAsyncThunk<
  void,
  number, // тип аргумента: ID курса
  { rejectValue: string }
>(
  "createdCourses/deleteCreatedCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      await instance.delete(`/courses/${courseId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message || axiosError.message);
    }
  }
);

const createdCoursesSlice = createSlice({
  name: "createdCourses",
  initialState,
  reducers: {
    removeCreatedCourse(state, action: PayloadAction<number>) {
      state.createdCourses =
        state.createdCourses?.filter(
          (course) => course.id !== action.payload
        ) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreatedCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCreatedCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.createdCourses = action.payload;
        }
      )
      .addCase(
        fetchCreatedCourses.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to fetch created courses";
        }
      )
      .addCase(deleteCreatedCourse.fulfilled, (state, action) => {
        // Поскольку action.payload здесь undefined, используйте action.meta.arg как ID курса для удаления
        state.createdCourses = state.createdCourses?.filter(course => course.id !== action.meta.arg) || null;
      });
  },
});

export const selectCreatedCourses = (state: RootState) => state.createdCourses;

export default createdCoursesSlice.reducer;
