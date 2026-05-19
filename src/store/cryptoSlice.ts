import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoCoin } from '../services/coinGeckoService';

interface CryptoState {
  coins: CryptoCoin[];
}

const initialState: CryptoState = {
  coins: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCoinsRedux: (state, action: PayloadAction<CryptoCoin[]>) => {
      state.coins = action.payload;
    },
  },
});

export const { setCoinsRedux } = cryptoSlice.actions;
export default cryptoSlice.reducer;