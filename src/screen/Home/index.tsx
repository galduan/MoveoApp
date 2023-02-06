import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, FlatList} from 'react-native';
import styles from './style';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Note, User} from '../../types';
import NoteCard from '../../components/NoteCard';
import AddNoteButton from '../../components/AddNote';
import {HomeStackParams} from '../../navigation/HomeStack';

import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const reference = firebase
    .app()
    .database(
      'https://note-app-cf00a-default-rtdb.europe-west1.firebasedatabase.app/',
    );

  const [name, setName] = useState('');
  const [notes, setNote] = useState<{note: Note; key: string}[]>([]);

  useEffect(() => {
    reference
      .ref(`/users/${auth().currentUser?.uid}/name`)
      .once('value', snapshot => {
        setName(snapshot.val());
      });
    reference
      .ref(`/users/${auth().currentUser?.uid}/notes`)
      .on('value', snapshot => {
        const sortedNotes: {note: Note; key: string}[] = [];
        snapshot.val() &&
          Object.keys(snapshot.val()).forEach(key => {
            sortedNotes.push({note: snapshot.val()[key], key: key});
          });
        sortedNotes.sort((a, b) => (a.note.date < b.note.date ? 1 : -1));
        setNote(sortedNotes);
      });
  }, []);
  const onPressAddNoteButton = () => {
    navigation.navigate('AddNote');
  };
  const onPressNoteCard = (pressed: Note, key: string) => {
    navigation.navigate('NoteScreen', {note: pressed, key: key});
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textWelcome}>Welcome {name}</Text>
        <FlatList
          ListEmptyComponent={
            <Text style={styles.emptyList}>There is no Notes yet</Text>
          }
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <NoteCard
                note={item.note}
                onPress={() => onPressNoteCard(item.note, item.key)}
              />
            );
          }}
        />
        <AddNoteButton onPress={onPressAddNoteButton} />
      </SafeAreaView>
    </View>
  );
};

export default Home;
