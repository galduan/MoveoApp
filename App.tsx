import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreenStack from './src/navigation/HomeStack';
import auth from '@react-native-firebase/auth';
import {User} from './src/types';
import AuthScreenStack from './src/navigation/AuthStack';

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();


  // Handle user state changes
  function onAuthStateChanged(user:any) {
    console.log(user);
    
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (!user) {
    return (
      <NavigationContainer>
        <AuthScreenStack />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <HomeScreenStack />
    </NavigationContainer>
  );
}
