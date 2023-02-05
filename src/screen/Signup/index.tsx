import React, {useState} from 'react';
import {
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
  View,
  SafeAreaView,
} from 'react-native';
import styles from './style';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthStack';
import {TextInput} from 'react-native-paper';

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailerr, setEmailerr] = useState(false);
  const [passworderr, setPassworderr] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onPress = () => {
    const user: any = {
      email: email,
      password: password,
      password2: password2,
    };

    email == '' ? setEmailerr(true) : setEmailerr(false);
    password == '' ? setPassworderr(true) : setPassworderr(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={{marginTop: 0}}
          onChangeText={setEmail}
          value={email}
          placeholder="אימייל"
          keyboardType="email-address"
          error={emailerr}
        />

        <TextInput
          style={{marginTop: 12}}
          onChangeText={setPassword}
          value={password}
          placeholder="סיסמא"
          secureTextEntry={passwordVisible}
          error={passworderr}
          icon={
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <TextInput
          style={{marginTop: 12}}
          onChangeText={setPassword2}
          value={password2}
          placeholder="אימות סיסמא"
          passwordVisible={passwordVisible}
          error={passworderr}
          icon={
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <View style={styles.signinScreen}>
          <Text
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.text3}>
            התחבר
          </Text>
          <Text style={styles.text3b}>יש לך כבר חשבון אצלנו?</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signup;
