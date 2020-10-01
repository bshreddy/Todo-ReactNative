import React, { useState, useEffect } from 'react';
import {
  Text, TouchableOpacity
} from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { ProfileScreen } from '../views/profile/ProfileScreen';
import { ProfileStackParamList, ProfileStackProps } from '../types';

const ProfileStack = createStackNavigator<ProfileStackParamList>();

export const ProfileStackScreen: React.FunctionComponent<ProfileStackProps> = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="profile"
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
}