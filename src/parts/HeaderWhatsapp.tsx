import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {Row, Text, Button, Gap} from 'components';
import {IcType} from 'components/Icon';

import {padding, dimens, rounded} from 'utils/mixins';
import {colors} from 'utils';
import normalizeDimens from 'utils/normalizeDimens';

type IProps = {
    onPressSearch?: () => void;
    isLoading?: boolean;
};

const HeaderWhatsapp: React.FC<IProps> = ({onPressSearch, isLoading}) => {
    return (
        <View style={styles.container}>
            <Row justifyBetween itemsCenter>
                <Text font="semi-bold" size={20} color={colors.white}>
                    WhatsApp
                </Text>
                <Row justifyBetween itemsCenter>
                    <Button
                        iconType={IcType.io}
                        iconName="camera-outline"
                        iconSize={28}
                        iconColor={colors.white}
                        containerStyle={styles.btn}
                        background={'transparent'}
                    />
                    <Button
                        iconType={IcType.io}
                        iconName="search"
                        iconSize={24}
                        iconColor={colors.white}
                        containerStyle={styles.btn}
                        background={'transparent'}
                        onPress={onPressSearch}
                    />
                </Row>
            </Row>
            {isLoading && (
                <>
                    <Gap height={12} />
                    <Row justifyCenter itemsCenter>
                        <ActivityIndicator color={colors.white} size={normalizeDimens(22)} />
                        <Gap width={8} />
                        <Text color={colors.white}>Connecting to the network</Text>
                    </Row>
                </>
            )}
        </View>
    );
};

export default HeaderWhatsapp;

const styles = StyleSheet.create({
    container: {
        ...padding(16, 16, 10),
        backgroundColor: colors.primary,
    },
    btn: {
        ...dimens(50),
        ...rounded(50 / 2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
});
