import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterResponse } from "../types/types";
import { AxiosError } from "axios";
import instance from "../api/axios";
import { RootState } from "../store/store";

interface UserState {
  userInfo: RegisterResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: UserState = {
  userInfo: null,
  status: "idle",
  error: null,
};

interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const fetchUser = createAsyncThunk<
  RegisterResponse,
  void,
  { rejectValue: string }
>("MY_ACCOUNT/fetchUser", async (_, { rejectWithValue, getState }) => {
  const state = getState() as RootState;
  const username = state.user.userInfo?.name;
  try {
    const response = await instance.get<RegisterResponse>(
      `/users/account_info/${username}`
    );
    console.log("hello");

    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(error.message);
  }
});

export const changePassword = createAsyncThunk<
  void,
  ChangePasswordPayload,
  { rejectValue: string }
>(
  "MY_ACCOUNT/changePassword",
  async (
    changePasswordData: ChangePasswordPayload,
    { rejectWithValue, getState }
  ) => {
    const state = getState() as RootState;
    const username = state.user.userInfo?.name;
    try {
      console.log(changePasswordData);

      await instance.put(
        `/users/change_password/${username}`,
        changePasswordData
      );
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const myAccountSlice = createSlice({
  name: "MY_ACCOUNT",
  initialState,
  reducers: {
    resetChangePasswordStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetChangePasswordStatus } = myAccountSlice.actions;
export const selectAccountInfo = (state: RootState) => state.accountInfo;
export default myAccountSlice.reducer;
