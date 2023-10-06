import {createSlice} from '@reduxjs/toolkit';
import {DataChating} from './chatingSlice';
import {IResponse} from '.';
import {getChattingGroup} from 'services/groupChatService';

export type IDataChattingGroup = DataChating;

type State = IResponse<Array<IDataChattingGroup>>;

export type IChattingGroup = {
    chattingGroup: State;
};

const initialState: State = {
    data: [],
    loading: false,
    error: '',
};

const chattingGroupSlice = createSlice({
    name: 'chattingGroup',
    initialState: initialState,
    reducers: {
        addChatGroup: (state, action) => {
            const data = state.data.find(chat => chat.chatID === action.payload.chatID);
            if (data?.allChat) {
                if (data?.allChat) {
                    data.allChat.push({
                        chatContent: action.payload.chatContent,
                        date: action.payload.date,
                        sentBy: action.payload.sentBy,
                    });
                }
            }
        },
        addReactionToChatGroup: (state, action) => {
            const data = state.data.find(chat => chat.chatID === action.payload.chatID);
            if (data?.allChat) {
                data.allChat.forEach((item, idx) => {
                    if (new Date(item.date).getMilliseconds() === new Date(action.payload.date).getMilliseconds()) {
                        if (data.allChat[idx].reaction === action.payload.reaction) {
                            data.allChat[idx] = {...data.allChat[idx], reaction: ''};
                        } else {
                            data.allChat[idx] = {...data.allChat[idx], reaction: action.payload.reaction};
                        }
                    }
                });
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(getChattingGroup.pending, state => {
            state.loading = true;
        });
        builder.addCase(getChattingGroup.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload.data.result;
        });
        builder.addCase(getChattingGroup.rejected, state => {
            state.loading = false;
            state.data = [];
            state.error = 'Opps something went wrong';
        });
    },
});

export const {addChatGroup, addReactionToChatGroup} = chattingGroupSlice.actions;

export const selectChattingGroup = (state: IChattingGroup) => state.chattingGroup;
export const selectChattingGroupById = (state: IChattingGroup, chatId: string) => {
    if (state.chattingGroup.data?.length) {
        return state.chattingGroup.data?.find(chat => chat.chatID === chatId);
    }
    return undefined;
};

export default chattingGroupSlice.reducer;
