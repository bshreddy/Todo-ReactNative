import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

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
};