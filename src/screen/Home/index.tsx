import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import styles from './style';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParams} from '../../navigation/AuthStack';
import {TextInput} from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';
import {Note} from '../../types';
import NoteCard from '../../components/NoteCard';
import AddNote from '../AddNote';
import AddNoteButton from '../../components/AddNote';
import {HomeStackParams} from '../../navigation/HomeStack';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const list: Note[] = [
    {
      id: 1,
      date: '10/10/1999',
      title: 'titl1',
      body: 'body, xxxxx,xxx',
      location: 's',
    },
    {
      id: 2,
      date: '10/10/1999',
      title: 'title2',
      body: 'body, xxxxx,xxx',
      location: 's',
    },
    {
      id: 3,
      date: '10/10/1999',
      title: 'title3',
      body: 'body, xxxxx,xxx',
      location: 's',
    },
  ];
  const [name] = useState('');
  const [notes, setNotes] = useState<Note[]>(list);
  useEffect(() => {}, []);

  const onPressAddNoteButton = () => {
    navigation.navigate('AddNote');
  };
  const onPressNoteCard = (pressed: Note) => {
    navigation.navigate('NoteScreen', pressed);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textWelcome}>Notes</Text>
        <FlatList
          data={notes}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return <NoteCard note={item} onPress={()=>onPressNoteCard(item)} />;
          }}
        />
        <AddNoteButton onPress={onPressAddNoteButton} />
      </SafeAreaView>
    </View>
  );
};

export default Home;
