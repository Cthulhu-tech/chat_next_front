import { createSlice } from '@reduxjs/toolkit';
import { TokenSliceType } from './type';
import { PayloadType } from '../type';
import { extraReducers } from './async';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null,
    loading: true,
    decodeData: null,
  } as TokenSliceType,
  reducers: {
    setToken: (state, action: PayloadType<string>) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = null;
    },
  },
  extraReducers,
});

export const { setToken, deleteToken } = tokenSlice.actions;
