import {createSlice} from '@reduxjs/toolkit';
import {IResponse} from '.';
import {getGroupChat} from 'services/groupChatService';

export type IGroupListMessage = {
    id: string;
    chatId: string;
    group_name: string;
    lastMessage: string;
    image_url: string;
    timestamp: string;
};

type State = IResponse<Array<IGroupListMessage>>;

export type IGroupChat = {
    groupChat: State;
};

const initialState: State = {
    data: [],
    loading: false,
    error: '',
};

const groupChatSlice = createSlice({
    name: 'groupChat',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getGroupChat.pending, state => {
            state.loading = true;
        });
        builder.addCase(getGroupChat.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload.data.result;
        });
        builder.addCase(getGroupChat.rejected, state => {
            state.loading = false;
            state.data = [];
            state.error = 'Opps something went wrong';
        });
    },
});

export const selectGroupChat = (state: IGroupChat) => state.groupChat;
export const selectGroupChatById = (state: IGroupChat, id: string) => {
    if (state.groupChat.data?.length) {
        return state.groupChat.data?.find(chat => chat.id === id);
    }
    return undefined;
};

export default groupChatSlice.reducer;
