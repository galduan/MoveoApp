import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import AddNote from '../screen/AddNote';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../screen/Map';
import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabParams = {
  Home: undefined;
  Map: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParams>();
const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Map" component={Map} />
    </BottomTab.Navigator>
  );
};

export type HomeStackParams = {
  BottomTab: NavigatorScreenParams<BottomTabParams>;
  AddNote: undefined;
  NoteScreen: undefined;
  Map: undefined;
};
const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="BottomTab" component={BottomTabStack} />
      <HomeStack.Screen name="AddNote" component={AddNote} />
      <HomeStack.Screen name="NoteScreen" component={AddNote} />
    </HomeStack.Navigator>
  );
};

export default HomeScreenStack;
