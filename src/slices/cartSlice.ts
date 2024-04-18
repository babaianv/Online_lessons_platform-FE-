import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import instance from "../api/axios";
import { AxiosError } from "axios";

interface CartItem {
  id: number;
  title: string;
  count: number;
  price: number;
}

interface CartState {
  id: number | null;
  totalPrice: number;
  items: CartItem[];
}

interface CartCoursetPayload {
  cartId: number | undefined;
  courseId: number | undefined;
}

const initialState: CartState = {
  id: null,
  totalPrice: 0,
  items: [],
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (cartId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/cart/${cartId}`);
      console.log(response);
      

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAddToCart = createAsyncThunk(
  "cart/fetchAddToCart",
  async (addToCartData: CartCoursetPayload, { rejectWithValue }) => {
    const cartId = addToCartData.cartId;
    const courseId = addToCartData.courseId;

    try {
      console.log(cartId, courseId);

      const response = await instance.put(`/cart/add/${cartId}/${courseId}`);
      console.log(response);

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteCourseFromCart = createAsyncThunk(
  "cart/fetchDeleteCourseFromCart",
  async (addToCartData: CartCoursetPayload, { rejectWithValue }) => {
    const cartId = addToCartData.cartId;
    const courseId = addToCartData.courseId;

    try {
      const response = await instance.delete(`/cart/${cartId}/${courseId}`);

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteAllCourseFromCart = createAsyncThunk<
  void,
  number | undefined,
  { rejectValue: string }
>(
  "cart/fetchDeleteAllCourseFromCart",
  async (cartId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/cart/clear/${cartId}`);

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBuyAllCoursesFromCart = createAsyncThunk<
  void,
  number | undefined,
  { rejectValue: string }
>(
  "cart/fetchBuyAllCoursesFromCart",
  async (cartId: number | undefined, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/cart/buy/${cartId}`);

      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, price } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].count++;
      } else {
        console.log("added");
        
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += price;
    },
    incrementCount: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.count++;
        state.totalPrice += item.price;
      }
    },
    decrementCount: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && item.count > 1) {
        item.count--;
        state.totalPrice -= item.price;
      }
    },
    removeAllItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const removedItem = state.items.find((item) => item.id === id);

      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalPrice -= removedItem.price * removedItem.count;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const {
  addToCart,
  decrementCount,
  incrementCount,
  removeAllItems,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
