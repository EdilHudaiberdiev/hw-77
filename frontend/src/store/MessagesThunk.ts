import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

export const addMessage = createAsyncThunk(
    'message/add',
    async (messages: FormData) => {
      console.log(messages);
        await axiosApi.post(`messages`, messages);
    });

export const getMessages = createAsyncThunk(
  'message/get',
  async () => {
    const response = await axiosApi.get('messages');
    return response.data ?? [];
  });

export const getMessagesByDateTime = createAsyncThunk(
  'messages/get-by-datetime',
  async (date: string) => {
    const response = await axiosApi.get(`messages?datetime=${date}`);
    return response.data ?? [];
  });

