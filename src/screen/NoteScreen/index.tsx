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

import {useRoute} from '@react-navigation/native';


const NoteScreen = () => {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const note = useRoute<any>()?.params;



  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.date}>date: {note.note.date}</Text>
        <Text style={styles.body}>{note.note.body}</Text>
      </SafeAreaView>
    </View>
  );
};

export default NoteScreen;
