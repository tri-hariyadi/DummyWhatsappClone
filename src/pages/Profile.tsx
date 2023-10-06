import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

import {HeaderWhatsapp, ListMenu} from 'parts';
import {Button, Gap, ProgressiveImage, Row, Text} from 'components';
import {IContact, selectContactById} from 'store/reducers/contactSlice';
import {colors} from 'utils';
import {dimens, padding, rounded} from 'utils/mixins';
import {IcType} from 'components/Icon';
import {ListMenuType} from 'parts/ListMenu';

const listMenu: ListMenuType = [
    {
        icon: {
            type: IcType.fa,
            name: 'star',
            background: '#FEB449',
        },
        menuName: 'Starred Messages',
    },
    {
        icon: {
            type: IcType.fa5,
            name: 'laptop',
            background: colors.primary,
        },
        menuName: 'Linked Device',
    },
];

const listMenu2: ListMenuType = [
    {
        icon: {
            type: IcType.mi,
            name: 'vpn-key',
            background: colors.B400,
        },
        menuName: 'Acount',
    },
    {
        icon: {
            type: IcType.fa,
            name: 'lock',
            background: '#2DAFFD',
        },
        menuName: 'Privacy',
    },
    {
        icon: {
            type: IcType.fa,
            name: 'whatsapp',
            background: 'rgb(132 204 22)',
        },
        menuName: 'Chats',
    },
    {
        icon: {
            type: IcType.ei,
            name: 'notification',
            background: 'rgb(225 29 72)',
        },
        menuName: 'Notivications',
    },
    {
        icon: {
            type: IcType.oi,
            name: 'arrow-switch',
            background: colors.teal,
        },
        menuName: 'Storage and Data',
    },
];

const listMenu3: ListMenuType = [
    {
        icon: {
            type: IcType.ai,
            name: 'info',
            background: colors.B400,
        },
        menuName: 'Help',
    },
    {
        icon: {
            type: IcType.fa,
            name: 'heart',
            background: 'rgb(225 29 72)',
        },
        menuName: 'Tell a Friend',
    },
];

const Profile = () => {
    const user = useSelector((state: IContact) => selectContactById(state, 'id1'));

    return (
        <View style={styles.container}>
            <HeaderWhatsapp />
            <ScrollView>
                <Gap height={20} />
                <View style={{...padding(16)}}>
                    <View style={{backgroundColor: colors.white, ...padding(10), ...rounded(12)}}>
                        <Row itemsCenter>
                            <ProgressiveImage source={{uri: user?.image_url}} style={styles.image} />
                            <Gap width={16} />
                            <View style={{flex: 1}}>
                                <Text font="medium" size={16}>
                                    {user?.name}
                                </Text>
                                <Text size={12}>~Hello i'am using whatsapp</Text>
                            </View>
                            <Button
                                background={colors.bgDetail}
                                iconType={IcType.fa}
                                iconName="qrcode"
                                iconSize={25}
                                iconColor={colors.B400}
                                containerStyle={{paddingHorizontal: 10, paddingVertical: 5}}
                            />
                        </Row>
                        {/* <View>
                            <Icon type={IcType.ai} name="aliwangwang" size={40} color={colors.white} />
                        </View> */}
                    </View>
                    <Gap height={30} />
                    <ListMenu listMenu={listMenu} />
                    <Gap height={30} />
                    <ListMenu listMenu={listMenu2} />
                    <Gap height={30} />
                    <ListMenu listMenu={listMenu3} />
                    <Gap height={30} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgDetail,
    },
    headerDeatail: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        ...dimens(70),
        ...rounded(70 / 2),
    },
});
