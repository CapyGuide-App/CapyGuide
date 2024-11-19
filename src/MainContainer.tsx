import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import './i18n/i18n';
import MainTabNavigator from './components/MainTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import AddPostScreen from './screens/AddPostScreen';
import DetailScreen from './components/DetailScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
