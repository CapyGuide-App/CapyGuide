import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainTabNavigator from './components/MainTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import AddPostScreen from './screens/AddPostScreen';
import { LocationProvider } from './context/LocationContext';
import { requestLocationPermission } from './Permissions';

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
                            presentation: 'modal',
                        }}
                    />
                </Stack.Navigator>
            </LocationProvider>
        </NavigationContainer>
    );
}

export default MainContainer;