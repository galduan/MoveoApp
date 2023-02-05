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

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParams} from '../../navigation/AuthStack';
import {TextInput} from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';

const Map = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailerr, setEmailerr] = useState(false);
  const [passworderr, setPassworderr] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(true);

  const onPressLogin = () => {
    const user: any = {
      username: email,
      password: password,
    };
    email == '' ? setEmailerr(true) : setEmailerr(false);
    password == '' ? setPassworderr(true) : setPassworderr(false);
    // email != '' && password != '' ? dispatch(login(user)) : null;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textWelcome}>Map</Text>
      </SafeAreaView>
    </View>
  );
};

export default Map;
