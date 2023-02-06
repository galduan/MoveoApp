import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWelcome: {
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  textInput: {
    marginTop: 38,
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 10,
    shadowColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  SubmitButton: {
    marginTop: 25,
    marginHorizontal: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 10,
    shadowColor: 'rgba(0,0,0,0.05)',
  },
  emptyList: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 100,
    // borderWidth: 1,
  },
});

export default styles;
