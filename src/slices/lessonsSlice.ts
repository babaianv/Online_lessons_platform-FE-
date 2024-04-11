import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LessonResponse } from "../types/types";
import instance from "../api/axios";
import { AxiosError } from "axios";
import { RootState } from "../store/store";

interface LessonsState {
  lessonsResponse: LessonResponse[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: LessonsState = {
  lessonsResponse: null,
  status: "idle",
  error: null,
};

export const fetchLessons = createAsyncThunk<
  LessonResponse[],
  number | undefined,
  { rejectValue: string }
>(
  "LESSONS/fetchLessons",
  async (courseId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await instance.get<LessonResponse[]>(
        `/lessons/${courseId}`
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDemoLessons = createAsyncThunk<
  LessonResponse[],
  number | undefined,
  { rejectValue: string }
>(
  "LESSONS/fetchDemoLessons",
  async (courseId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await instance.get<LessonResponse[]>(
        `/lessons/demo/${courseId}`
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const lessonsSlice = createSlice({
  name: "LESSONS",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchLessons.fulfilled,
        (state, action: PayloadAction<LessonResponse[]>) => {
          state.status = "succeeded";
          state.lessonsResponse = action.payload;
        }
      )
      .addCase(fetchLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchDemoLessons.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchDemoLessons.fulfilled,
        (state, action: PayloadAction<LessonResponse[]>) => {
          state.status = "succeeded";
          state.lessonsResponse = action.payload;
        }
      )
      .addCase(fetchDemoLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectLessons = (state: RootState) => state.lessons;
export default lessonsSlice.reducer;
