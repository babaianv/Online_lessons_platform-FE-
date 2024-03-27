// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../api/axios';
// import { RootState } from '../store';
import { UserResponse } from '../../types/types';
import { AxiosError } from 'axios';

interface UserState {
  userInfo: UserResponse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null,
};

interface RegisterPayload {
  nickname: string;
  email: string;
  password: string;
}

export const registerUser = createAsyncThunk<
  // Return type of the payload creator
  UserResponse,
  // First argument to the payload creator
  RegisterPayload,
  {
    rejectValue: string;
  }
>('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/users/register', userData);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
