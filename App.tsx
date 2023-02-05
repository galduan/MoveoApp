import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreenStack from './src/navigation/AuthStack';
import HomeScreenStack from './src/navigation/HomeStack';

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthScreenStack /> */}
      <HomeScreenStack/>
    </NavigationContainer>
  );
}
