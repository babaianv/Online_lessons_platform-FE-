import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import instance from '../api/axios';
import { AxiosError } from 'axios';

interface Lesson {
  id?: number;
  title: string;
  photoPath: string;
  content: string;
}

interface LessonState {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  lessons: [],
  loading: false,
  error: null,
};

export const createLesson = createAsyncThunk<
  Lesson,
  { courseId: string; lessonData: Lesson },
  { rejectValue: string }
>('lessons/createLesson', async ({ courseId, lessonData }, { rejectWithValue }) => {
  try {
    const response = await instance.post<Lesson>(`/lessons/${courseId}`, lessonData);
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
});

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLesson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
        state.lessons.push(action.payload);
        state.loading = false;
      })
      .addCase(createLesson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create lesson';
      });
  },
});

export default lessonsSlice.reducer;
