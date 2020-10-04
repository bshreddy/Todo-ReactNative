import React from 'react';
import {
  View, Text, Image, StyleSheet
} from 'react-native';
import Constants from 'expo-constants';
import { StackActions } from '@react-navigation/native';

import { ProfileLeftHeader } from './ProfileHeader'
import defaultProfile from '../../assets/default-profile.png';

import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileScreenProps, ProfileScreenState, User } from '../../types';

export class ProfileScreen extends React.Component<ProfileScreenProps, ProfileScreenState> {
  state: ProfileScreenState = { user: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));

    this.props.navigation.setOptions({
      headerTitle: null,
      headerLeft: () => <ProfileLeftHeader title="Profile"/>,
      headerStyle: {
        height: 128,
        elevation: 0,
        shadowOpacity: 0,
      }
    });
  }

  onAuthStateChanged(user: User) {
    this.setState({ user });
  }

  render() {
    if (this.state.user == null)
      return (
        <View style={styles.mainView}>
          <View style={styles.profileView}></View>
          <View style={styles.signOutView}>
          <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(StackActions.push('authStack'))}
          >
            <Text style={styles.signInButton}>Sign In</Text>
          </TouchableOpacity>
        </View >
        </View>
      );

    var photoURL = defaultProfile;
    if (this.state.user.photoURL != null)
      photoURL = this.state.user.photoURL;

    return (
      <View style={styles.mainView}>
        <View style={styles.profileView}>
          <Image source={photoURL} style={styles.userDP} />
          <Text style={styles.userDisplayName}>{this.state.user.displayName}</Text>
          <Text style={styles.userEmail}>{this.state.user.email}</Text>
        </View >
        <View style={styles.signOutView}>
          <TouchableOpacity
            onPress={() => firebase.auth().signOut()}
          >
            <Text style={styles.signOutButton}>Sign Out</Text>
          </TouchableOpacity>
        </View >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: { 
    flex: 1, 
    backgroundColor: 'white',
  },
  profileView: {
    flex: 1, 
    alignItems: "center",
  },
  userDP: { 
    height: 128, 
    width: 128, 
    resizeMode: "contain", 
    marginTop: 40, 
    marginBottom: 30, 
  },
  userDisplayName: {
    fontSize: 28,
  },
  userEmail: {
    fontSize: 17, 
    color: "#636366",
  },
  signOutView: {
    alignItems: "center", 
    marginBottom: 30,
  },
  signInButton: {
    fontSize: 17, 
    color: Constants.manifest.extra.defaultColor.systemBlue,
  },
  signOutButton: { 
    fontSize: 17, 
    color: Constants.manifest.extra.defaultColor.systemRed,
  },
});