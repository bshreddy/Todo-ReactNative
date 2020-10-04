import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { ProfileLeftHeaderProps } from '../../types';

export const ProfileLeftHeader: React.FunctionComponent<ProfileLeftHeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: { 
    height: 40, 
    paddingStart: 30, 
    flex: 1, 
    alignItems: "center", 
    flexDirection: "row"
  },
  headerTitle: { 
    fontSize: 38 
  }
});