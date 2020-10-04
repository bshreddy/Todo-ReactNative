import React from 'react';
import { 
  View, Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

export const TodoDetailHeaderLeft = ({ onPress }) => {
  return (
    <View style={{ 
      height: 40,
      flex: 1,
      alignItems: "center", 
      flexDirection: "row",
      paddingStart: 20,
      paddingTop: 10,
      paddingBottom: 10,
    }}>
      <TouchableOpacity
        onPress={() => onPress()}
      >
        <Ionicons name="ios-close" size={36} color={Constants.manifest.extra.defaultColor.systemBlue} />
      </TouchableOpacity>
    </View>
  );
}

export const TodoDetailHeaderRight = ({ onPress }) => {
  return (
    <View style={{ 
      height: 40,
      flex: 1,
      alignItems: "center", 
      flexDirection: "row",
      paddingEnd: 20
    }}>
      <TouchableOpacity
        onPress={() => onPress()}
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
}