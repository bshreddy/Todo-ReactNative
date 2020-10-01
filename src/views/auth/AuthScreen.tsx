import React from 'react';
import {
  Text, View, TextInput, Alert, StyleSheet
} from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import * as GoogleSignIn from 'expo-google-sign-in';
import { AuthScreenProps, AuthScreenState } from '../../types';

export class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState> {
  state: AuthScreenState = { 
    user: null, 
    email: '', 
    pwd: '' 
  };

  componentDidMount() {
    this.initAsync()
  }

  async initAsync() {
    await GoogleSignIn.initAsync({
      clientId: Constants.manifest.extra.clientId,
    });
    this._syncUserWithStateAsync();
  }

  async _syncUserWithStateAsync() {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  }

  async googleSignInAsync() {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  }

  async emailSignInAsync() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd)
      .then((result) => {
        if (result.user)
          this.props.navigation.goBack();
        else
          throw new Error('Unable to login. Unknown Error Occurred. Please Try Again');
      })
      .catch((error) => {
        Alert.alert('Login Error', error.message, [
          {
            text: 'Okay',
            style: 'cancel'
          },
        ])
      });
  }

  render() {
    return (
      <View style={styles.mainView}>
        <>
          <Text style={styles.signIntText}>User Sign-In</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
            placeholder="E-Mail"
            textContentType="emailAddress"
            autoCompleteType="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({ pwd: text })}
            value={this.state.pwd}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
            autoCompleteType="password"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={[styles.button, { 
              backgroundColor: (this.state.email.length == 0 || this.state.pwd.length == 0) ? 
                Constants.manifest.extra.defaultColor.systemGray3 : Constants.manifest.extra.defaultColor.systemBlue
            }]}
            onPress={this.emailSignInAsync.bind(this)}
            disabled={this.state.email.length == 0 || this.state.pwd.length == 0}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>Sign-In with E-Mail</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'white' }]}
            onPress={this.googleSignInAsync.bind(this)}
          >
            <Text style={[styles.buttonText, { color: "black" }]}>Sign-In with Google</Text>
          </TouchableOpacity>
        </>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Constants.manifest.extra.defaultColor.secondarySystemBackground,
  },
  signIntText: {
    fontSize: 28, 
    marginBottom: 30,
    textAlign: "center",
  },
  textInput: {
    fontSize: 17,
    borderRadius: 4,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    padding: 16,
    borderRadius: 4,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 17,
  },
  separator: {
    borderBottomColor: Constants.manifest.extra.defaultColor.systemGray3,
    borderBottomWidth: 1, 
    marginBottom: 40  
  }
})