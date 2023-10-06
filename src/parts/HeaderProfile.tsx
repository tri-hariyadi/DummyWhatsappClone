import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {IcType} from 'components/Icon';
import {Button, Gap, ProgressiveImage, Row, Text} from 'components';

import {colors} from 'utils';

import {dimens, rounded} from 'utils/mixins';
import {useNavigation} from '@react-navigation/native';
import {ChatGroupBg} from 'assets/images';
import normalizeDimens from 'utils/normalizeDimens';

type IProps = {
    onPressProfile?: () => void;
    nameProfile?: string;
    imgUri?: string;
    isGroup?: boolean;
    isLoading?: boolean;
};

const HeaderProfile: React.FC<IProps> = ({nameProfile, imgUri, onPressProfile, isGroup, isLoading}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Row itemsCenter>
                <Button
                    background={colors.white}
                    containerStyle={styles.btnBack}
                    iconType={IcType.ei}
                    iconName="chevron-left"
                    iconSize={30}
                    iconColor={colors.B400}
                    onPress={() => navigation.goBack()}
                />
                <View style={{flex: 1}}>
                    <Button isBlock containerStyle={styles.btn} background={colors.white} onPress={onPressProfile}>
                        <Row itemsCenter>
                            <ProgressiveImage
                                source={!imgUri && isGroup ? ChatGroupBg : {uri: imgUri}}
                                style={styles.imgProfile}
                            />
                            <Gap width={10} />
                            <Text font="medium">{nameProfile}</Text>
                        </Row>
                    </Button>
                </View>
                <Row>
                    <Button
                        background={colors.white}
                        iconType={IcType.fi}
                        iconName="video"
                        iconSize={23}
                        iconColor={colors.B400}
                        containerStyle={styles.btnBack}
                    />
                    <Button
                        background={colors.white}
                        iconType={IcType.fi}
                        iconName="phone-call"
                        iconSize={23}
                        iconColor={colors.B400}
                        containerStyle={styles.btnBack}
                    />
                    <Gap width={10} />
                </Row>
            </Row>
            {isLoading && (
                <>
                    <Gap height={8} />
                    <Row justifyCenter itemsCenter>
                        <ActivityIndicator color={colors.B400} size={normalizeDimens(22)} />
                        <Gap width={8} />
                        <Text color={colors.B400}>Connecting to the network</Text>
                    </Row>
                    <Gap height={8} />
                </>
            )}
        </View>
    );
};

export default React.memo(HeaderProfile);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    imgProfile: {
        ...dimens(40),
    },
    btn: {
        ...rounded(0),
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
