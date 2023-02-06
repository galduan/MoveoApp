import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import styles from './style';

import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {TextInput} from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';
import {HomeStackParams} from '../../navigation/HomeStack';
import {Note} from '../../types';

import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker';
import Geolocation from '@react-native-community/geolocation';
const AddNote = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const reference = firebase
    .app()
    .database(
      'https://note-app-cf00a-default-rtdb.europe-west1.firebasedatabase.app/',
    );

  const note = useRoute<any>()?.params;

  const [title, setTitle] = useState(note?.note?.title || '');
  const [body, setBody] = useState(note?.note?.body || '');

  const [date, setDate] = useState(new Date(note?.note?.date||new Date()));
  const [open, setOpen] = useState(false);

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
              buttonPositive: 'Ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('ok');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const onPressSave = () => {
    const newNote: Note = {
      title: title,
      body: body,
      date: date.getTime(),
      location: {
        long: currentLongitude,
        lat: currentLatitude,
      },
    };
    if (locationStatus === 'ok') {
      if (note?.key) {
        reference
          .ref(`/users/${auth().currentUser?.uid}/notes/${note.key}`)
          .update(newNote)
          .then(() =>
            navigation.navigate('NoteScreen', {note: newNote, key: note.key}),
          )
          .catch(error => {
            console.log(error);
          });
      } else {
        reference
          .ref(`/users/${auth().currentUser?.uid}/notes`)
          .push()
          .set(newNote)
          .then(() => navigation.goBack())
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      Alert.alert('Cant Get Location');
    }
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

        <View style={styles.dateView}>
          <Text style={styles.dateText}>Date: {date.toLocaleDateString()}</Text>
          <SubmitButton
            text="Change Date"
            onPress={() => setOpen(true)}
            style={styles.changeDate}
          />
        </View>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        <TextInput
          mode="outlined"
          label="body"
          style={styles.body}
          multiline
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
