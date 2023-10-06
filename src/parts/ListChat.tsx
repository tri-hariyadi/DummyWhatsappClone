import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';

import {Gap, ProgressiveImage, Row, Text} from 'components';
import {colors, helpers} from 'utils';
import {dimens, margin, padding, rounded} from 'utils/mixins';
import ChatOverlay, {ChatOverlayRefType} from './components/ChatOverlay';
import {selectContact} from 'store/reducers/contactSlice';
import useUpdateEffect from 'utils/hooks/useUpdateEffect';

export type IListChatRef = {
    scrollToEnd: () => void;
};

export type ChatType = {
    date: string;
    sentBy: string;
    chatContent: string;
    chatID?: string;
    reaction?: string;
};

type DataChat = {
    chatID: string;
    allChat: Array<ChatType>;
};

type Props = {
    data?: DataChat;
    isGroup?: boolean;
    onLongPress?: () => void;
};

const ListChat = React.forwardRef<IListChatRef, Props>(({data, isGroup}, ref) => {
    const listChatRef = React.useRef<FlatList>(null);
    const overlayChatRef = useRef<ChatOverlayRefType>(null);
    const dataChat = useRef<(ChatType & {img_group?: string; member_name?: string}) | undefined>();
    const user = useSelector(selectContact);

    const [offset, setOffset] = useState(1);
    const [dataSource, setDataSource] = useState<Array<ChatType> | undefined>([]);
    const num = useRef(100);
    const initialLoadNumber = useRef(40);
    const dataUpdated = useRef(0);

    const windowSize = React.useMemo(
        () => ((data?.allChat.length as number) > 50 ? (data?.allChat.length as number) / 4 : 21),
        [data],
    );

    useUpdateEffect(() => {
        if ((data?.allChat.length as number) > dataUpdated.current) {
            dataUpdated.current = data?.allChat.length as number;
            if (dataSource?.length) {
                setDataSource(data?.allChat);
            }
        }
    }, [data]);

    useEffect(() => {
        if ((dataSource?.length as number) < (data?.allChat.length as number)) {
            if (offset === 1) {
                setDataSource(data?.allChat.slice(0, offset * initialLoadNumber.current));
                dataUpdated.current = data?.allChat.length as number;
            }
        }
    }, [data]);

    const getData = () => {
        if ((dataSource?.length as number) < (data?.allChat.length as number) && data?.allChat.length !== 0) {
            setOffset(prev => prev + 1);
            setDataSource(data?.allChat.slice(0, offset * num.current));
        }
    };

    React.useImperativeHandle(ref, () => ({
        scrollToEnd: () => listChatRef.current?.scrollToEnd({animated: false}),
    }));

    const bubbleStyle = useCallback((id: string) => {
        const style: ViewStyle = {};
        const isMe = id === user.data[0].uid;

        if (isMe) {
            style.alignSelf = 'flex-end';
            return style;
        }

        style.alignSelf = 'flex-start';
        style.backgroundColor = colors.white;

        return {...style, ...rounded(12, 12, 0, 12)};
    }, []);

    const dayTitle = useCallback((item: string) => {
        const today = new Date();
        if (today.getDate() === new Date(item).getDate()) {
            return 'Today';
        }

        if (new Date(item).getDate() === today.getDate() - 1) {
            return 'Yesterday';
        }

        if (helpers.isDateInCurrentWeek(item)) {
            return `${helpers.getDay(item)}, ${helpers.getDateMonths(item)}`;
        }

        return helpers.getDateMonths(item, true);
    }, []);

    const renderDateTitle = useCallback(
        (item: ChatType, index: number) => {
            if (index <= 0) {
                return (
                    <>
                        <View style={styles.dayWrapper}>
                            <Text size={13}>{dayTitle(item.date)}</Text>
                        </View>
                        <Gap height={16} />
                    </>
                );
            }

            if (new Date(item.date).getDate() === new Date(data?.allChat?.[index - 1]?.date || 0).getDate()) {
                return null;
            }

            return (
                <>
                    <View style={styles.dayWrapper}>
                        <Text size={13}>{dayTitle(item.date)}</Text>
                    </View>
                    <Gap height={16} />
                </>
            );
        },
        [data],
    );

    const renderItem = useCallback(
        ({item, index}: {item: ChatType; index: number}) => {
            const a = user.data.find(dataUser => dataUser.uid === item.sentBy && dataUser.uid !== 'id1');

            return (
                <>
                    <View>
                        {renderDateTitle(item, index)}
                        <Row
                            key={`chat-content-${index}`}
                            itemsEnd
                            style={{
                                ...bubbleStyle(item.sentBy),
                                ...margin(0, 0, data?.allChat[index]?.reaction ? 32 : 16),
                                backgroundColor: 'transparent',
                            }}>
                            {isGroup && a?.name && (
                                <ProgressiveImage source={{uri: a?.image_url}} style={styles.avatar} />
                            )}
                            <View style={{flex: 1}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onLongPress={() => {
                                        if (data) {
                                            dataChat.current = {
                                                ...data?.allChat[index],
                                                chatID: data?.chatID,
                                                img_group: a?.image_url,
                                                member_name: a?.name,
                                            };
                                            overlayChatRef.current?.show();
                                        }
                                    }}
                                    style={[styles.chatBubble, {...bubbleStyle(item.sentBy)}]}>
                                    {a?.name && isGroup && (
                                        <Text
                                            font="medium"
                                            size={12}
                                            color={colors.primary}
                                            style={{marginBottom: 2}}>{`~${a?.name}`}</Text>
                                    )}
                                    <Text>{item.chatContent}</Text>
                                    <Gap width={10} />
                                    <Text size={11} color={colors.N40} style={{alignSelf: 'flex-end'}}>
                                        {helpers.getTime(item.date)}
                                    </Text>
                                    {data?.allChat[index]?.reaction && (
                                        <View style={styles.emojiWrapp}>
                                            <Text size={17}>{data?.allChat[index]?.reaction}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </Row>
                    </View>
                </>
            );
        },
        [data, dataSource],
    );

    return (
        <>
            <FlatList
                ref={listChatRef}
                data={dataSource}
                keyExtractor={(_item, index) => `chatting-${index}`}
                renderItem={renderItem}
                style={{...padding(10, 16)}}
                initialNumToRender={initialLoadNumber.current}
                windowSize={windowSize}
                maxToRenderPerBatch={num.current}
                updateCellsBatchingPeriod={num.current / 2}
                onEndReachedThreshold={offset < 10 ? offset * (offset === 1 ? 2 : 2) : 20}
                onEndReached={getData}
                removeClippedSubviews={true}
                // onContentSizeChange={() => listChatRef.current?.scrollToEnd({animated: false})}
            />
            <ChatOverlay ref={overlayChatRef} chat={dataChat} bubbleStyle={bubbleStyle} isGroup={isGroup} />
        </>
    );
});

export default React.memo(ListChat, (prevProps, nextProps) => {
    return (
        JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
        Object.keys(prevProps).length !== Object.keys(nextProps).length
    );
});

const styles = StyleSheet.create({
    chatBubble: {
        backgroundColor: colors.G100,
        alignSelf: 'baseline',
        ...padding(6, 10),
        ...rounded(12, 12, 12, 0),
        maxWidth: '80%',
        minWidth: '22%',
    },
    dayWrapper: {
        ...padding(5, 9),
        ...rounded(12),
        backgroundColor: colors.B40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 4,
    },
    emojiWrapp: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        ...padding(0, 8),
        ...margin(-6, 8, 0, 0),
        borderWidth: 1,
        borderColor: colors.N40,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -20,
        right: 1,
    },
    avatar: {
        ...dimens(35),
        ...rounded(35 / 2),
        ...margin(2, 7, 0, 0),
    },
});
