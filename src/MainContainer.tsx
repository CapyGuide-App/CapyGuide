import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigator from './components/MainTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import AddPostScreen from './screens/AddPostScreen';
import { LocationProvider } from './context/LocationContext';
import { requestLocationPermission } from './Permissions';
import DetailScreen from './screens/DetailScreen'
import PostDetailScreen from './screens/PostDetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import AvatarSettingScreen from './screens/AvatarSettingScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
const Stack = createStackNavigator();

requestLocationPermission();

const MainContainer: React.FC = () => {
  return (
    <NavigationContainer>
      <LocationProvider>
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
          <Stack.Screen 
            name="AvatarSettingScreen" 
            component={AvatarSettingScreen} 
            options={{title: 'Hình đại diện'}}
          />
          <Stack.Screen 
            name="ChangePasswordScreen" 
            component={ChangePasswordScreen} 
            options={{title: 'Thay đổi mật khẩu'}}
          />
        </Stack.Navigator>
      </LocationProvider>
    </NavigationContainer>
  );
};

export default MainContainer;
