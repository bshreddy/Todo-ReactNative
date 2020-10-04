import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

import { TodoDetailHeaderProps } from '../../types';

export const TodoDetailHeaderLeft: React.FunctionComponent<TodoDetailHeaderProps> = ({ onPress }) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchableOpacity}
      >
        <Ionicons name="ios-close" size={36} color={Constants.manifest.extra.defaultColor.systemBlue} />
      </TouchableOpacity>
    </View>
  );
};

export const TodoDetailHeaderRight: React.FunctionComponent<TodoDetailHeaderProps> = ({ onPress }) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchableOpacity}
      >
        <Text
          style={{
            fontSize: 17,
            color: Constants.manifest.extra.defaultColor.systemBlue,
          }}
        >Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    height: 40,
  },
  touchableOpacity: {
    height: 40,
    flex: 1,
    paddingStart: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingEnd: 20,
    alignItems: "center",
    flexDirection: "row",
  }
});