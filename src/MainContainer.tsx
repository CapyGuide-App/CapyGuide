import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './components/MainTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import AddPostScreen from './screens/AddPostScreen';
import { LocationProvider, useLocation } from './context/LocationContext';
import DetailScreen from './components/DetailScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_ACCESS_TOKEN } from '@env';

const Stack = createStackNavigator();

Mapbox.requestAndroidLocationPermissions();
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MainContainer: React.FC = () => {
  const {saveLocation, updateLocation} = useLocation();

  useEffect(() => {
    updateLocation();
    const watchId = Geolocation.watchPosition(
      position => {
        saveLocation(position);
      },
      error => console.error('Error watching position:', error.message),
      {enableHighAccuracy: true, distanceFilter: 500, interval: 15000, fastestInterval: 10000},
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
            title: 'Tạo bài viết',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{title: 'Chi tiết'}}
        />
        <Stack.Screen
          name="PostDetailScreen"
          component={PostDetailScreen}
          options={{ title: 'Chi tiết bài viết' }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'Hồ sơ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
