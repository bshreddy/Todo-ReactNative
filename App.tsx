import React from 'react';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import * as firebase from 'firebase';

import { MainTabScreen } from './src/navi/MainTabScreen';
import { AuthStackScreen } from './src/navi/AuthStackScreen';

enableScreens();

import { LogBox } from 'react-native';
import _ from 'lodash';
import { RootStackParamList } from './src/types';

LogBox.ignoreLogs(['Setting a timer', 'Non-serializable values were found in the navigation state']);
const _console = _.clone(console);
console.warn = (message: any) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    databaseURL: Constants.manifest.extra.databaseURL,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
  });
}

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" screenOptions={() => ({
        ...TransitionPresets.ModalPresentationIOS, cardOverlayEnabled: true, gestureEnabled: true, headerShown: false,
        headerStatusBarHeight: 0,
      })}>      
        <RootStack.Screen name="mainStack" component={MainTabScreen} />
        <RootStack.Screen name="authStack" component={AuthStackScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
