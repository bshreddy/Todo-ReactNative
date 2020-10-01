import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { TodoMasterScreen } from '../views/todo/TodoMasterScreen';
import { TodoDetailScreen } from '../views/todo/TodoDetailScreen';
import { TodoStackParamList, TodoStackProps } from '../types';

const TodoStack = createStackNavigator<TodoStackParamList>();

export const TodoStackScreen: React.FunctionComponent<TodoStackProps> = () => {
  return (
    <TodoStack.Navigator mode="modal" screenOptions={() => ({
      ...TransitionPresets.ModalPresentationIOS, cardOverlayEnabled: true, gestureEnabled: true
    })}>
      <TodoStack.Screen name="todoMaster" component={TodoMasterScreen}/>
      <TodoStack.Screen name="todoDetail" component={TodoDetailScreen}/>
    </TodoStack.Navigator>
  );
};