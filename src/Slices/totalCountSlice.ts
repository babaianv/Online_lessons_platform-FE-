import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const initialState = {
  totalCount: 0,
};

const totalCountSlice = createSlice({
  name: "totalCount",
  initialState,
  reducers: {
    incrementTotalCount: (state) => {
      state.totalCount++;
    },
  },
});

export const { incrementTotalCount } = totalCountSlice.actions;

export const selectTotalCount = (state: RootState) =>
  state.totalCount.totalCount;

export default totalCountSlice.reducer;
