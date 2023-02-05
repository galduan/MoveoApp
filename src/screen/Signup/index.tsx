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
import SubmitButton from '../../components/SubmitButton';

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const onPress = () => {
    const user: any = {
      email: email,
      password: password,
      password2: password2,
    };

    email == '' ? setEmailErr(true) : setEmailErr(false);
    password == '' ? setPasswordErr(true) : setPasswordErr(false);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={setName}
          value={name}
          placeholder="name"
          error={emailErr}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          keyboardType="email-address"
          error={emailErr}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={passwordVisible}
          error={passwordErr}
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
          error={passwordErr}
          right={
            <TextInput.Icon
              icon={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
          <SubmitButton
            text="Signup"
            style={styles.SubmitButton}
            onPress={()=>{}}
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
