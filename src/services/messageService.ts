import {createAsyncThunk} from '@reduxjs/toolkit';
import httpRequest from './axiosConfig';

export const getMessageList = createAsyncThunk('messages/fetch', async () => {
    const contact = httpRequest.get('users');
    const message = httpRequest.get('messages');
    const resp = await Promise.all([contact, message]);
    return resp;
});
