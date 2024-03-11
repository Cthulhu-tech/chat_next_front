import { createSlice } from "@reduxjs/toolkit";
import {  PayloadType, ThunkLoadingEnum } from "../type";
import { extraReducers } from "./async";
import { IChatData } from "./type";
import { FormTypeUpdateValue } from "../registrationFormSlice/type";

const initialState = {
  error: {
    statusCode: null,
    message: '',
  },
  count: 0,
  data: [],
  loading: ThunkLoadingEnum.idle,
  name: '',
} as IChatData;

export const chatDataSlice = createSlice({
  name: 'chat_data',
  initialState,
  reducers: {
    deleteChat: (
        state,
        action: PayloadType<number>
    ) => {
      return {...state, data: state.data.filter((chat) => chat.id !== action.payload)};
    },
    setValueInChatCreateForm: (
      state,
      action: PayloadType<FormTypeUpdateValue>
  ) => {
    return {...state, [action.payload.name]: action.payload.value};
  },
  },
  extraReducers,
});

export const {
    deleteChat,
    setValueInChatCreateForm,
} = chatDataSlice.actions;
