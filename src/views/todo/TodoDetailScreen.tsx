import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Constants from 'expo-constants';
import moment from 'moment';

import { TodoDetailHeaderLeft, TodoDetailHeaderRight } from './TodoDetailHeader';
import { Todo } from '../../models/Todo';
import { update } from 'lodash';

export class TodoDetailScreen extends React.Component {

  state = {
    datePickerVisible: false, 
    datePickerDateMode: true,
    todoID: '',
    todoTitle: '',
    todoPriority: 0,
    todoDone: false,
    todoDate: new Date(),
  }

  componentDidMount() {
    const todo = (this.props.route.params.todo || new Todo('', ''))
    this.setState({
      todoID: todo.id, 
      todoTitle: todo.title, 
      todoPriority: todo.priority,
      todoDone: todo.done,
      todoDate: todo.date,
    })

    this.props.navigation.setOptions({
      headerTitle: null,
      headerLeft: () => <TodoDetailHeaderLeft onPress={ () => this.props.navigation.goBack() } />,
      headerRight: () => <TodoDetailHeaderRight onPress={this.onSavePressed.bind(this)}/>,
      headerStatusBarHeight: 0,
      headerStyle: {
        height: 60,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderColor: Constants.manifest.extra.defaultColor.systemGray4
      }
    })
  }

  datePickerUpdated(date) {
    this.setState({ datePickerVisible: false, todoDate: date })
  }

  onSavePressed() {
    const todo = new Todo(this.state.todoID, this.state.todoTitle, this.state.todoDone, 
      this.state.todoPriority, this.state.todoDate)
    
    this.props.route.params.onSave(todo)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: 10,
          justifyContent: "flex-start",
          alignItems: "stretch",
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            borderBottomColor: Constants.manifest.extra.defaultColor.systemGray4,
            borderBottomWidth: 1,
            padding: 5,
          }}
        >
          <TextInput
            style={{
              fontSize: 20,
              padding: 15,
              borderColor: Constants.manifest.extra.defaultColor.systemGray5
            }}
            onChangeText={text => this.setState({ todoTitle: text })}
            value={this.state.todoTitle}
            placeholder="Remind Me To..."
          />
        </View>

        <View 
          style={{ 
            borderBottomColor: Constants.manifest.extra.defaultColor.systemGray4,
            borderBottomWidth: 1,
            padding: 20,
            flexDirection: "row", 
            alignItems: "center",
          }}
        >
          <SegmentedControl
            values={['None', 'Low', 'Medium', 'High']}
            selectedIndex={this.state.todoPriority}
            style={{ 
              height: 40, 
              flex: 1
            }}
            onChange={(event) => {
              this.setState({todoPriority: event.nativeEvent.selectedSegmentIndex});
            }}
          />
        </View>

        <View 
          style={{ 
            borderBottomColor: Constants.manifest.extra.defaultColor.systemGray4,
            borderBottomWidth: 1,
            padding: 5,
            flexDirection: "row", 
            alignItems: "center",
          }}
        >
          <TouchableOpacity 
            style={{ flex: 1, padding: 15, }} 
            onPress={() => this.setState({ datePickerVisible: true, datePickerDateMode: true })}
          >
            <Text style={{ fontSize: 17 }}>{moment(this.state.todoDate).format('ddd MMM D, yyyy')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ padding: 15, }}
            onPress={() => this.setState({ datePickerVisible: true, datePickerDateMode: false })}
          >
            <Text style={{ fontSize: 17 }}>{moment(this.state.todoDate).format('hh:mm A')}</Text>
          </TouchableOpacity>
        </View>
        
        <DateTimePickerModal
          date={this.state.todoDate}
          isVisible={this.state.datePickerVisible}
          headerTextIOS={`Pick a ${this.state.datePickerDateMode ? "date" : "time"}`}
          mode={(this.state.datePickerDateMode ? "date" : "time")}
          onConfirm={this.datePickerUpdated.bind(this)}
          onCancel={() => this.setState({ datePickerVisible: false })}
        />
      </View>
    );
  }
}
