import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { FormError, ThunkLoadingEnum } from "../type";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChatType, IChatData, IChatDataCreate, IChatType } from "./type";

export const extraReducers = (builder: ActionReducerMapBuilder<IChatData>) => {
  builder.addCase(createChat.fulfilled, (state, { payload }) => {
    state.error = {
      message: '',
      statusCode: null,
    }
    state.data = [...state.data.filter((chat) => chat.id !== payload.id), payload];
    state.loading = ThunkLoadingEnum.succeeded;
  })
  builder.addCase(createChat.rejected, (state, { payload }) => {
    if(payload) {
      state.error = payload;
    }
  })
  builder.addCase(getChats.fulfilled, (state, { payload }) => {
    state.error = {
      message: '',
      statusCode: null,
    };
    state.count = payload.count;
    state.data = payload.data;
    state.loading = ThunkLoadingEnum.succeeded;
  })
  builder.addCase(getChats.rejected, (state, { payload }) => {
    if(payload) {
      state.error = payload;
    }
  })
}

export const createChat = createAsyncThunk<ChatType, IChatDataCreate, {rejectValue: FormError}>(
  'chat_data/create_chats',
  async (chatData: IChatDataCreate, { rejectWithValue }) => {
    try {
      const { data } = await axios
      .post<ChatType, AxiosResponse<ChatType, ChatType>, IChatDataCreate>(
        process.env.REACT_APP_HOST + 'chat',
        chatData,
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

export const getChats = createAsyncThunk<IChatType, undefined, {rejectValue: FormError}>(
  'chat_data/get_chats',
  async (_: undefined, { rejectWithValue }) => {
    try {
      const { data } = await axios
      .get<IChatType, AxiosResponse<IChatType, IChatType>, undefined>(
        process.env.REACT_APP_HOST + 'chat',
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
