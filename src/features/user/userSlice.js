import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// THUNK - async action creator (redux-toolkit)
// при создании THUNK функции не использовать названия с 'get' т.к. 'get' зарезервирован для селекторов(которые находятся в самом низу данного слайса) согласно стандарту Redux
export const fetchAdress = createAsyncThunk(
  'user/fetchAdress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    // обратное геокодирование через API преобразует координаты в адрес
    const addressObj = await getAddress(position);
    // создаем красивую строку на основе полученных данных
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // возвращаем payload с FULFILLED state
    return { position, address };
  },
);

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAdress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAdress.fulfilled, (state, action) => {
        state.status = 'idle';

        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAdress.rejected, (state, action) => {
        state.status = 'error';

        state.error =
          'There was a problem getting your address. Make sure to fill this field!';
      }),
});

export const { updateUsername } = userSlice.actions;

export default userSlice.reducer;

/* --- Selectors ---  */
// функции которые возвращаютт часть глобального состояния
// начинать эти функции селектора с get согласно стандарту Redux
export const getUsername = (state) => state.user.username;
