import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

export const addMessage = createAsyncThunk(
    'message/add',
    async (messages: FormData) => {
      console.log(messages);
        await axiosApi.post(`messages`, messages);
    });

