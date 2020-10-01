import React, { useState, useEffect } from 'react';
import {
  Text
} from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { TodoScreen } from '../views/todo/TodoScreen';
import { TodoStackParamList, TodoStackProps } from '../types';

const TodoStack = createStackNavigator<TodoStackParamList>();

export const TodoStackScreen: React.FunctionComponent<TodoStackProps> = () => {
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen 
        name="todo" 
        component={TodoScreen}
      />
    </TodoStack.Navigator>
  );
}