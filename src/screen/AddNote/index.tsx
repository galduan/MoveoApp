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

import {TextInput} from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';
import {HomeStackParams} from '../../navigation/HomeStack';
import {Note} from '../../types';

const AddNote = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const note: Note = useRoute<any>()?.params;
  console.log(note);

  const [title, setTitle] = useState(note.title || '');
  const [body, setBody] = useState(note.body || '');

  const onPressSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={setTitle}
          value={title}
          label="title"
          maxLength={15}
          error={title ? false : true}
        />
        <TextInput
          mode="outlined"
          label="body"
          style={styles.body}
          maxLength={1000}
          onChangeText={setBody}
          value={body}
          error={title ? false : true}
        />
        <SubmitButton
          style={styles.SubmitButton}
          text="Save"
          onPress={onPressSave}
        />
      </SafeAreaView>
    </View>
  );
};

export default AddNote;
