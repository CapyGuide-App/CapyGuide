import React, { Children } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { House, Search, Plus, LayoutList, User } from 'lucide-react-native';
import { useTheme } from '@rneui/themed';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBarButton from './CustomTabBarButton';

const Tab = createBottomTabNavigator();

const HOME_NAME = 'Home';
const SEARCH_NAME = 'Search';
const ADD_NAME = 'Add';
const POST_NAME = 'Post';
const PROFILE_NAME = 'Profile';

const MainTabNavigator: React.FC = () => {
    const { theme } = useTheme();
    const iconColor = theme.colors.primary;

    return (
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ color, ...props }) => {
                        let icon;
                        let rn = route.name;
                        switch (rn) {
                            case HOME_NAME:
                                icon = <House color={color} {...props} />;
                                break;
                            case SEARCH_NAME:
                                icon = <Search color={color} {...props} />;
                                break;
                            case ADD_NAME:
                                icon = <Plus color={'white'} size={35}/>;
                                break;
                            case POST_NAME:
                                icon = <LayoutList color={color} {...props} />;
                                break;
                            case PROFILE_NAME:
                                icon = <User color={color} {...props}/>;
                                break;
                        }

                        return icon;
                    },
                    headerShown: false,
                    tabBarShowIcon: true,
                    tabBarInactiveTintColor: 'gray',
                    tabBarActiveTintColor: iconColor,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        height: 60,
                    },
                })
            }
        >

            <Tab.Screen name={HOME_NAME} component={HomeScreen} />
            <Tab.Screen name={SEARCH_NAME} component={ExploreScreen} />
            <Tab.Screen name={ADD_NAME} component={HomeScreen} 
                options={
                    ({ navigation }) => ({
                        tabBarButton: (props) => (
                            <CustomTabBarButton 
                                {...props}
                                navigation={navigation}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    backgroundColor: iconColor
                                }}
                            />
                        ),
                    })
                }
            />
            <Tab.Screen name={POST_NAME} component={HomeScreen} />
            <Tab.Screen name={PROFILE_NAME} component={HomeScreen} />
        </Tab.Navigator>
  );
};

export default MainTabNavigator;
