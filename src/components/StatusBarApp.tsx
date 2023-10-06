import React from 'react';
import {View, StatusBar, ColorValue, ViewStyle, StatusBarProps} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps extends StatusBarProps {
    backgroundColor?: ColorValue;
}

const StatusBarApp: React.FC<IProps> = ({backgroundColor, ...props}) => {
    const {top} = useSafeAreaInsets();
    const statusBarAppStyle: ViewStyle = {
        backgroundColor: backgroundColor,
        height: top,
    };

    return (
        <View style={statusBarAppStyle}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={backgroundColor} {...props} />
            </SafeAreaView>
        </View>
    );
};

StatusBarApp.defaultProps = {
    backgroundColor: 'transparent',
};

export default StatusBarApp;
