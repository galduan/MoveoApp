import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import AddNote from '../screen/AddNote';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../screen/Map';
import {NavigatorScreenParams} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {Note} from '../types';
import NoteScreen from '../screen/NoteScreen';
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
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => <IconButton icon="home" size={size} />,
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({color, size}) => <IconButton icon="map" size={size} />,
          tabBarLabel: 'Map',
        }}
      />
    </BottomTab.Navigator>
  );
};

export type HomeStackParams = {
  BottomTab: NavigatorScreenParams<BottomTabParams>;
  AddNote: undefined | Note;
  NoteScreen: Note;
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
      <HomeStack.Screen
        name="AddNote"
        component={AddNote}
        options={({navigation, route}) => ({
          headerShown: true,
          title: 'New Note',
        })}
      />
      <HomeStack.Screen
        name="NoteScreen"
        component={NoteScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          title: route.params.title,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.navigate('AddNote', route.params)}
              icon="square-edit-outline"
              size={22}
            />
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreenStack;
