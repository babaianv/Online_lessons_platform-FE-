import { configureStore } from '@reduxjs/toolkit';
import coursesReducer, { fetchCourses } from '../Slices/coursesSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
  },
});

store.dispatch(fetchCourses());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;