import React, {useCallback, useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {HeaderProfile, InputBox, ListChat} from 'parts';
import {getChattingGroup} from 'services/groupChatService';
import {ChatBackground} from 'assets/images';
import {
    IChattingGroup,
    IDataChattingGroup,
    addChatGroup,
    selectChattingGroup,
    selectChattingGroupById,
} from 'store/reducers/chattingGroupSlice';
import {IGroupChat, selectGroupChatById} from 'store/reducers/groupChatSlice';

//Interface and Types
import {AppStackParamList} from 'routes';
import {ThunkDispatch} from 'redux-thunk';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {InputChatRefType} from 'parts/InputBox';
import {IContact, selectContactById} from 'store/reducers/contactSlice';

const ChatGroupRoom = () => {
    const inputRef = React.useRef<InputChatRefType>(null);
    const searchRef = React.useRef<InputChatRefType>(null);

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const {params} = useRoute<RouteProp<AppStackParamList, 'ChatGroupRoom'>>();
    const allChatGroup = useSelector(selectChattingGroup);
    const chattingGroup = useSelector((state: IChattingGroup) => selectChattingGroupById(state, params.chatId));
    const group = useSelector((state: IGroupChat) => selectGroupChatById(state, params.id));
    const user = useSelector((state: IContact) => selectContactById(state, 'id1'));

    const [dataChatting, setDataChatting] = useState(chattingGroup);

    useEffect(() => {
        const getData = () => {
            if (allChatGroup.data.length) return;
            dispatch(getChattingGroup());
        };

        getData();
    }, []);

    useEffect(() => {
        if (params.search) {
            searchRef.current?.focus();
        }
    }, [params.search]);

    const sendMessage = useCallback(() => {
        const today = new Date();
        dispatch(
            addChatGroup({
                chatContent: inputRef.current?.target.value,
                chatID: chattingGroup?.chatID,
                date: today.toISOString(),
                sentBy: user?.uid,
            }),
        );
        inputRef.current?.clear();
    }, []);

    const handleSearchChat = useCallback(() => {
        const key = searchRef.current?.target.value;
        const dataFiltered: IDataChattingGroup = {
            chatID: chattingGroup?.chatID as string,
            allChat: [],
        };

        if (chattingGroup?.allChat && key) {
            chattingGroup.allChat.forEach(item => {
                if (item.chatContent.toLowerCase().includes(key.toLowerCase())) {
                    dataFiltered.allChat.push(item);
                }
            });
            setDataChatting(dataFiltered);
        }
    }, [chattingGroup]);

    const handleClearSearch = useCallback(() => {
        setDataChatting(chattingGroup);
        navigation.setParams({search: false});
    }, []);

    return (
        <ImageBackground source={ChatBackground} style={styles.container}>
            <View style={styles.container}>
                <HeaderProfile
                    nameProfile={group?.group_name}
                    imgUri={group?.image_url}
                    onPressProfile={() =>
                        navigation.navigate('DetailContact', {
                            id: params.id,
                            isGroup: params.isGroup,
                            chatID: params.chatId,
                        })
                    }
                    isGroup={params.isGroup}
                    isLoading={allChatGroup.loading}
                />
                {params.search && (
                    <InputBox
                        ref={searchRef}
                        isSearchBox
                        onSendMessage={handleSearchChat}
                        onClearSearch={handleClearSearch}
                    />
                )}
                <ListChat data={params.search ? dataChatting : chattingGroup} isGroup={params.isGroup} />
                <InputBox ref={inputRef} onSendMessage={sendMessage} />
            </View>
        </ImageBackground>
    );
};

export default ChatGroupRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
