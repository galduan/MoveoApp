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
import {IconButton} from 'react-native-paper';

interface Props {
  onPress: any;
  style?: any;
}

const AddNoteButton: React.FC<Props> = ({onPress, style}) => {
  return (
    <IconButton
      onPress={onPress}
      icon="plus"
      size={40}
      style={[
        {position: 'absolute', bottom: 10, left: 10, borderWidth: 1},
        style,
      ]}
    />
  );
};

export default AddNoteButton;
