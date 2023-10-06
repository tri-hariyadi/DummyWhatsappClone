/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';
import {StatusBarApp} from 'components';
import AppStack from 'routes';
import {colors} from 'utils';

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <StatusBarApp backgroundColor={colors.primary} />
                    <AppStack />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}

// console.log('Hermes Enabled =>', !!global.HermesInternal);

export default App;
