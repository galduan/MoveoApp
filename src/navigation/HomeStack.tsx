import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type HomeStackParams = {
  Home: undefined;
  Note: undefined;
};
const HomeStack = createNativeStackNavigator<HomeStackParams>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Note" component={HomeScreen} />

    </HomeStack.Navigator>
  );
};

export default HomeScreenStack