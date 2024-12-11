import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './components/MainTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import AddPostScreen from './screens/AddPostScreen';
import {LocationProvider, useLocation} from './context/LocationContext';
import {useAuth} from './context/AuthContext';
import DetailScreen from './screens/DetailScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AccountScreen from './screens/AccountScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import AppearanceScreen from './screens/AppearanceScreen';
import SecurityScreen from './screens/SecurityScreen';
import HelpScreen from './screens/HelpScreen';
import AboutScreen from './screens/AboutScreen';
import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {MAPBOX_ACCESS_TOKEN, GOOGLE_CLIENT_ID} from '@env';
import { StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';

const Stack = createStackNavigator();

Mapbox.requestAndroidLocationPermissions();
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
});

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
  </Stack.Navigator>
);

const MainStack = () => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const {saveLocation, updateLocation} = useLocation();

  useEffect(() => {
    updateLocation();
    const watchId = Geolocation.watchPosition(
      position => {
        saveLocation(position);
      },
      error => console.error('Error watching position:', error.message),
      {
        enableHighAccuracy: true,
        distanceFilter: 200,
        interval: 15000,
        fastestInterval: 10000,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        
      />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        
      />
      <Stack.Screen
        name="ProfileSettingScreen"
        component={ProfileSettingsScreen}
        
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        
      />

      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        
      />
      <Stack.Screen
        name="AppearanceScreen"
        component={AppearanceScreen}
        
      />
      <Stack.Screen
        name="SecurityScreen"
        component={SecurityScreen}
        
      />
      <Stack.Screen
        name="HelpScreen"
        component={HelpScreen}
        
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        
      />
    </Stack.Navigator>
  );
};

const MainContainer = () => {
  const {isUserLoggedIn} = useAuth();

  return (
    <NavigationContainer>
      {isUserLoggedIn ? (
        <LocationProvider>
          <MainStack />
        </LocationProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const dynamicStyles = (theme: any) => StyleSheet.create({
  header: {
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    color: theme.colors.text,
  },
});

export default MainContainer;
