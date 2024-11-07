import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   cart: [],

  cart: [
    {
      id: 1,
      name: 'Romana',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload = id
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      // payload = id
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decreaseItemQuantity: (state, action) => {
      // payload = id
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
