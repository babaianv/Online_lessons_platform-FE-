import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Course } from "../types/types";

interface CoursesState {
  coursesData: Course[] | null;
  loading: boolean;
  error: string | null;
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
    const response = await axios.get<Course[]>(
      "http://localhost:8080/api/courses"
    );
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch courses data");
  }
});

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
      });
  },
});

export default coursesSlice.reducer;
