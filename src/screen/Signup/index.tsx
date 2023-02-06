import React, {useState} from 'react';
import {Text, Dimensions, View, SafeAreaView, Alert} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthStack';
import {TextInput} from 'react-native-paper';
import SubmitButton from '../../components/SubmitButton';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {User} from '../../types';

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const reference = firebase
    .app()
    .database(
      'https://note-app-cf00a-default-rtdb.europe-west1.firebasedatabase.app/',
    );
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [error, setError] = useState('');

  const onPressSumbit = () => {
    email !== '' &&
      password !== '' &&
      password === password2 &&
      name !== '' &&
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          const newUser = {
            email: email,
            name: name,
          };

          reference
            .ref(`/users/${auth().currentUser?.uid}`)
            .set(newUser)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            setError('That email address is invalid!');
          } else if (error.code === 'auth/weak-password') {
            setError('The given password is invalid!');
          } else {
            console.log(error);
            Alert.alert('try again later');
          }
        });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={setName}
          value={name}
          placeholder="name"
          error={name ? false : true}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          keyboardType="email-address"
          error={email ? false : true}
        />

        <TextInput
          style={styles.textInput}
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

        <TextInput
          style={styles.textInput}
          onChangeText={setPassword2}
          value={password2}
          placeholder="repeat password"
          secureTextEntry={passwordVisible}
          error={password2 ? false : true}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <Text style={styles.error}>{error}</Text>
        <SubmitButton
          text="Signup"
          style={styles.SubmitButton}
          onPress={onPressSumbit}
        />
        <View style={styles.viewLogin}>
          <Text style={styles.toLogin}>Already have an account </Text>
          <Text
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.toLogin2}>
            Login
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Signup;
