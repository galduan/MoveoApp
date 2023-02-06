import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5F4FF',
    flex: 1,
  },
  textInput: {
    marginTop: 38,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  viewLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 100,
  },
  toLogin: {
    fontSize: 16,
  },
  toLogin2: {
    marginRight: 6,
    color: '#0A9DE9',
    fontSize: 16,
  },
  SubmitButton: {
    marginTop: 25,
    marginHorizontal: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.05)',
  },error:{
    color:'red',
    fontSize:16,
    alignSelf:'center',
    marginTop:20
  }
});

export default styles;
