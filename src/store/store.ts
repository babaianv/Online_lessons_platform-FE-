import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../slices/coursesSlice";
import userReducer from "../slices/userSlice";
import courseDetailsReducer from "../slices/courseDetailsSlice";
import cartReducer from "../slices/cartSlice";
import accountInfoSlice from "../slices/myAccountSlice";
import totalCountReducer from "../slices/totalCountSlice"; 
import availableCoursesReducer from "../slices/availableCoursesSlice";
import createdCoursesReducer from "../slices/createdCoursesSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
    coursesDetails: courseDetailsReducer,
    cart: cartReducer,
    accountInfo: accountInfoSlice,
    totalCount: totalCountReducer, 
    availableCourses: availableCoursesReducer,
    createdCourses: createdCoursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
