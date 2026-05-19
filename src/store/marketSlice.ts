// src/store/marketSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MarketItem, MarketState } from '../types';

// Async thunk to handle network requests
export const fetchMarketData = createAsyncThunk(
  'market/fetchMarketData',
  async (page: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=15`);
    if (!response.ok) throw new Error('Failed to fetch data from server.');
    return (await response.json()) as MarketItem[];
  }
);

const initialState: MarketState = {
  items: [],
  page: 1,
  loading: false,
  error: null,
  searchQuery: '',
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketData.fulfilled, (state, action: PayloadAction<MarketItem[]>) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload]; // Appends new data for infinite scroll
        state.page += 1;
      })
      .addCase(fetchMarketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An unknown network error occurred.';
      });
  },
});

export const { setSearchQuery } = marketSlice.actions;
export default marketSlice.reducer;