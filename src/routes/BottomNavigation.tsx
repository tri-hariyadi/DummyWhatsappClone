import React, {useEffect, useCallback, useRef} from 'react';
import {Animated, Easing, StyleSheet, TouchableOpacity} from 'react-native';
import {BottomTabBarButtonProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon, {IcType} from 'components/Icon';
import {Gap, Text} from 'components';

import Chats from 'pages/Chats';
import Group from 'pages/Group';
import Settings from 'pages/Profile';

import {padding} from 'utils/mixins';
import {colors} from 'utils';

export type BottomTabStackParamList = {
    Chats: undefined;
    Group: undefined;
    Settings: undefined;
};

type TabArrList = {
    name: keyof BottomTabStackParamList;
    component: () => React.JSX.Element;
    activeIcon: string;
    inActiveIcon: string;
    iconType: string;
};

interface TabButtonProps extends BottomTabBarButtonProps {
    item: TabArrList;
}

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const TabArr: Array<TabArrList> = [
    {
        name: 'Group',
        component: Group,
        activeIcon: 'people-sharp',
        inActiveIcon: 'people-outline',
        iconType: IcType.io,
    },
    {
        name: 'Chats',
        component: Chats,
        activeIcon: 'chatbubbles',
        inActiveIcon: 'chatbubbles-outline',
        iconType: IcType.io,
    },
    {
        name: 'Settings',
        component: Settings,
        activeIcon: 'settings',
        inActiveIcon: 'settings-outline',
        iconType: IcType.io,
    },
];

const TabButton: React.FC<TabButtonProps> = ({item, onPress, accessibilityState}) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const focused = accessibilityState?.selected;

    useEffect(() => {
        if (focused) {
            return Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1.2, // To large scale
                    duration: 120,
                    easing: Easing.elastic(1),
                    useNativeDriver: false,
                }),
                Animated.timing(animatedValue, {
                    toValue: 1, // Scale back to original size
                    duration: 120,
                    easing: Easing.linear,
                    useNativeDriver: false,
                }),
            ]).start();
        }
        return animatedValue.setValue(1);
    }, [focused]);

    const scale = animatedValue.interpolate({
        inputRange: [1, 1.2],
        outputRange: [1, 1.3],
    });

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
            <Animated.Text style={{transform: [{scale}]}}>
                <Icon
                    type={item.iconType}
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    size={30}
                    color={focused ? colors.teal : colors.N100}
                />
            </Animated.Text>
            <Gap height={3} />
            <Text font={focused ? 'semi-bold' : 'regular'} size={12} color={focused ? colors.teal : colors.N100}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
};

const BottomNavigation = () => {
    const TabBarButton = useCallback(
        (props: BottomTabBarButtonProps, item: TabArrList) => <TabButton {...props} item={item} />,
        [],
    );

    return (
        <Tab.Navigator
            screenOptions={{headerShown: false, tabBarStyle: {alignContent: 'center'}}}
            initialRouteName="Chats">
            {TabArr.map(routeConfig => (
                <Tab.Screen
                    key={routeConfig.name}
                    name={routeConfig.name}
                    component={routeConfig.component}
                    options={{
                        tabBarShowLabel: false,
                        tabBarButton: props => TabBarButton(props, routeConfig),
                        tabBarStyle: {
                            height: 70,
                            ...padding(10, 0),
                        },
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
