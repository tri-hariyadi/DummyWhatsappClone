import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';

//Types and Interface
import {ThunkDispatch} from 'redux-thunk';

import {ListMessage, HeaderWhatsapp, InputBox} from 'parts';
import {searchMessage, selectMessages} from 'store/reducers/messageSlice';
import {getMessageList} from 'services/messageService';
import {getGroupChat} from 'services/groupChatService';
import {colors} from 'utils';
import {InputChatRefType} from 'parts/InputBox';
import useUpdateEffect from 'utils/hooks/useUpdateEffect';

const Chats = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const messages = useSelector(selectMessages);

    const [search, setSearch] = useState(false);
    const searchRef = React.useRef<InputChatRefType>(null);

    useEffect(() => {
        const getData = async () => {
            batch(() => {
                dispatch(getMessageList());
                dispatch(getGroupChat());
            });
        };

        getData();
    }, []);

    const messageList = useMemo(() => {
        if (messages.filterBy === '') return messages.data;
        return messages.data.filter(message => message.patnerName?.toLowerCase()?.includes(messages.filterBy));
    }, [messages]);

    useUpdateEffect(() => {
        if (!search) {
            dispatch(searchMessage(''));
        }
    }, [search]);

    const handleFilter = useCallback(() => {
        const key = searchRef.current?.target.value;
        dispatch(searchMessage(key?.toLowerCase()));
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearch(false);
    }, []);

    return (
        <View style={styles.container}>
            {search ? (
                <InputBox ref={searchRef} isSearchBox onClearSearch={handleClearSearch} onSendMessage={handleFilter} />
            ) : (
                <HeaderWhatsapp
                    isLoading={messages.loading}
                    onPressSearch={() => {
                        setSearch(true);
                        searchRef.current?.focus();
                    }}
                />
            )}
            <ListMessage data={messageList} navigateToGroupRoom={false} />
        </View>
    );
};

export default Chats;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
});
