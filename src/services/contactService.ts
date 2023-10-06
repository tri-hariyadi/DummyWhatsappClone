import {createAsyncThunk} from '@reduxjs/toolkit';
import httpRequest from './axiosConfig';

export const getContact = createAsyncThunk('messages/fetchUser', async () => {
    const resp = await httpRequest.get('users');
    return resp;
});
