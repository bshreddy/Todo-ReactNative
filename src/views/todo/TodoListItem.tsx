import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

import { Todo } from '../../models/Todo';

type Props = {
  item: Todo,
  onChecked: (newValue: boolean) => void,
  onPress: () => void,
  onLongPress: () => void
}

export const TodoListItem = ({ item, onChecked, onPress, onLongPress }: Props) => {
  const timeString = moment(item.date).format('HH:mm')

  return (
    <TouchableOpacity onPress={() => onPress()} onLongPress={() => onLongPress()}>
      <View
        style={styles.mainView}
      >
        <View style={[styles.subView, styles.priorityView]}>
          <Text style={{ 
            fontSize: 24, 
            color: (item.done ? 
                Constants.manifest.extra.defaultColor.systemGray4 : 
                Constants.manifest.extra.defaultColor.systemBlue)
          }}>{"!".repeat(item.priority)}</Text>
        </View>
        <View style={[styles.subView, { flex: 1 }]}>
          <Text style={{ 
            fontSize: 17, 
            color: (item.done ? Constants.manifest.extra.defaultColor.systemGray4 : "black") 
          }}>{item.title}</Text>
          <Text style={{ 
            fontSize: 14, 
            color: (item.done ? Constants.manifest.extra.defaultColor.systemGray4 : "black") 
          }}>{timeString}</Text>
        </View>
        <View style={styles.subView}>
          <TouchableOpacity onPress={() => onChecked(!item.done)}>
            {(item.done) ?
              <Ionicons name="ios-checkmark-circle" size={32} 
                color={Constants.manifest.extra.defaultColor.systemGray4} 
              /> :
              <Ionicons name="ios-radio-button-off" size={32} 
                color={Constants.manifest.extra.defaultColor.systemBlue}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // height: 60,
    flexDirection: "row",
    marginStart: 15,
    marginEnd: 15,
    marginBottom: 10,
    padding: 15,
    paddingStart: 5,
    borderBottomColor: Constants.manifest.extra.defaultColor.systemGray6,
    borderBottomWidth: 1
  },
  subView: {
    justifyContent: "center"
  },
  priorityView: {
    justifyContent: "center", 
    width: 30
  }
})