import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  body: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    height: 200,
  },
  SubmitButton: {
    marginTop: 25,
    marginHorizontal: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  dateText: {
    fontSize: 20,
  },
  changeDate: {
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
