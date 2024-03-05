import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FormError } from "../type";
import { DecodeTokenType, TokenAccess, TokenSliceType } from "./type";
import { jwtDecode } from "jwt-decode";

export const extraReducers = (builder: ActionReducerMapBuilder<TokenSliceType>) => {
  builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
    if(payload && payload.access) {
      state.token = payload.access;
      const decodeToken = jwtDecode<DecodeTokenType>(payload.access);
      state.decodeData = decodeToken;
    } else {
      state.token = null;
    }
    state.loading = false;
  })
  builder.addCase(refreshToken.rejected, (state) => {
    state.token = null;
    state.loading = false;
  })
};

export const refreshToken = createAsyncThunk<TokenAccess, undefined, {rejectValue: FormError}>(
    'token/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios
      .post<TokenAccess>(
        process.env.REACT_APP_HOST + 'token/refresh',
        _,
        { withCredentials: true },
      );
      return data;
    } catch(err) {
      const error = err as AxiosError<FormError>
      if(error.response) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue({
          message: '500 Server Error',
          statusCode: '500',
        });
      }
    }
  },
);
