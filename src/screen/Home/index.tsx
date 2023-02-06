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
  const [notes, setNote] = useState<any>();

  useEffect(() => {
    reference
      .ref(`/users/${auth().currentUser?.uid}/name`)
      .once('value', snapshot => {
        setName(snapshot.val());
      });
    reference
      .ref(`/users/${auth().currentUser?.uid}/notes`)
      .orderByChild('date')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        setNote(snapshot.val());
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
          data={notes ? Object.keys(notes) : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <NoteCard
                note={notes[item]}
                onPress={() => onPressNoteCard(notes[item], item)}
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
