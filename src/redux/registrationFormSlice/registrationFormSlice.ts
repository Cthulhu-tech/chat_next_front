import { createSlice } from "@reduxjs/toolkit";
import { FormTypeUpdateValue, RegistrationFormType } from "./type";
import { PayloadType, ThunkLoadingEnum } from "../type";
import { extraReducers } from "./async";

const initialState = {
  login: '',
  password: '',
  repeat_password: '',
  error: {
    statusCode: null,
    message: '',
  },
  user: {
    id: null,
    login: '',
  },
  loading: ThunkLoadingEnum.idle,
} as RegistrationFormType

export const registrationFormSlice = createSlice({
  name: 'registration_form',
  initialState,
  reducers: {
    setValueInRegistrationForm: (
        state,
        action: PayloadType<FormTypeUpdateValue>
    ) => {
      return {...state, [action.payload.name]: action.payload.value};
    },
    deleteValueInRegistrationForm: () => {
      return initialState;
    },
  },
  extraReducers,
});

export const {
    setValueInRegistrationForm,
    deleteValueInRegistrationForm,
} = registrationFormSlice.actions;
