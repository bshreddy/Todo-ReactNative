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
  const timeString = moment(item.date).format('hh:mm A')

  return (
    <View style={styles.mainView}>
      <View style={styles.subViewFlux}>
        <TouchableOpacity onPress={() => onPress()} onLongPress={() => onLongPress()}
          style={styles.touchableOpacity}
        >
          <View style={[styles.subView, styles.priorityView]}>
            <Text style={{
              fontSize: 24,
              flex: 1,
              color: (item.done ?
                Constants.manifest.extra.defaultColor.systemGray4 :
                Constants.manifest.extra.defaultColor.systemBlue)
            }}>{"!".repeat(item.priority)}</Text>
          </View>
          <View style={styles.subViewFlux}>
            <Text style={{
              fontSize: 17,
              color: (item.done ? Constants.manifest.extra.defaultColor.systemGray4 : "black")
            }}>{item.title}</Text>
            <Text style={{
              fontSize: 14,
              color: (item.done ? Constants.manifest.extra.defaultColor.systemGray4 : "black")
            }}>{timeString}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.subView}>
        <TouchableOpacity onPress={() => onChecked(!item.done)} style={styles.touchableOpacity}>
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
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    marginStart: 15,
    marginEnd: 15,
    marginBottom: 10,
    borderBottomColor: Constants.manifest.extra.defaultColor.systemGray6,
    borderBottomWidth: 1,
  },
  subView: {
    justifyContent: "center"
  },
  subViewFlux: {
    justifyContent: "center",
    flex: 1
  },
  touchableOpacity: {
    flex: 1,
    paddingStart: 5,
    padding: 15,
    flexDirection: "row",
  },
  priorityView: {
    justifyContent: "center",
    width: 30,
  }
})