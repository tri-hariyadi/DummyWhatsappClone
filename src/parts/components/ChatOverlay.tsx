import React, {useState, useImperativeHandle} from 'react';
import {
    ImageBackground,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';

import {Button, Emoji, Gap, ProgressiveImage, Row, Text} from 'components';
import {colors, helpers} from 'utils';
import {dimens, margin, padding, rounded} from 'utils/mixins';
import {ChatType} from 'parts/ListChat';
import {OverlayChat} from 'assets/images';
import {IcType} from 'components/Icon';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {addReactionToChat} from 'store/reducers/chatingSlice';
import {addReactionToChatGroup} from 'store/reducers/chattingGroupSlice';
import BottomSheet, {BottomSheetRefType} from 'components/BottomSheet';

type IProps = {
    chat: {
        current: (ChatType & {img_group?: string; member_name?: string}) | undefined;
    };
    bubbleStyle: (_id: string) => ViewStyle;
    isGroup?: boolean;
};

export type ChatOverlayRefType = {
    show: () => void;
    dismiss: () => void;
};

const startingEmoji = ['👍', '❤️', '😂', '😲', '😥', '🙏'];

const ChatOverlay = React.forwardRef<ChatOverlayRefType, IProps>(({chat, bubbleStyle, isGroup}, ref) => {
    const btSheet = React.useRef<BottomSheetRefType>(null);
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // const messages = useSelector(selectMessages);

    const handleReaction = (emoji: string) => {
        if (isGroup) {
            dispatch(
                addReactionToChatGroup({
                    reaction: emoji,
                    date: chat?.current?.date,
                    chatID: chat?.current?.chatID,
                }),
            );
        } else {
            dispatch(
                addReactionToChat({
                    reaction: emoji,
                    date: chat?.current?.date,
                    chatID: chat?.current?.chatID,
                }),
            );
        }
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        dismiss: () => setVisible(false),
        show: () => setVisible(true),
    }));

    return (
        <>
            <Modal animationType="fade" visible={visible} transparent onRequestClose={() => setVisible(false)}>
                <ImageBackground
                    source={OverlayChat}
                    resizeMode="cover"
                    style={{flex: 1}}
                    blurRadius={15}
                    imageStyle={{opacity: 0.9}}
                />
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={styles.container} />
                    </TouchableWithoutFeedback>
                    <View style={{...bubbleStyle(chat?.current?.sentBy as string), backgroundColor: 'transparent'}}>
                        <Row justifyCenter itemsCenter style={styles.emojiWrapper}>
                            {startingEmoji.map((emoji, idx) => (
                                <TouchableOpacity
                                    key={`starting-emoji-${idx}`}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.overlayEmoji,
                                        chat?.current?.reaction === emoji ? {backgroundColor: colors.N40} : {},
                                    ]}
                                    onPress={() => handleReaction(emoji)}>
                                    <Text size={18}>{emoji}</Text>
                                </TouchableOpacity>
                            ))}
                            <Gap width={8} />
                            <Button
                                iconType={IcType.oi}
                                iconName="plus"
                                iconSize={20}
                                iconColor={colors.N100}
                                background={colors.progressiveImageBg}
                                containerStyle={styles.btnIcon}
                                // onPress={() => btSheet.current?.show()}
                            />
                        </Row>
                        <Gap height={10} />
                        {/* <View style={[styles.chatBubble, {...bubbleStyle(chat?.current?.sentBy as string)}]}>
                            <Text>{chat?.current?.chatContent}</Text>
                            <Gap height={5} />
                            <Text size={11} color={colors.N40} style={styles.textTime}>
                                {helpers.getTime(chat?.current?.date as string)}
                            </Text>
                        </View> */}
                        <Row
                            itemsEnd
                            style={{
                                ...bubbleStyle(chat.current?.sentBy || ''),
                                backgroundColor: 'transparent',
                            }}>
                            {isGroup && chat?.current?.member_name && (
                                <ProgressiveImage source={{uri: chat?.current?.img_group}} style={styles.avatar} />
                            )}
                            <View style={{flex: 1}}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={[styles.chatBubble, {...bubbleStyle(chat?.current?.sentBy || '')}]}>
                                    {chat?.current?.member_name && isGroup && (
                                        <Text
                                            font="medium"
                                            size={12}
                                            color={colors.primary}
                                            style={{marginBottom: 2}}>{`~${chat?.current?.member_name}`}</Text>
                                    )}
                                    <Text>{chat?.current?.chatContent}</Text>
                                    <Gap width={10} />
                                    <Text size={11} color={colors.N40} style={{alignSelf: 'flex-end'}}>
                                        {helpers.getTime(chat?.current?.date || '')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Row>
                    </View>
                </View>
            </Modal>
            <BottomSheet ref={btSheet} textHeader="Select Emoji">
                <Emoji />
            </BottomSheet>
        </>
    );
});

export default ChatOverlay;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        ...padding(16),
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
    },
    chatBubble: {
        backgroundColor: colors.G100,
        alignSelf: 'baseline',
        ...padding(6, 10),
        ...rounded(12, 12, 12, 0),
        ...margin(0, 0, 16),
        maxWidth: '80%',
    },
    textTime: {
        alignSelf: 'flex-end',
    },
    emojiWrapper: {
        ...padding(12),
        ...rounded(100),
        backgroundColor: 'white',
    },
    btnIcon: {
        ...dimens(32),
        ...rounded(32 / 2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    overlayEmoji: {
        ...dimens(36),
        ...rounded(36 / 2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        ...dimens(35),
        ...rounded(35 / 2),
        ...margin(2, 7, 0, 0),
    },
});
