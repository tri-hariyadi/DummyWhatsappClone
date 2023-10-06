import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AppStackParamList} from 'routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useDispatch, useSelector} from 'react-redux';
// import {decrement, increment, incrementAsync, selectCount} from 'store/reducers/counterSlice';

import {ThunkDispatch} from 'redux-thunk';

import {HeaderProfile, InputBox, ListChat} from 'parts';
import {ChatBackground} from 'assets/images';
import {DataChating, IChatting, addChat, selectChatting, selectChattingById} from 'store/reducers/chatingSlice';
import {getChatting} from 'services/chattingService';
import {InputChatRefType} from 'parts/InputBox';
import {IContact, selectContactById} from 'store/reducers/contactSlice';
import {IListChatRef} from 'parts/ListChat';

const ChatRoom = () => {
    const listChatRef = React.useRef<IListChatRef>(null);
    const inputRef = React.useRef<InputChatRefType>(null);
    const searchRef = React.useRef<InputChatRefType>(null);
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const {params} = useRoute<RouteProp<AppStackParamList, 'ChatRoom'>>();
    const chattings = useSelector(selectChatting);
    const chatting = useSelector((state: IChatting) => selectChattingById(state, params.chatID as string));
    const allChat = useSelector(selectChatting);
    const user = useSelector((state: IContact) => selectContactById(state, 'id1'));
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const [dataChatting, setDataChatting] = useState(chatting);

    useEffect(() => {
        const getData = () => {
            if (allChat.data.length) return;
            dispatch(getChatting());
        };

        getData();
    }, []);

    useEffect(() => {
        if (params.search) {
            searchRef.current?.focus();
            listChatRef.current?.scrollToEnd();
        }
    }, [params.search]);

    useEffect(() => {
        if (chatting) {
            setDataChatting(chatting);
        }
    }, [chatting]);

    const sendMessage = useCallback(() => {
        const today = new Date();
        dispatch(
            addChat({
                chatContent: inputRef.current?.target.value,
                chatID: chatting?.chatID,
                date: today.toISOString(),
                sentBy: user?.uid,
            }),
        );
        inputRef.current?.clear();
    }, []);

    const handleSearchChat = useCallback(() => {
        const key = searchRef.current?.target.value;
        const dataFiltered: DataChating = {
            chatID: chatting?.chatID as string,
            allChat: [],
        };

        if (chatting?.allChat && key) {
            chatting.allChat.forEach(item => {
                if (item.chatContent.toLowerCase().includes(key.toLowerCase())) {
                    dataFiltered.allChat.push(item);
                }
            });
            setDataChatting(dataFiltered);
        }
    }, []);

    const handleClearSearch = useCallback(() => {
        setDataChatting(chatting);
        navigation.setParams({search: false});
    }, []);

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}>
            <ImageBackground source={ChatBackground} style={styles.container}>
                <HeaderProfile
                    nameProfile={params.patnerName}
                    imgUri={params.image_url}
                    onPressProfile={() =>
                        navigation.navigate('DetailContact', {
                            id: params.idPartner,
                            isGroup: params.isGroup,
                            chatID: params.chatID,
                        })
                    }
                    isGroup={params.isGroup}
                    isLoading={chattings.loading}
                />
                {params.search && (
                    <InputBox
                        ref={searchRef}
                        isSearchBox
                        onSendMessage={handleSearchChat}
                        onClearSearch={handleClearSearch}
                    />
                )}
                <ListChat ref={listChatRef} data={params.search ? dataChatting : chatting} />
                <InputBox ref={inputRef} onSendMessage={sendMessage} />
                {/* <Text>{count}</Text>
            <Button
                onPress={() =>
                    setTimeout(() => {
                        dispatch(increment());
                    }, 1000)
                }>
                +
            </Button>
            <Button onPress={() => dispatch(decrement())}>-</Button>
            <Button onPress={() => incrementAsync(1)(dispatch)}>Async Increment</Button> */}
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default ChatRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
