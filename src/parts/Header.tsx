import React from 'react';
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Button, Gap, Row, Text} from 'components';
import {IcType} from 'components/Icon';

import {colors} from 'utils';
import {dimens, padding, rounded} from 'utils/mixins';

type IProps = {
    leftElement?: () => JSX.Element;
    title?: string;
    style?: ViewStyle;
    underlineOpacity?: any;
};

const Header: React.FC<IProps> = ({leftElement, title, style, underlineOpacity}) => {
    const navigation = useNavigation();
    return (
        <View>
            <Row itemsCenter style={[styles.container, style]}>
                <Button
                    background={'transparent'}
                    containerStyle={styles.btnBack}
                    iconType={IcType.ei}
                    iconName="chevron-left"
                    iconSize={30}
                    iconColor={colors.B400}
                    onPress={() => navigation.goBack()}
                />
                <View style={{flex: 1}}>
                    <Text font="semi-bold" color={colors.N400} size={16} style={{textAlign: 'center'}}>
                        {title}
                    </Text>
                </View>
                {React.isValidElement(leftElement) ? null : <Gap width={50} />}
                <View>{React.isValidElement(leftElement) && leftElement()}</View>
            </Row>
            <Animated.View
                style={{width: '100%', height: 1, backgroundColor: colors.N40, opacity: underlineOpacity || 0}}
            />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        ...padding(2, 0, 2),
    },
    btnBack: {
        ...dimens(50),
        ...rounded(50 / 2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
});
