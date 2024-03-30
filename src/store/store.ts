import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../Slices/coursesSlice";
import userReducer from "../Slices/userSlice";
import courseDetailsReducer from "../Slices/courseDetailsSlice";
import cartReducer from "../Slices/cartSlice";
import totalCountReducer from "../Slices/totalCountSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
    coursesDetails: courseDetailsReducer,
    cart: cartReducer,
    totalCount: totalCountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
