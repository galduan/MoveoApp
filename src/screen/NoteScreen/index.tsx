import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './style';

import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParams} from '../../navigation/AuthStack';
import {TextInput} from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';
import { HomeStackParams } from '../../navigation/HomeStack';
import { Note } from '../../types';

const NoteScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
    const note:Note = useRoute<any>()?.params
    
  const onPressEdit = () => {
    navigation.navigate('AddNote',note)
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.date}>date: {note.date}</Text>
        <Text style={styles.body}>{note.body}</Text>

      </SafeAreaView>
    </View>
  );
};

export default NoteScreen;
