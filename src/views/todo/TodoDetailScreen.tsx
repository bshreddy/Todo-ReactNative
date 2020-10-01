import React from 'react';
import {
  View, StyleSheet, Text, TextInput
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

export class TodoDetailScreen extends React.Component {

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: (this.props.todo == null) ? 'Add Todo' : 'Todo Details',
      headerStatusBarHeight: 0,
      headerBackImage: () => <Ionicons name="ios-close" size={38} color="black" style={{ paddingLeft: 10 }} />
    })
  }

  render() {
    return (
      <View style={styles.mainView}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ email: text })}
          value={''}
          placeholder="Todo"
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, }}>
          <Text style={{ fontSize: 17, paddingEnd: 15 }}>Priority:</Text>
          <SegmentedControl
            values={['None', '!', '!!', '!!!']}
            selectedIndex={0}
            style={{ height: 40, flex: 1 }}
            onChange={(event) => {
              // this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex});
            }}
          />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "white"
  },
  textInput: {
    fontSize: 17,
    borderRadius: 4,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Constants.manifest.extra.defaultColor.systemGray5
  },
})