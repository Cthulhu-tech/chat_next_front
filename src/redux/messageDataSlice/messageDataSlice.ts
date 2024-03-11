import { createSlice } from "@reduxjs/toolkit";
import { PayloadType, ThunkLoadingEnum } from "../type";
import { MessageTypeDataStore, MessagesChatType, NewMessageChatType } from "./type";
import { FormTypeUpdateValue } from "../registrationFormSlice/type";


const initialState = {
  messageData: {},
  loading: ThunkLoadingEnum.idle,
  message: '',
} as MessageTypeDataStore;

export const messageDataSlice = createSlice({
  name: 'message_data',
  initialState,
  reducers: {
    updateMessage: (state, action: PayloadType<FormTypeUpdateValue>) => {
      state.message = action.payload.value;
    },
    setMessagesInChat: (
        state,
        action: PayloadType<MessagesChatType>
    ) => {
        state.messageData[action.payload.room_id] = action.payload;
    },
    setMessageInChat: (
      state,
      action: PayloadType<NewMessageChatType>
  ) => {
      if(state.messageData[action.payload.room_id]) {
        state.messageData[action.payload.room_id].message = [...state.messageData[action.payload.room_id].message
          .filter((message) => Number(message.id) !== Number(action.payload.id)),
          action.payload.message];
      } else {
        state.messageData[action.payload.room_id] = {
          room_id: action.payload.room_id,
          message: [action.payload.message],
        }
      }
  },
  },
});

export const {
  setMessagesInChat,
  setMessageInChat,
  updateMessage,
} = messageDataSlice.actions;
