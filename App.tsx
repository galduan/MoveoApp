import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreenStack from './src/navigation/AuthStack';

export default function App() {
  return (
    <NavigationContainer>
      <AuthScreenStack />
    </NavigationContainer>
  );
}
