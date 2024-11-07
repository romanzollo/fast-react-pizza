import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { updateUsername } = userSlice.actions;

export default userSlice.reducer;

/* --- Selectors ---  */
// функции которые возвращаютт часть глобального состояния
// начинать эти функции селектора с get согласно стандарту Redux
export const getUsername = (state) => state.user.username;
