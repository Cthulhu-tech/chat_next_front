import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormType } from "./type";
import { FormError, ThunkLoadingEnum } from "../type";
import axios, { AxiosError, AxiosResponse } from "axios";
import { UserRegistrationType } from "../registrationFormSlice/type";
import { TokenAccess } from "../tokenSlice/type";

export const extraReducers = (builder: ActionReducerMapBuilder<LoginFormType>) => {
  builder.addCase(loginUser.fulfilled, (state) => {
    state.error = {
      message: '',
      statusCode: null,
    }
    state.loading = ThunkLoadingEnum.succeeded;
  })
  builder.addCase(loginUser.rejected, (state, { payload }) => {
    if(payload) {
      state.error = payload;
    }
    state.login = '';
    state.password = '';
  })
}

export const loginUser = createAsyncThunk<TokenAccess, UserRegistrationType, {rejectValue: FormError}>(
  'login_form/login',
  async (userRegistrationData: UserRegistrationType, { rejectWithValue }) => {
    try {
      const { data } = await axios
      .post<TokenAccess, AxiosResponse<TokenAccess, TokenAccess>, UserRegistrationType>(
        process.env.REACT_APP_HOST + 'token/login',
        userRegistrationData,
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
)