import {createSlice} from '@reduxjs/toolkit';
import {IMessageForm} from "../types";
import {addMessage, getMessages, getMessagesByDateTime} from './MessagesThunk';

interface MessagesState {
    messages: IMessageForm[];
    lastMessageDate: string | null,
    isLoading: boolean;
    isError: boolean;
}

const initialState: MessagesState = {
    messages: [],
    lastMessageDate: null,
    isLoading: false,
    isError: false,
};

const MessagesSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addMessage.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(addMessage.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(addMessage.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });

      builder.addCase(getMessages.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
      builder.addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
        state.lastMessageDate = action.payload[action.payload.length - 1].date;
      });
      builder.addCase(getMessages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

      builder.addCase(getMessagesByDateTime.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
      builder.addCase(getMessagesByDateTime.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = [...action.payload, ...state.messages];
        state.lastMessageDate = action.payload[action.payload.length - 1].date;
      });
      builder.addCase(getMessagesByDateTime.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    }
});

export const MessagesReducer = MessagesSlice.reducer;