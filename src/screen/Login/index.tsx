import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from './style';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParams} from '../../navigation/AuthStack';
import {TextInput} from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';
import auth from '@react-native-firebase/auth';
const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onPressLogin = () => {
    email != '' &&
      password != '' &&
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          } else if (error.code === 'auth/wrong-password') {
            setError('The given password is wrong!');
          } else {
            console.log(error);
            Alert.alert('try again later');
          }
        });
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
          error={email ? false : true}
        />

        <TextInput
          style={[styles.textInput, {marginTop: 12}]}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={passwordVisible}
          error={password ? false : true}
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
        <Text style={styles.error}>{error}</Text>

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
