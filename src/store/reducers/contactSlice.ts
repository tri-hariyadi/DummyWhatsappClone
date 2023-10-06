import {createSlice} from '@reduxjs/toolkit';
import {getContact} from 'services/contactService';
import {IResponse} from '.';

export type DataContact = {
    uid: string;
    name: string;
    phone: string;
    image_url: string;
    group: string;
};

export type IContact = {
    contact: IResponse<Array<DataContact>>;
};

export const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        data: [],
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getContact.pending, state => {
            state.loading = true;
        });
        builder.addCase(getContact.fulfilled, (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = action.payload.data.result;
        });
        builder.addCase(getContact.rejected, state => {
            state.loading = false;
            state.data = [];
            state.error = 'Opps something went wrong';
        });
    },
});

export const selectContact = (state: IContact) => state.contact;
export const selectContactById = (state: IContact, uid: string) => {
    if (state.contact.data?.length) {
        return state.contact.data?.find(chat => chat.uid === uid);
    }
    return undefined;
};

export default contactSlice.reducer;
