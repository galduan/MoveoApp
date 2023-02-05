import React from 'react';
import {
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  text: String;
  onPress: any;
  style: any;
  textStyle: any;
}

const SubmitButton: React.FC<Props> = ({onPress, text, style, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={style}
        colors={['#85EDFA', '#0A9DE9']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Text style={textStyle}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SubmitButton;
