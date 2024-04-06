import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../slices/coursesSlice";
import userReducer from "../slices/userSlice";
import courseDetailsReducer from "../slices/courseDetailsSlice";
import cartReducer from "../slices/cartSlice";
import totalCountReducer from "../slices/totalCountSlice"; 
import availableCoursesReducer from "../slices/availableCourses";


export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
    coursesDetails: courseDetailsReducer,
    cart: cartReducer,
    totalCount: totalCountReducer, 
    availableCourses: availableCoursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
