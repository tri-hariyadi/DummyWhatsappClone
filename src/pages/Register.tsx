import React, {useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Button, Gap, Row, Text} from 'components';
import {colors} from 'utils';
import {padding, rounded} from 'utils/mixins';
import {getContact} from 'services/contactService';
import {selectContact} from 'store/reducers/contactSlice';

import {ThunkDispatch} from 'redux-thunk';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from 'routes';

const Register = () => {
    const [text, onChangeText] = useState('');
    const [error, setError] = useState<string | undefined>();

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const users = useSelector(selectContact);

    const onSubmit = () => {
        if (text === '') {
            setError('Number phone must be filled');
            return;
        }
        if (text.length < 9) {
            setError('Number phone must not be less than 9 digits');
            return;
        }
        dispatch(getContact()).then(action => {
            if (
                typeof action.payload === 'object' &&
                action.payload &&
                'data' in action.payload &&
                typeof action.payload.data === 'object' &&
                action.payload.data &&
                'status' in action.payload.data &&
                typeof action.payload.data.status === 'number'
            ) {
                if (action.payload.data?.status === 200) {
                    navigation.replace('Home');
                }
            }
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text font="medium" size={20} color={colors.primary} style={{textAlign: 'center'}}>
                    Enter your phone number
                </Text>
                <Gap height={18} />
                <Text style={{textAlign: 'center'}}>
                    WhatsApp will need verify your number. <Text color={colors.teal}>What my number?</Text>
                </Text>
                <Gap height={14} />
                <Row itemsCenter style={[styles.inputContainer, error ? {borderColor: 'rgb(225 29 72)'} : {}]}>
                    <TextInput
                        onChangeText={value => {
                            onChangeText(value);
                            setError('');
                        }}
                        value={text}
                        style={styles.input}
                        placeholder="Phone number"
                        keyboardType="number-pad"
                        maxLength={12}
                    />
                </Row>
                <Gap height={3} />
                <Text size={12} color={'rgb(225 29 72)'}>
                    {error}
                </Text>
            </View>
            <Button
                isLoading={users.loading}
                onPress={onSubmit}
                background={colors.primary}
                containerStyle={{alignSelf: 'center'}}>
                Submit
            </Button>
        </ScrollView>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        ...padding(40, 16, 40),
        justifyContent: 'space-between',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.N100,
        ...rounded(12),
        ...padding(6, 10),
        alignSelf: 'baseline',
    },
    input: {
        padding: 0,
        fontFamily: 'Poppins-Regular',
        maxHeight: 80,
        flex: 1,
    },
});
