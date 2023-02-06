import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWelcome: {
    fontSize: 18,
    marginTop: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    marginTop: 38,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  fotgotpass: {
    textAlign: 'left',
    marginLeft: 30,
    marginTop: 14,
  },
  toRegister2: {
    marginRight: 6,
    color: '#0A9DE9',
    fontSize: 16,
  },
  toRegister: {
    fontSize: 16,
  },
  viewRegister: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 100,
  },
  SubmitButton: {
    marginTop: 25,
    marginHorizontal: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default styles;
