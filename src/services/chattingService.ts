import {createAsyncThunk} from '@reduxjs/toolkit';
import httpRequest from './axiosConfig';

export const getChatting = createAsyncThunk('messages/fetchChatting', async () => {
    const resp = await httpRequest.get('chattings');
    return resp;
});
