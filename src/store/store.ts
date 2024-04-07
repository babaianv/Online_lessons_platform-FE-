import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../slices/coursesSlice";
import userReducer from "../slices/userSlice";
import courseDetailsReducer from "../slices/courseDetailsSlice";
import cartReducer from "../slices/cartSlice";
import totalCountReducer from "../slices/totalCountSlice";
import accountInfoSlice from "../slices/myAccountSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
    coursesDetails: courseDetailsReducer,
    cart: cartReducer,
    totalCount: totalCountReducer,
    accountInfo: accountInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
