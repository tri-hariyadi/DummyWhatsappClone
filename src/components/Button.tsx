import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
    ActivityIndicator,
    Animated,
    ColorValue,
    LayoutChangeEvent,
    StyleSheet,
    TextStyle,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import {
    GestureHandlerRootView,
    HandlerStateChangeEvent,
    TapGestureHandler,
    TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

import Row from './Row';
import Icon from './Icon';
import Text from './Text';

import {colors} from 'utils';
import Gap from './Gap';

type Props = {
    testID?: string;
    children?: React.ReactElement | React.ReactNode | string;
    isBlock?: boolean;
    isOutlineButton?: boolean;
    background?: ColorValue;
    isLoading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    rippleColor?: ColorValue;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    textFont?: 'bold' | 'extra-bold' | 'light' | 'medium' | 'semi-bold' | 'regular';
    onPress?: () => void;

    //icon props
    iconType?: string;
    iconName?: string;
    iconSize?: number;
    iconColor?: ColorValue;
};

const Button: React.FC<Props> = ({
    testID,
    children,
    isBlock,
    isOutlineButton = false,
    background = colors.teal,
    isLoading,
    loadingText = 'Loading...',
    disabled,
    rippleColor,
    containerStyle,
    textStyle,
    textFont = 'medium',
    onPress = () => {},

    //icon props
    iconType,
    iconName,
    iconSize,
    iconColor,
}) => {
    const MAX_OPACITY = 0.8;
    const scaleValue = useRef(new Animated.Value(0)).current;
    const opacityValue = useRef(new Animated.Value(MAX_OPACITY)).current;
    const tapX = useRef(new Animated.Value(0)).current;
    const tapY = useRef(new Animated.Value(0)).current;
    const touch = useRef({width: 0});
    const [rippleStyle, setRippleStyle] = useState({});

    const opacityAnimation = Animated.timing(opacityValue, {
        toValue: 0,
        useNativeDriver: true,
        duration: 800,
    });

    const animatedStyle = (scale: Animated.Value, opacity: Animated.Value): ViewStyle => ({
        width: '100%',
        height: '100%',
        borderRadius: 900,
        transform: [{scale}],
        opacity,
        backgroundColor: rippleColor ?? isOutlineButton ? 'rgba(0,0,0, 0.2)' : '#DEE2E6',
    });

    const btnStyle = useMemo(() => {
        const btStyle: ViewStyle = {
            backgroundColor: !isOutlineButton ? background : 'transparent',
            alignSelf: isBlock ? 'stretch' : 'baseline',
        };

        if (isOutlineButton) {
            btStyle.borderWidth = 1;
            btStyle.borderColor = background;
        }

        return btStyle;
    }, [isBlock, isOutlineButton, background]);

    const handleGesture = (evt: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        const {x, y} = evt.nativeEvent;
        Animated.timing(tapX, {
            toValue: x - touch.current.width,
            useNativeDriver: true,
            duration: 1,
        }).start();
        Animated.timing(tapY, {
            toValue: y - touch.current.width,
            useNativeDriver: true,
            duration: 1,
        }).start();
    };

    const TapStyle = {
        transform: [{translateX: tapX}, {translateY: tapY}],
    };

    const onPressIn = () => {
        Animated.stagger(0, [
            Animated.sequence([
                Animated.spring(scaleValue, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]),
            opacityAnimation,
        ]).start(() => {
            scaleValue.setValue(0);
            opacityValue.setValue(MAX_OPACITY);
        });
    };

    const onBtnPress = useCallback(() => {
        setTimeout(() => {
            onPress();
        }, 100);
    }, [onPress]);

    const handleOnLayout = (e: LayoutChangeEvent) => {
        touch.current.width = e.nativeEvent?.layout?.width;
        setRippleStyle(prev => ({
            ...prev,
            width: e.nativeEvent?.layout?.width * 2,
            height: e.nativeEvent?.layout?.width * 2,
        }));
    };

    const renderIcon = useMemo(() => {
        if (iconType && iconName) {
            return (
                <>
                    <Icon
                        type={iconType}
                        name={iconName}
                        size={iconSize}
                        color={isOutlineButton ? background : iconColor}
                    />
                    {children && <Gap width={10} />}
                </>
            );
        }
        return null;
    }, [iconType, iconName, iconSize, iconColor, isOutlineButton, background, children]);

    const renderItem = useMemo(() => {
        if (React.isValidElement(children)) return children;
        return (
            <Row itemsCenter style={styles.itemContainer}>
                {renderIcon}
                <Text font={textFont} color={isOutlineButton ? background : colors.white} style={textStyle}>
                    {children}
                </Text>
            </Row>
        );
    }, [children, isOutlineButton, background, renderIcon]);

    if (isLoading) {
        return (
            <Row
                itemsCenter
                justifyCenter
                testID="button-loading"
                style={[styles.contentContainer, btnStyle, styles.btnDisable, containerStyle]}>
                <ActivityIndicator size={18} color={isOutlineButton ? background : colors.white} />
                <Gap width={8} />
                <Text font={textFont} color={isOutlineButton ? background : colors.white} style={textStyle}>
                    {loadingText}
                </Text>
            </Row>
        );
    }

    if (disabled) {
        return (
            <Row
                testID="button-disabled"
                itemsCenter
                justifyCenter
                style={[styles.contentContainer, btnStyle, styles.btnDisable, containerStyle]}>
                {renderIcon}
                {renderItem}
            </Row>
        );
    }

    return (
        <TouchableWithoutFeedback testID={testID} accessibilityRole="button" onPressIn={onPressIn} onPress={onBtnPress}>
            <GestureHandlerRootView>
                <TapGestureHandler onHandlerStateChange={handleGesture}>
                    <View onLayout={handleOnLayout} style={[styles.contentContainer, btnStyle, containerStyle]}>
                        <Animated.View style={[TapStyle, rippleStyle, styles.rippleWrapp]}>
                            <Animated.View style={animatedStyle(scaleValue, opacityValue)} />
                        </Animated.View>
                        {renderItem}
                    </View>
                </TapGestureHandler>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>
    );
};

export default Button;

const styles = StyleSheet.create({
    rippleWrapp: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    btnDisable: {
        opacity: 0.7,
    },
    itemContainer: {
        alignSelf: 'center',
    },
});
