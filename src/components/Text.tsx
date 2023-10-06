import React from 'react';
import {ColorValue, Text, TextStyle} from 'react-native';

import {scaleFont} from 'utils/mixins';

type IProps = {
    testID?: string;
    children?: React.ReactElement | React.ReactNode | string;
    font?: 'bold' | 'extra-bold' | 'light' | 'medium' | 'semi-bold' | 'regular';
    size?: number;
    color?: ColorValue;
    lineHeight?: number;
    numberOfLines?: number;
    style?: TextStyle;
};

const TextComponent: React.FC<IProps> = ({
    testID,
    children,
    font,
    size = 14,
    color = 'black',
    lineHeight = size * 1.5,
    numberOfLines,
    style,
}) => {
    const getFont = () => {
        switch (font) {
            case 'bold':
                return 'Poppins-Bold';
            case 'extra-bold':
                return 'Poppins-ExtraBold';
            case 'light':
                return 'Poppins-Light';
            case 'medium':
                return 'Poppins-Medium';
            case 'semi-bold':
                return 'Poppins-SemiBold';

            default:
                return 'Poppins-Regular';
        }
    };

    return (
        <Text
            testID={testID}
            numberOfLines={numberOfLines}
            style={[
                {fontFamily: getFont(), fontSize: scaleFont(size), color, lineHeight: scaleFont(lineHeight)},
                style,
            ]}>
            {children}
        </Text>
    );
};

export default TextComponent;
