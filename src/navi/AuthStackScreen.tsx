import React from 'react';
import {
  Text, StyleSheet
} from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen } from '../views/auth/AuthScreen';
import { AuthStackParamList, AuthStackProps } from '../types';

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthStackScreen: React.FunctionComponent<AuthStackProps> = ({ navigation }) => {
  return (
    <AuthStack.Navigator screenOptions={() => ({
      cardOverlayEnabled: true, gestureEnabled: true,
      headerStatusBarHeight: 0,
    })}>
      <AuthStack.Screen name="auth" component={AuthScreen} options={{
        title: "Login",
        headerLeft: () => { return null },
        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          );
        },
      }} />
    </AuthStack.Navigator>
  );
}

const styles = StyleSheet.create({
  cancelButton: { 
    color: Constants.manifest.extra.defaultColor.systemBlue, 
    fontSize: 17, 
    textTransform: "capitalize", 
    paddingRight: 20 
  }
});