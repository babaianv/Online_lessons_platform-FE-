import { createSlice, createAsyncThunk, createAction, PayloadAction } from "@reduxjs/toolkit";
import { UserResponse } from "../types/types";
import { RootState } from '../store/store';
import { AxiosError } from "axios";
import instance from "../api/axios";

interface UserState {
  userInfo: UserResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: UserState = {
  userInfo: null,
  status: "idle",
  error: null,
};

interface RegisterPayload {
  nickname: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  UserResponse,
  RegisterPayload,
  {
    rejectValue: string;
  }
>("user/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await instance.post("/users/register", userData);
    return response.data;
  } catch (err) {
    const error: AxiosError<string> = err as AxiosError<string>;
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const loginUser = createAsyncThunk<
  UserResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await instance.post("/auth/login", credentials);
   
    localStorage.setItem("token", response.data.accessToken);
    return response.data;
  } catch (err) {
    const error: AxiosError<string> = err as AxiosError<string>;
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

////////
export const logout = createAction("user/logout");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.status = "succeeded";
          state.userInfo = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserResponse>) => {
          state.status = "succeeded";
          state.userInfo = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout, (state) => {
        state.userInfo = null;
        state.status = "idle";
        localStorage.removeItem("token");
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;