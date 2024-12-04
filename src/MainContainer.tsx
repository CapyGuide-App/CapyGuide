import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './components/MainTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import AddPostScreen from './screens/AddPostScreen';
import {LocationProvider, useLocation} from './context/LocationContext';
import { AuthProvider, useAuth } from "./context/AuthContext";
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
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {MAPBOX_ACCESS_TOKEN, GOOGLE_CLIENT_ID} from '@env';

const Stack = createStackNavigator();

Mapbox.requestAndroidLocationPermissions();
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
});

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
  </Stack.Navigator>
);

const MainStack = () => {
  const { saveLocation, updateLocation } = useLocation();

  useEffect(() => {
    updateLocation();
    const watchId = Geolocation.watchPosition(
      (position) => {
        saveLocation(position);
      },
      (error) => console.error("Error watching position:", error.message),
      {
        enableHighAccuracy: true,
        distanceFilter: 200,
        interval: 15000,
        fastestInterval: 10000,
      }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: "Tạo bài viết",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          presentation: "modal",
        }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Chi tiết" }} />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{ title: "Chi tiết bài viết" }}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
      <Stack.Screen
        name="ProfileSettingScreen"
        component={ProfileSettingsScreen}
        options={{ title: "Chỉnh sửa hồ sơ" }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ title: "Thay đổi mật khẩu" }}
      />

        <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Tài khoản' }} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ title: 'Thông báo' }} />
        <Stack.Screen name="AppearanceScreen" component={AppearanceScreen} options={{ title: 'Giao diện' }} />
        <Stack.Screen name="SecurityScreen" component={SecurityScreen} options={{ title: 'Bảo mật' }} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Trợ giúp' }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'Về CapyGuide' }} />
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

export default MainContainer;
