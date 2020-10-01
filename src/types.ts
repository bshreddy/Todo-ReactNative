import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { GoogleSignInType, GoogleUser } from "expo-google-sign-in";
import { Todo } from "./models/Todo";

export type ID = string | undefined
export type User = firebase.User | GoogleUser | null

export type RootStackParamList = {
  mainStack: undefined
  authStack: undefined
}

export type MainTabParamList = {
  Todo: undefined
  Profile: undefined
}
type MainTabScreenNavigationProp = StackNavigationProp<RootStackParamList, 'mainStack'>
export type MainTabScreenProps = {
  navigation: MainTabScreenNavigationProp
}
export type MainTabScreenState = {
  initializing: boolean,
  user: User
}

export type TodoStackParamList = {
  todoMaster: undefined,
  todoDetail: undefined,
}
type TodoStackNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<MainTabParamList, 'Todo'>, MainTabScreenNavigationProp>
export type TodoStackProps = {
  navigation: TodoStackNavigationProp
}

export type ProfileStackParamList = {
  profile: undefined
}
type ProfileStackNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<MainTabParamList, 'Profile'>, MainTabScreenNavigationProp>
export type ProfileStackProps = {
  navigation: ProfileStackNavigationProp
}

export type TodoMasterScreenProps = {
  navigation: CompositeNavigationProp<StackNavigationProp<TodoStackParamList, 'todoMaster'>, TodoStackNavigationProp>
}
export type TodoMasterScreenState = {
  isLoading: boolean,
  refreshing: boolean,
  data: Todo[],
  date: Date,
  user: User
}
export type TodoHeaderProps = {
  date: Date
}

export type ProfileScreenProps = {
  navigation: CompositeNavigationProp<StackNavigationProp<ProfileStackParamList, 'profile'>, ProfileStackNavigationProp>
}
export type ProfileScreenState = { 
  user: User
}
export type ProfileLeftHeaderProps = {
  title: string
}

export type AuthStackParamList = {
  auth: undefined
}
type AuthStackNavigationProp = StackNavigationProp<RootStackParamList, 'authStack'>
export type AuthStackProps = {
  navigation: AuthStackNavigationProp
}

export type AuthScreenProps = {
  navigation: CompositeNavigationProp<StackNavigationProp<AuthStackParamList, 'auth'>, AuthStackNavigationProp>
}
export type AuthScreenState = {
  user: User
  email: string, 
  pwd: string
}