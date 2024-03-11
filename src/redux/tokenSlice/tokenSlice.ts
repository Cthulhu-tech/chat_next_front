import { createSlice } from '@reduxjs/toolkit';
import { DecodeTokenType, TokenSliceType } from './type';
import { PayloadType } from '../type';
import { extraReducers } from './async';
import { jwtDecode } from 'jwt-decode';

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
      const decodeToken = jwtDecode<DecodeTokenType>(action.payload);
      state.decodeData = decodeToken;
    },
    deleteToken: (state) => {
      state.token = null;
    },
  },
  extraReducers,
});

export const { setToken, deleteToken } = tokenSlice.actions;
