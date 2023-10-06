import React, {useImperativeHandle, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Keyboard} from 'react-native';

import {Button, Gap, Row} from 'components';
import {colors} from 'utils';
import {dimens, rounded, padding} from 'utils/mixins';
import Icon, {IcType} from 'components/Icon';

type IProps = {
    onSendMessage?: () => void;
    isSearchBox?: boolean;
    onClearSearch?: () => void;
};

export type InputChatRefType = {
    target: {
        value: string;
    };
    focus: () => void;
    clear: () => void;
};

const InputBox = React.forwardRef<InputChatRefType, IProps>(({onSendMessage, isSearchBox, onClearSearch}, ref) => {
    const inputRef = React.useRef<TextInput>(null);
    const [text, onChangeText] = useState('');

    useImperativeHandle(ref, () => ({
        target: {
            value: text,
        },
        focus: () => inputRef.current?.focus(),
        clear: () => onChangeText(''),
    }));

    return (
        <Row itemsEnd style={styles.container}>
            <Row itemsCenter style={styles.inputContainer}>
                <TextInput
                    ref={inputRef}
                    multiline={!isSearchBox}
                    onChangeText={onChangeText}
                    value={text}
                    style={styles.input}
                    placeholder={isSearchBox ? 'Search...' : 'Message'}
                />
                {isSearchBox && (
                    <TouchableOpacity
                        onPress={() => {
                            if (onClearSearch) onClearSearch();
                            onChangeText('');
                            Keyboard.dismiss();
                        }}>
                        <Icon type={IcType.io} name="close" size={26} color={colors.N100} />
                    </TouchableOpacity>
                )}
            </Row>
            <Gap width={16} />
            <Button
                iconType={isSearchBox ? IcType.fa5 : IcType.mi}
                iconName={isSearchBox ? 'search' : 'send'}
                iconSize={isSearchBox ? 20 : 26}
                iconColor={colors.white}
                containerStyle={{...styles.btnSend, paddingLeft: isSearchBox ? 0 : 4}}
                background={colors.B400}
                onPress={onSendMessage}
            />
        </Row>
    );
});

export default React.memo(InputBox);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        ...padding(9, 12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.N100,
        ...rounded(12),
        ...padding(6, 10),
        flex: 1,
        alignSelf: 'baseline',
    },
    input: {
        padding: 0,
        fontFamily: 'Poppins-Regular',
        maxHeight: 80,
        flex: 1,
    },
    btnSend: {
        ...dimens(40),
        ...rounded(40 / 2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
        paddingLeft: 4,
    },
});
