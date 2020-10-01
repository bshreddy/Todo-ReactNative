import React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';

import { TodoStackScreen } from './TodoStackScreen';
import { ProfileStackScreen } from './ProfileStackScreen';
import { MainTabParamList, MainTabScreenProps, MainTabScreenState, User } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export class MainTabScreen extends React.Component<MainTabScreenProps, MainTabScreenState> {
  state: MainTabScreenState = { initializing: true, user: null };
  activeTintColor: string = Constants.manifest.extra.defaultColor.systemBlue;
  inactiveTintColor: string = Constants.manifest.extra.defaultColor.systemGray;

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
  }

  onAuthStateChanged(user: User) {
    if (!user && this.state.initializing)
      this.props.navigation.dispatch(StackActions.push('authStack'));
    this.setState({ initializing: false, user: user });
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: this.activeTintColor,
          inactiveTintColor: this.inactiveTintColor,
          style: styles.tabBar
        }}
      >
        <Tab.Screen name="Todo" component={TodoStackScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              <Ionicons name="ios-list" size={24}
                color={focused ? this.activeTintColor : this.inactiveTintColor}
              />
          }}
        />
        <Tab.Screen name="Profile" component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ focused }) =>
              <Ionicons name="ios-person" size={24}
                color={focused ? this.activeTintColor : this.inactiveTintColor}
              />
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: 'white'
  }
});