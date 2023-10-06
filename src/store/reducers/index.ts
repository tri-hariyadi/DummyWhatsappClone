import {combineReducers} from 'redux';
import counterReducer from './counterSlice';
import messageSlice from './messageSlice';
import contactSlice from './contactSlice';
import chattingSlice from './chatingSlice';
import groupChatSlice from './groupChatSlice';
import chattingGroupSlice from './chattingGroupSlice';

const reducers = combineReducers({
    counter: counterReducer,
    messages: messageSlice,
    contact: contactSlice,
    chatting: chattingSlice,
    groupChat: groupChatSlice,
    chattingGroup: chattingGroupSlice,
});

export interface IResponse<T> {
    data: T;
    loading: boolean;
    error: string;
}

export default reducers;
