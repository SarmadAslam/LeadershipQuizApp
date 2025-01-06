import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Required for navigation context
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultScreen';
import LeadershipStylesInfo from '../screens/LeadershipStylesInfo.js';
import ProfileSetting from '../screens/ProfileSetting.js';
import Profile from '../screens/Profile.js';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer> {/* This is required for the navigation context */}
      <Stack.Navigator 
      screenOptions={{contentStyle: {backgroundColor: "white"}}}
      initialRouteName="Splash">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Results" component={ResultsScreen} />
        <Stack.Screen name="LeadershipStylesInfo" component={LeadershipStylesInfo} />
        <Stack.Screen name="ProfileSetting" component={ProfileSetting} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
