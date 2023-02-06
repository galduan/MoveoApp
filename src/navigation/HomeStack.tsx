import React from 'react';
import {Alert, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screen/Home';
import AddNote from '../screen/AddNote';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../screen/Map';
import {NavigatorScreenParams} from '@react-navigation/native';
import {IconButton} from 'react-native-paper';
import {Note} from '../types';
import NoteScreen from '../screen/NoteScreen';
import {firebase} from '@react-native-firebase/database';

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
          headerShown: true,
          title: 'Notes',
          headerRight: () => (
            <IconButton
              icon="logout"
              size={25}
              onPress={() => {
                Alert.alert('sure you want to Logout?', '', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Logout',
                    onPress: () => {
                      auth()
                        .signOut()
                        .then(() => console.log('User signed out!'));
                    },
                  },
                ]);
              }}
            />
          ),
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
  NoteScreen: {note: Note; key: string};
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
          title: route.params.note.title,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <IconButton
                onPress={() => navigation.navigate('AddNote', route.params)}
                icon="square-edit-outline"
                size={22}
              />
              <IconButton
                onPress={() => {
                  const reference = firebase
                    .app()
                    .database(
                      'https://note-app-cf00a-default-rtdb.europe-west1.firebasedatabase.app/',
                    );
                  reference
                    .ref(
                      `/users/${auth().currentUser?.uid}/notes/${
                        route.params.key
                      }`,
                    )
                    .remove();
                  navigation.goBack();
                }}
                icon="delete"
                size={22}
              />
            </View>
          ),
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeScreenStack;
