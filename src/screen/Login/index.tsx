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

const Login = () => {
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
        <Text style={styles.textWelcome}>Login</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          keyboardType="email-address"
          error={emailerr}
        />

        <TextInput
          style={[styles.textInput, {marginTop: 12}]}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={passwordVisible}
          error={passworderr}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <Text
          onPress={() => {
            // navigation.navigate('forgotPassword');
          }}
          style={styles.fotgotpass}>
          forget password
        </Text>

          <SubmitButton
            text="Login"
            style={styles.SubmitButton}
            onPress={onPressLogin}
          />

        <View style={styles.viewRegister}>
          <Text style={styles.toRegister}>Dont Have Account? </Text>
          <Text
            onPress={() => {
              navigation.navigate('Signup');
            }}
            style={styles.toRegister2}>
            Register
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
