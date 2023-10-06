import {createAsyncThunk} from '@reduxjs/toolkit';
import httpRequest from './axiosConfig';

export const getGroupChat = createAsyncThunk('messages/fetchGroup', async () => {
    const resp = await httpRequest.get('group');
    return resp;
});

export const getChattingGroup = createAsyncThunk('chattingGroup/fetchChatGroup', async () => {
    const resp = await httpRequest.get('group/chats');
    return resp;
});
