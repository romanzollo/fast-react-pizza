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

      // вычисляем общую цену
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity: (state, action) => {
      // payload = id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;

      // вычисляем общую цену
      item.totalPrice = item.unitPrice * item.quantity;

      // удаляем товар из состояния(корзины) если его количество равно 0
      // caseReducers - встроенный объект в созданном нами cartSlice с помощью createSlice в котором храняться все редюсеры которые мы создали
      // (используем этот 'трюк' чтобы не писать удаление вручную заново как в редюсере deleteItem)
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
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

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// ?? - проверка значения на undefined и null (оператор NULLISH COALESCING)
// если значение еще не определено, то возвращается 0
// чтобы в объекте cart.quantity не было undefined
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// В больших проектах рекомендуется использовать reselect (library)
// для эффективного использования селекторов и производительности
