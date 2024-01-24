import {createSlice} from '@reduxjs/toolkit';
import {IMessageForm} from "../types";
import {addMessage} from './MessagesThunk';

interface TransactionState {
    messages: IMessageForm[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: TransactionState = {
    messages: [],
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
    }
});

export const MessagesReducer = MessagesSlice.reducer;