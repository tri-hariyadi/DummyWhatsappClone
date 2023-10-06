import {createSlice} from '@reduxjs/toolkit';
import {getMessageList} from 'services/messageService';
import {DataContact} from './contactSlice';

import {DataList} from 'parts/ListMessage';

type DataMessage = {
    chatId: string;
    idPartner: string;
    lastMessage: string;
    timestamp: string;
} & DataList;

type IMessage = {
    messages: {
        data: Array<DataMessage>;
        loading: boolean;
        error: string;
        filterBy: string;
    };
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        loading: false,
        error: '',
        filterBy: '',
    },
    reducers: {
        getMessages: (state, action) => {
            // state.data = state.data?.concat(action.payload);
            return (state = {
                ...state,
                data: action.payload,
            });
        },
        searchMessage: (state, action) => {
            state.filterBy = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getMessageList.pending, state => {
            state.loading = true;
        });
        builder.addCase(getMessageList.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            if (action.payload[1].data.status === 200) {
                const data = action.payload[1].data.result.map((item: DataMessage) => {
                    const contact = action.payload[0].data.result.filter(
                        (c: DataContact) => c.uid === item.idPartner,
                    )[0];
                    return {
                        ...item,
                        image_url: contact.image_url,
                        patnerName: contact.name,
                    };
                });
                state.data = data;
            }
            // state.data = action.payload.data.result;
        });
        builder.addCase(getMessageList.rejected, state => {
            state.loading = false;
            state.data = [];
            state.error = 'Oops something went wrong';
        });
    },
});

export const {getMessages, searchMessage} = messagesSlice.actions;

export const selectMessages = (state: IMessage) => state.messages;

export default messagesSlice.reducer;
