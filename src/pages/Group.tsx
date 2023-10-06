import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {HeaderWhatsapp, ListMessage} from 'parts';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {selectGroupChat} from 'store/reducers/groupChatSlice';
import {getGroupChat} from 'services/groupChatService';
import {colors} from 'utils';

const Group = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const groupChat = useSelector(selectGroupChat);

    useEffect(() => {
        dispatch(getGroupChat());
    }, []);

    return (
        <View style={styles.container}>
            <HeaderWhatsapp isLoading={groupChat.loading} />
            <ListMessage data={groupChat.data} navigateToGroupRoom />
        </View>
    );
};

export default Group;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
});
