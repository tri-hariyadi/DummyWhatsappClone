import {createSlice} from '@reduxjs/toolkit';
import {getChatting} from 'services/chattingService';

export type ChattingContentType = {
    date: string;
    sentBy: string;
    chatContent: string;
    reaction?: string;
};

export type DataChating = {
    chatID: string;
    // allChat: {
    //     [key: string]: Array<ChattingContentType>;
    // };
    allChat: Array<ChattingContentType>;
};

type State = {
    data: Array<DataChating>;
    loading: boolean;
    error: string;
};

export type IChatting = {
    chatting: State;
};

const initialState: State = {
    data: [],
    loading: false,
    error: '',
};

export const chattingSlice = createSlice({
    name: 'chatting',
    initialState: initialState,
    reducers: {
        addChat: (state, action) => {
            const data = state.data.find(chat => chat.chatID === action.payload.chatID);
            if (data?.allChat) {
                data.allChat.push({
                    chatContent: action.payload.chatContent,
                    date: action.payload.date,
                    sentBy: action.payload.sentBy,
                });
            }
        },
        addReactionToChat: (state, action) => {
            const data = state.data.find(chat => chat.chatID === action.payload.chatID);
            if (data?.allChat) {
                data.allChat.forEach((item, idx) => {
                    if (new Date(item.date).getMilliseconds() === new Date(action.payload.date).getMilliseconds()) {
                        data.allChat[idx] = {...data.allChat[idx], reaction: action.payload.reaction};
                    }
                });
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getChatting.pending, state => {
            state.loading = true;
        });
        builder.addCase(getChatting.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload.data.result;
        });
        builder.addCase(getChatting.rejected, state => {
            state.loading = false;
            state.data = [];
            state.error = 'Opps something went wrong';
        });
    },
});

export const {addChat, addReactionToChat} = chattingSlice.actions;

export const selectChatting = (state: IChatting) => state.chatting;
export const selectChattingById = (state: IChatting, chatID: string) => {
    if (state.chatting.data?.length) {
        return state.chatting.data?.find(chat => chat.chatID === chatID);
    }
    return undefined;
};

export default chattingSlice.reducer;
