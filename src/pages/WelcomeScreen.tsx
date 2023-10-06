import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Gap, Icon, Text} from 'components';
import {IcType} from 'components/Icon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppStackParamList} from 'routes';

import {colors} from 'utils';
import {padding} from 'utils/mixins';

const WelcomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    return (
        <View style={styles.container}>
            <Icon type={IcType.fa} name="whatsapp" size={200} color={colors.primary} />
            <Gap height={30} />
            <Text font="semi-bold" size={20}>
                Welcome To WhatsApp
            </Text>
            <Gap height={20} />
            <Text style={{textAlign: 'center'}}>
                Read our privacy policy. Tap "Agree and Continue" to accept Terms of Services
            </Text>
            <Gap height={30} />
            <Button onPress={() => navigation.replace('Register')}>Agree and Continue</Button>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...padding(0, 16),
    },
});
