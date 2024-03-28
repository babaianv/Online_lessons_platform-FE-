import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Course } from "../types/types";
import instance from "../api/axios";

interface CourseDetailsState {
  courseDetails: Course | null;
  loading: boolean;
  error: string | null;
  selectedCourseId: number | null;
}

const initialState: CourseDetailsState = {
  courseDetails: null,
  loading: false,
  error: null,
  selectedCourseId: null,
};

export const fetchCourseDetails = createAsyncThunk<
  Course,
  number,
  { rejectValue: string }
>("courses/fetchCourseDetails", async (courseId, { rejectWithValue }) => {
  try {
    const response = await instance.get<Course>(`/courses/${courseId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch course details");
  }
});

const courseDetailsSlice = createSlice({
  name: "courseDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCourseDetails.fulfilled,
        (state, action: PayloadAction<Course>) => {
          state.loading = false;
          state.error = null;
          state.courseDetails = action.payload;
        }
      )
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export default courseDetailsSlice.reducer;
