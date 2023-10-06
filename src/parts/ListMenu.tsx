import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Gap, Icon, ProgressiveImage, Row, Text} from 'components';
import {colors} from 'utils';
import {dimens, padding, rounded} from 'utils/mixins';
import {IcType} from 'components/Icon';

export type ListMenuType = Array<{
    icon: {
        type?: string;
        name?: string;
        background?: string;
        img_uri?: string;
    };
    menuName: string;
    onPressMenu?: () => void;
}>;

type IProps = {
    listMenu?: ListMenuType;
};

const List: React.FC<IProps> = ({listMenu}) => {
    return (
        <View style={styles.container}>
            {listMenu?.map((menu, idx) => (
                <View key={menu.menuName}>
                    <Button isBlock background={colors.white} containerStyle={{borderRadius: 0}}>
                        <Row itemsCenter>
                            {menu.icon.img_uri || menu.icon.img_uri === '' ? (
                                <ProgressiveImage
                                    source={{uri: menu.icon.img_uri || undefined}}
                                    style={styles.avatar}
                                />
                            ) : (
                                <View style={[styles.icContainer, {backgroundColor: menu.icon.background}]}>
                                    <Icon type={menu.icon.type} name={menu.icon.name} size={20} color={colors.white} />
                                </View>
                            )}
                            <Gap width={16} />
                            <View style={{flex: 1}}>
                                <Row flex={1} justifyBetween itemsCenter>
                                    <Text>{menu.menuName}</Text>
                                    <Icon type={IcType.fi} name="chevron-right" size={25} color={colors.N100} />
                                </Row>
                            </View>
                        </Row>
                    </Button>
                    {idx < listMenu.length - 1 ? <View style={styles.separator} /> : null}
                </View>
            ))}
        </View>
    );
};

export default React.memo(List);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        ...rounded(12),
        overflow: 'hidden',
        backgroundColor: colors.white,
    },
    icContainer: {
        backgroundColor: colors.B400,
        ...rounded(10),
        ...padding(8),
        ...dimens(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        width: '82%',
        backgroundColor: colors.N40,
        alignSelf: 'flex-end',
    },
    avatar: {
        ...dimens(38),
        ...rounded(38 / 2),
    },
});
