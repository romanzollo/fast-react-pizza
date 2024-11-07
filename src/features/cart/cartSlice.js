import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
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
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      // payload = id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
    },
    decreaseItemQuantity: (state, action) => {
      // payload = id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
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

/* --- Selectors ---  */
// функции которые возвращаютт часть глобального состояния
// начинать эти функции селектора с get согласно стандарту Redux
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.unitPrice, 0);

// В больших проектах рекомендуется использовать reselect (library)
// для эффективного использования селекторов и производительности
