import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { RegistrationFormType, UserRegistrationType, UserType } from "./type";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FormError, ThunkLoadingEnum } from "../type";

export const extraReducers = (builder: ActionReducerMapBuilder<RegistrationFormType>) => {
  builder.addCase(createUser.fulfilled, (state, { payload }) => {
    if(payload) {
      state.loading = ThunkLoadingEnum.succeeded;
      state.user = payload;
      state.error = {
        message: '',
        statusCode: null,
      }
    } else {
      state.loading = ThunkLoadingEnum.failed;
    }
  })
  builder.addCase(createUser.rejected, (state, { payload }) => {
    if(payload) {
      state.error = payload;
    }
    state.loading = ThunkLoadingEnum.failed;
    state.user = {
      id: null,
      login: '',
    };
  })
};

export const createUser = createAsyncThunk<UserType, UserRegistrationType, {rejectValue: FormError}>(
    'registration_form/registration',
  async (userRegistrationData: UserRegistrationType, { rejectWithValue }) => {
    try {
      const { data } = await axios
      .post<UserType, AxiosResponse<UserType, UserType>, UserRegistrationType>(
        process.env.REACT_APP_HOST + 'user/',
        userRegistrationData
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
