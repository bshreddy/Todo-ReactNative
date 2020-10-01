import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { TodoHeaderProps } from '../../types';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

export const TodoLeftHeader: React.FunctionComponent<TodoHeaderProps> = ({ date }) => {
  return (
    <View style={[styles.headerView, {paddingStart: 30}]}>
      <Text style={{ fontSize: 38 }}>{String(date.getDate()).padStart(2, '0')}</Text>
      <View style={styles.monthYearView}>
        <Text style={styles.month}>{monthNames[date.getMonth()]}</Text>
        <Text style={styles.year}>{date.getFullYear()}</Text>
      </View>
    </View>
  );
}

export const TodoRightHeader: React.FunctionComponent<TodoHeaderProps> = ({ date }) => {
  return (
    <View style={[styles.headerView, {paddingEnd: 30,}]}>
      <Text style={styles.day}>{dayNames[date.getDay()]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: 40,
    flex: 1,
    alignItems: "center", 
    flexDirection: "row"
  },
  monthYearView: { 
    marginLeft: 4 
  },
  month: { 
    fontSize: 14, 
    textTransform: "uppercase" ,
  },
  year: {
    fontSize: 14,
  },
  day: { 
    fontSize: 17, 
    textTransform: "uppercase" 
  }
})