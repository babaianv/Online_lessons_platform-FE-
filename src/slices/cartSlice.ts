import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface CartItem {
  id: string;
  name: string;
  count: number;
  price: number;
}

interface CartState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartState = {
  totalPrice: 0,
  items: [],
};

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
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += price;
    },
    incrementCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.count++;
        state.totalPrice += item.price;
      }
    },
    decrementCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item && item.count > 1) {
        item.count--;
        state.totalPrice -= item.price;
      }
    },
    
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const removedItem = state.items.find((item) => item.id === id);

      if (removedItem) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalPrice -= removedItem.price * removedItem.count;
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const {
  addToCart,
  decrementCount,
  incrementCount,
  removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
