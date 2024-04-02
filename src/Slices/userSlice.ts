import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from '../store';
import { UserResponse } from "../types/types";
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

// Thunk action для выхода пользователя
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await instance.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      const error: AxiosError<string> = err as AxiosError<string>;
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
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
          // Сохраняем информацию о пользователе из action.payload
          state.userInfo = action.payload;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        // Сохраняем сообщение об ошибке
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Обновление состояния после успешного выхода
        state.userInfo = null;
        state.status = "idle";
      });
  },
});

export default userSlice.reducer;
