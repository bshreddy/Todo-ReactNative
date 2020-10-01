import React from 'react';
import {
  View, FlatList, ActivityIndicator, RefreshControl, Text, Platform, StyleSheet
} from 'react-native';
import Constants from 'expo-constants';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';

import { TodoListItem } from './TodoListItem';
import { Todo } from '../../models/Todo';
import { TodoLeftHeader, TodoRightHeader } from './TodoHeader'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TodoScreenProps, TodoScreenState, User } from '../../types';

export class TodoScreen extends React.Component<TodoScreenProps, TodoScreenState> {
  state: TodoScreenState = {
    isLoading: true,
    refreshing: false,
    data: [] as Todo[],
    date: new Date(),
    user: null
  }
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this))

    this.props.navigation.setOptions({
      headerTitle: null,
      headerLeft: () => <TodoLeftHeader date={this.state.date} />,
      headerRight: () => <TodoRightHeader date={this.state.date} />,
      headerStyle: {
        height: 128,
        elevation: 0,
        shadowOpacity: 0,
      }
    })
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({
      headerLeft: () => <TodoLeftHeader date={this.state.date} />,
      headerRight: () => <TodoRightHeader date={this.state.date} />,
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  updateData() {
    if (!this.state.user) return;

    Todo.getTodos(this.state.date, this.state.user)
      .then((todos) => {
        if (this._isMounted)
          this.setState({ data: todos })
      })
      .catch(() => {
        this.setState({ data: [] })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  onAuthStateChanged(user: User) {
    this.setState({ user, isLoading: true })
    if (!user || !this.state.isLoading) return;
  }

  updateDate(amt: number) {
    var newDate = this.state.date;
    newDate.setDate(newDate.getDate() + amt);
    this.setState({ isLoading: true, date: newDate })
  }

  addTodo() {

  }

  onTodoChecked(item: Todo, index: number, newValue: boolean) {
    const newData = [...this.state.data]
    const oldValue = newData[index].done
    newData[index].done = newValue
    this.setState({ data: newData })
    this.state.data[index].setDone(newValue, this.state.user)
      .catch(() => { newData[index].done = oldValue; this.setState({ data: newData }); })
  }

  onTodoPressed(item: Todo, index: number) {
    console.log({ press: item })
  }

  onTodoLongPressed(item: Todo, index: number) {
    console.log({ longPress: item })
  }

  render() {
    if (this.state.isLoading) {
      this.updateData()

      return (
        <View style={[styles.mainView, styles.activityViewContainer]}>
          <View style={styles.activityView}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      );
    } else {
      return (
        <GestureRecognizer
          onSwipeLeft={() => { this.updateDate(1); }}
          onSwipeRight={() => { this.updateDate(-1); }}
          style={{ flex: 1 }}
        >
          <View style={styles.mainView}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={(item, index) => { return item.id || index.toString() }}
              renderItem={({ item, index }) =>
                <TodoListItem
                  item={item}
                  onChecked={(newValue) => this.onTodoChecked(item, index, newValue)}
                  onPress={() => this.onTodoPressed(item, index)}
                  onLongPress={() => this.onTodoLongPressed(item, index)}
                />
              }
              refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.updateData.bind(this)} />}
              style={styles.flatList}
            />
            <View style={styles.addButtonView}>
              <TouchableOpacity style={styles.addButton} onPress={this.addTodo.bind(this)}>
                <Ionicons name="ios-add" size={48} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </GestureRecognizer>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  activityViewContainer: {
    alignItems: "center",
  },
  activityView: {
    height: 96,
    width: 96,
    justifyContent: "center",
    alignItems: "center",
    // TODO: change after adding dark mode
    backgroundColor: "#3a3a3c",
    borderRadius: 25,
  },
  flatList: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  addButtonView: {
    position: 'absolute',
    zIndex: 100,
    bottom: 20,
    right: 15,
  },
  addButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Constants.manifest.extra.defaultColor.systemBlue,
    justifyContent: "center",
    alignItems: "center"
  }
})