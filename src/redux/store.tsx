import { configureStore } from '@reduxjs/toolkit'
import { tokenSlice } from './tokenSlice/tokenSlice';
import { registrationFormSlice } from './registrationFormSlice/registrationFormSlice';
import { loginFormSlice } from './loginFormSlice/loginFormSlice';
import { chatDataSlice } from './chatDataSlice/chatDataSlice';
import { messageDataSlice } from './messageDataSlice/messageDataSlice';

export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
    registration_form: registrationFormSlice.reducer,
    login_form: loginFormSlice.reducer,
    chat_data: chatDataSlice.reducer,
    message_data: messageDataSlice.reducer,
  },
});
