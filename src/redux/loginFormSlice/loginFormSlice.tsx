import { createSlice } from "@reduxjs/toolkit";
import {  PayloadType, ThunkLoadingEnum } from "../type";
import { FormTypeUpdateValue } from "../registrationFormSlice/type";
import { LoginFormType } from "./type";
import { extraReducers } from "./async";

const initialState = {
  error: {
    statusCode: null,
    message: '',
  },
  password: '',
  login: '',
  loading: ThunkLoadingEnum.idle,
} as LoginFormType;

export const loginFormSlice = createSlice({
  name: 'login_form',
  initialState,
  reducers: {
    setValueInLoginForm: (
        state,
        action: PayloadType<FormTypeUpdateValue>
    ) => {
      return {...state, [action.payload.name]: action.payload.value};
    },
    deleteValueInLoginForm: () => {
      return initialState;
    },
  },
  extraReducers,
});

export const {
    setValueInLoginForm,
    deleteValueInLoginForm,
} = loginFormSlice.actions;
