import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {selectContact} from 'store/reducers/contactSlice';

import BottomNavigation from './BottomNavigation';
import ChatRoom from 'pages/ChatRoom';
import DetailContact from 'pages/DetailContact';
import ChatGroupRoom from 'pages/ChatGroupRoom';
import WelcomeScreen from 'pages/WelcomeScreen';
import Register from 'pages/Register';

export type AppStackParamList = {
    Home: undefined;
    ChatRoom: {
        chatID?: string;
        image_url?: string;
        patnerName?: string;
        idPartner?: string;
        isGroup?: boolean;
        search?: boolean;
    };
    ChatGroupRoom: {
        chatId: string;
        id: string;
        isGroup?: boolean;
        search?: boolean;
    };
    DetailContact: {
        id?: string;
        isGroup?: boolean;
        chatID?: string;
    };
    WelcomeScreen: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
    {
        name: 'WelcomeScreen',
        component: WelcomeScreen,
    },
    {
        name: 'Register',
        component: Register,
    },
    {
        name: 'Home',
        component: BottomNavigation,
    },
    {
        name: 'ChatRoom',
        component: ChatRoom,
    },
    {
        name: 'DetailContact',
        component: DetailContact,
    },
    {
        name: 'ChatGroupRoom',
        component: ChatGroupRoom,
    },
];

const AppStack = () => {
    const users = useSelector(selectContact);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {/* {routes.map(routeConfig => (
                    <Stack.Screen key={routeConfig.name} {...routeConfig} />
                ))} */}
                {users.data.length <= 0
                    ? routes.slice(0, 2).map(routeConfig => <Stack.Screen key={routeConfig.name} {...routeConfig} />)
                    : routes.slice(2, 6).map(routeConfig => <Stack.Screen key={routeConfig.name} {...routeConfig} />)}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;
