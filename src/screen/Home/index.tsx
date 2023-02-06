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

  const [user, setUser] = useState<User>();

  useEffect(() => {
    reference.ref(`/users/${auth().currentUser?.uid}`).on('value', snapshot => {
      console.log('User data: ', snapshot.val());
      setUser(snapshot.val());
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
        <Text style={styles.textWelcome}>Welcome {user?.name}</Text>
        <FlatList
        ListEmptyComponent={<Text style={styles.emptyList}>There is no Notes yet</Text>}
          data={user?.notes ? Object.keys(user.notes) : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <NoteCard
                note={user?.notes[item]}
                onPress={() => onPressNoteCard(user?.notes[item], item)}
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
