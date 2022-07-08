import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import SplashScreen from '../screens/static/SplashScreen';
import SignUp from '../screens/user/Signup';
import SignIn from '../screens/user/SignIn';

const StackNavigation: FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="splash_screen" component={SplashScreen} /> */}
        <Stack.Screen name="sign_in" component={SignIn} />
        <Stack.Screen name="sign_up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
