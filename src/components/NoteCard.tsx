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
import {Note} from '../types';

interface Props {
  note: Note;
  onPress: any;
}

const NoteCard: React.FC<Props> = ({onPress, note}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        style={styles.container}
        colors={['#85EDFA', '#0A9DE9']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Text
          style={{
            fontSize: 20,
          }}>
          {note.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}>
          {note.date}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    paddingVertical:20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center'
  },
});
export default NoteCard;
