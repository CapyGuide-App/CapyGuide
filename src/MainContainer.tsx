import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import './i18n/i18n';
import MainTabNavigator from './components/MainTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import AddPostScreen from './screens/AddPostScreen';
import DetailScreen from './components/DetailScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const MainContainer: React.FC = () => {
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
          options={{title: 'Detail'}}
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
