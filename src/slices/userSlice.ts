import {
  createSlice,
  createAsyncThunk,
  createAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AuthResponse, RegisterResponse, UserInfo } from "../types/types";
import { RootState } from "../store/store";
import { AxiosError } from "axios";
import instance from "../api/axios";

interface UserState {
  userInfo: UserInfo | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  isInitializing: boolean;
}

const initialState: UserState = {
  userInfo: null,
  status: "idle",
  error: null,
  isInitializing: true,
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
  RegisterResponse,
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
  AuthResponse,
  LoginPayload,
  {
    rejectValue: string;
  }
>("user/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await instance.post("/auth/login", credentials);

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const username = state.user.userInfo?.name;
    console.log(state.user.userInfo);

    try {
      const response = await instance.delete(`/users/delete/${username}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<
  UserInfo,
  void,
  {
    rejectValue: string;
  }
>("user/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await instance.get("/auth/auth_info");
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return rejectWithValue(error.response.data as string);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const logout = createAction("user/logout");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsInitializing: (state, action: PayloadAction<boolean>) => {
      state.isInitializing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isInitializing = true; // При начале запроса на получение данных пользователя
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isInitializing = false; // Завершение инициализации
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        // Пометим инициализацию как завершенную, даже если произошла ошибка.
        state.isInitializing = false;
        // Также можно установить ошибку, если это необходимо для логики приложения.
        state.error = action.payload as string;
        // Может быть полезно также сбросить userInfo, если оно было установлено.
        state.userInfo = null;
      })
      .addCase(logout, (state) => {
        // Очистка состояния пользователя
        state.userInfo = null;
        state.status = "idle";
        state.isInitializing = false;
        // Очистка данных из localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  },
});

export const { setIsInitializing } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
