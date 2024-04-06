import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Enrollment } from "../types/types";
import instance from "../api/axios";
import { RootState } from "../store/store";

interface AvailableCoursesState {
  enrollments: Enrollment[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: AvailableCoursesState = {
  enrollments: null,
  loading: false,
  error: null,
};

export const fetchAvailableCourses = createAsyncThunk<Enrollment[], void, { rejectValue: string }>(
  "availableCourses/fetchAvailableCourses",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const username = state.user.userInfo?.name;
    try {
      const response = await instance.get<Enrollment[]>(`/courses/available/${username}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

const availableCoursesSlice = createSlice({
  name: 'availableCourses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableCourses.fulfilled, (state, action: PayloadAction<Enrollment[]>) => {
        state.loading = false;
        state.enrollments = action.payload;
        state.error = null;
      })
      .addCase(fetchAvailableCourses.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch available courses';
      });
  },
});

export default availableCoursesSlice.reducer;
