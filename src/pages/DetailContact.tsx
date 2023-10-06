import React, {useMemo} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {Header, ListMenu} from 'parts';
import {Button, Gap, Icon, ProgressiveImage, Row, Text} from 'components';
import {IcType} from 'components/Icon';
import {IContact, selectContact, selectContactById} from 'store/reducers/contactSlice';
import {IGroupChat, selectGroupChat, selectGroupChatById} from 'store/reducers/groupChatSlice';

import {dimens, padding, rounded} from 'utils/mixins';
import {colors} from 'utils';

import {ListMenuType} from 'parts/ListMenu';
import {AppStackParamList} from 'routes';
import normalizeDimens from 'utils/normalizeDimens';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChatGroupBg} from 'assets/images';

const listMenu: ListMenuType = [
    {
        icon: {
            type: IcType.mi,
            name: 'perm-media',
            background: colors.B400,
        },
        menuName: 'Media, Links, and Docs',
    },
    {
        icon: {
            type: IcType.fa,
            name: 'star',
            background: '#FEB449',
        },
        menuName: 'Starred Messages',
    },
];

const listMenu2: ListMenuType = [
    {
        icon: {
            type: IcType.oi,
            name: 'unmute',
            background: colors.teal,
        },
        menuName: 'Mute',
    },
    {
        icon: {
            type: IcType.mci,
            name: 'react',
            background: 'rgb(244 114 182)',
        },
        menuName: 'Wallpaper & Sound',
    },
    {
        icon: {
            type: IcType.mi,
            name: 'save-alt',
            background: '#FEB449',
        },
        menuName: 'Save to Camera Roll',
    },
];

const listMenu3: ListMenuType = [
    {
        icon: {
            type: IcType.fa,
            name: 'lock',
            background: colors.B400,
        },
        menuName: 'Encryption',
    },
    {
        icon: {
            type: IcType.oi,
            name: 'clock',
            background: colors.B400,
        },
        menuName: 'Disappearing Messages',
    },
    {
        icon: {
            type: IcType.mi,
            name: 'chat',
            background: colors.B400,
        },
        menuName: 'Chat Lock',
    },
];

const DetailContact = () => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const {params} = useRoute<RouteProp<AppStackParamList, 'DetailContact'>>();
    const user = useSelector((state: IContact) => selectContactById(state, params.id as string));
    const users = useSelector(selectContact);
    const group = useSelector((state: IGroupChat) => selectGroupChatById(state, params.id as string));
    const groups = useSelector(selectGroupChat);

    const listGroup = useMemo(() => {
        const data = groups.data.filter(item => user?.group.includes(item.id));
        return data.map(item => ({
            icon: {img_uri: item.image_url},
            menuName: item.group_name,
        }));
    }, [group, user]);

    const listUser = useMemo(() => {
        const data = users.data.filter(item => item.group.includes(group?.id as string));
        return data.map(item => ({
            icon: {img_uri: item.image_url},
            menuName: item.name,
        }));
    }, [group, user]);

    const handleSearch = () => {
        if (params.isGroup) {
            return navigation.navigate('ChatGroupRoom', {
                chatId: group?.chatId as string,
                id: group?.id as string,
                isGroup: true,
                search: true,
            });
        }
        navigation.navigate('ChatRoom', {
            chatID: params.chatID,
            image_url: user?.image_url,
            patnerName: user?.name,
            isGroup: params.isGroup,
            search: true,
            idPartner: params.id,
        });
    };

    return (
        <View style={{flex: 1, backgroundColor: colors.bgDetail}}>
            <Header
                title={params.isGroup ? 'Group Info' : 'Contact Info'}
                style={{backgroundColor: 'transparent'}}
                underlineOpacity={animatedValue}
            />
            <Animated.ScrollView
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: animatedValue}}}], //jdebdjwebdbewdbew
                    {useNativeDriver: true},
                )}>
                <Gap height={20} />
                <View style={styles.headerDeatail}>
                    <ProgressiveImage
                        source={
                            params.isGroup && !group?.image_url
                                ? ChatGroupBg
                                : {uri: params.isGroup ? group?.image_url : user?.image_url}
                        }
                        style={styles.image}
                    />
                    <Gap height={16} />
                    <Text font="bold" size={25}>
                        {params.isGroup ? group?.group_name : user?.name}
                    </Text>
                    {!params.isGroup && <Text>{user?.phone}</Text>}
                    <Gap height={20} />
                    <Row justifyBetween style={{gap: 20}}>
                        <Button background={colors.white} containerStyle={styles.btnFunction}>
                            <View style={{alignItems: 'center'}}>
                                <Icon type={IcType.fa} name="phone" size={23} color={colors.B400} />
                                <Gap height={5} />
                                <Text font="medium" color={colors.B400} size={12}>
                                    audio
                                </Text>
                            </View>
                        </Button>
                        <Button background={colors.white} containerStyle={styles.btnFunction}>
                            <View style={{alignItems: 'center'}}>
                                <Icon type={IcType.fa} name="video-camera" size={23} color={colors.B400} />
                                <Gap height={5} />
                                <Text font="medium" color={colors.B400} size={12}>
                                    video
                                </Text>
                            </View>
                        </Button>
                        <Button background={colors.white} containerStyle={styles.btnFunction} onPress={handleSearch}>
                            <View style={{alignItems: 'center'}}>
                                <Icon type={IcType.fa5} name="search" size={22} color={colors.B400} />
                                <Gap height={5} />
                                <Text font="medium" color={colors.B400} size={12}>
                                    search
                                </Text>
                            </View>
                        </Button>
                    </Row>
                </View>
                <View style={{...padding(16)}}>
                    <ListMenu listMenu={listMenu} />
                    <Gap height={25} />
                    <ListMenu listMenu={listMenu2} />
                    <Gap height={25} />
                    <ListMenu listMenu={listMenu3} />
                    <Gap height={25} />
                    {listGroup.length && !params.isGroup ? (
                        <>
                            <Text font="medium" size={18}>{`${user?.group.length} Groups in Common`}</Text>
                            <Gap height={12} />
                            <ListMenu listMenu={listGroup} />
                        </>
                    ) : (
                        <>
                            <Text font="medium" size={18}>{`${listUser.length} People in Common`}</Text>
                            <Gap height={12} />
                            <ListMenu listMenu={listUser} />
                        </>
                    )}
                </View>
                <Gap height={30} />
            </Animated.ScrollView>
        </View>
    );
};

export default DetailContact;

const styles = StyleSheet.create({
    headerDeatail: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        ...dimens(120),
        ...rounded(120 / 2),
    },
    btnFunction: {
        paddingHorizontal: normalizeDimens(30),
    },
});
