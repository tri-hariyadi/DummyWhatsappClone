import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    PanResponder,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Row from './Row';
import {Gap, Icon, Text} from 'components';
import {IcType} from './Icon';
import {colors} from 'utils';

type Props = {
    children?: React.ReactElement | React.ReactNode;
    childrenWrapperStyle?: ViewStyle;
    customHeader?: () => JSX.Element;
    maxHeight?: number;
    onTouchOutside?: () => void;
    onDismiss?: () => void;
    onShow?: () => void;
    showHeader?: boolean;
    styleHeader?: ViewStyle;
    textHeader?: string;
    scrollEnabled?: boolean;
};

export type BottomSheetRefType = {
    show: () => void;
    dismiss: () => void;
};

const BottomSheet = React.forwardRef<BottomSheetRefType, Props>(
    (
        {
            children,
            childrenWrapperStyle,
            customHeader,
            maxHeight = 86,
            onTouchOutside,
            onDismiss,
            onShow,
            showHeader = true,
            styleHeader,
            textHeader,
            scrollEnabled = true,
        },
        ref,
    ) => {
        const [headerHeight, setHeaderHeight] = useState(0);
        const [visible, setVisible] = useState(false);
        const modalHeight = useRef(0);
        const panY = useRef(new Animated.Value(Dimensions.get('screen').height)).current;

        const resetPositionAnim = useRef(
            Animated.timing(panY, {
                toValue: 0,
                duration: 520,
                useNativeDriver: true,
            }),
        ).current;

        const closeAnim = useRef(
            Animated.timing(panY, {
                toValue: Dimensions.get('screen').height,
                duration: 400,
                useNativeDriver: true,
            }),
        ).current;

        const translateY = panY.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 0, 1],
        });

        const panResponder = useRef(
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (e, gs) => {
                    panY.setValue(gs.dy < 0 ? 0 : gs.dy);
                },
                onPanResponderRelease: (e, gs) => {
                    if (gs.dy > (30 / 100) * modalHeight.current || gs.vy > 0.3) {
                        return closeAnim.start(() => setVisible(v => !v));
                    }
                    return resetPositionAnim.start();
                },
            }),
        ).current;

        useEffect(() => {
            if (visible) {
                resetPositionAnim.start();
                if (typeof onShow === 'function') onShow();
            } else {
                if (typeof onDismiss === 'function') onDismiss();
            }
        }, [visible]);

        const dismissModal = () => {
            closeAnim.start(() => {
                setVisible(false);
            });
        };
        const show = () => {
            panY.setValue(Dimensions.get('screen').height);
            setVisible(true);
        };

        useImperativeHandle(ref, () => ({
            dismiss: dismissModal,
            show,
        }));

        const modalContainerStyle = useMemo(() => {
            const style: ViewStyle = {
                backgroundColor: colors.white,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                maxHeight: (Dimensions.get('window').height * maxHeight) / 100,
                overflow: 'hidden',
            };
            return style;
        }, [maxHeight]);

        const Header = useMemo(() => {
            if (!showHeader) return null;

            if (customHeader) return customHeader();

            return (
                <>
                    <Row justifyBetween itemsCenter style={{width: '100%'}}>
                        <Text size={16} color={colors.N100}>
                            {textHeader}
                        </Text>
                        <TouchableOpacity onPress={dismissModal}>
                            <Icon type={IcType.io} name="close" size={30} color={colors.N100} />
                        </TouchableOpacity>
                    </Row>
                    <Gap height={10} />
                </>
            );
        }, [showHeader, customHeader, textHeader]);

        return (
            <Modal animationType="none" visible={visible} transparent onRequestClose={() => dismissModal()}>
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.container}>
                    {/* ========================= Overlay Bottom Sheet ========================= */}
                    <TouchableWithoutFeedback
                        onPress={() => {
                            dismissModal();
                            if (onTouchOutside) onTouchOutside();
                        }}>
                        <View style={styles.overlay} />
                    </TouchableWithoutFeedback>

                    {/* ========================= Bottom Sheet body with responder ========================= */}
                    <Animated.View
                        style={[modalContainerStyle, {transform: [{translateY}]}]}
                        onLayout={e => (modalHeight.current = e.nativeEvent.layout.height)}>
                        {/* Title and Header Bottom Sheet */}
                        <View
                            {...panResponder.panHandlers}
                            onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
                            style={[styles.headerModal, styleHeader]}>
                            <View style={styles.lineModal} />
                            {Header}
                        </View>

                        {/* Content of Bottom Sheet */}
                        {showHeader ? <Gap height={headerHeight} /> : null}
                        {children}
                        {/* <ScrollView
                            keyboardShouldPersistTaps="handled"
                            style={childrenWrapperStyle}
                            scrollEnabled={scrollEnabled}>
                        </ScrollView> */}
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>
        );
    },
);

export default BottomSheet;

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.5)',
    },
    headerModal: {
        paddingTop: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.white,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        paddingHorizontal: 16,
    },
    lineModal: {
        height: 4,
        backgroundColor: colors.N100,
        width: 30,
        borderRadius: 20,
        marginBottom: 16,
    },
});
