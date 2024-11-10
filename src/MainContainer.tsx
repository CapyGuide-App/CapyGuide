import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, Search, Plus, LayoutList, User } from 'lucide-react-native';
import { useTheme } from '@rneui/themed';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';

const HOME_NAME = 'Home';
const SEARCH_NAME = 'Search';
const ADD_NAME = 'Add';
const POST_NAME = 'Post';
const PROFILE_NAME = 'Profile';

const Tab = createBottomTabNavigator();

const MainContainer: React.FC = () => {
    const { theme } = useTheme();
    const iconColor = theme.colors.primary;

    const CustomTabBarButton = ({children, onPress}: {children: React.ReactNode, onPress: () => void}) => (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            <View style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: iconColor,
            }}>
                {children}
            </View>
        </TouchableOpacity>
    );

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={
                    ({ route }) => ({
                        tabBarIcon: ({ color, ...props }) => {
                            let iconIcon;
                            let rn = route.name;

                            if (rn === HOME_NAME) {
                                iconIcon = <House color={color} {...props} />;
                            } else if (rn === SEARCH_NAME) {
                                iconIcon = <Search color={color} {...props} />;
                            } else if (rn === ADD_NAME) {
                                iconIcon = <Plus color={'white'} size={35}/>;
                            } else if (rn === POST_NAME) {
                                iconIcon = <LayoutList color={color} {...props} />;
                            } else if (rn === PROFILE_NAME) {
                                iconIcon = <User color={color} {...props}/>;
                            }

                            return iconIcon;
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
                    options={{
                        tabBarButton: (props) => (
                            <CustomTabBarButton {...props} />
                        ),

                    }}
                />
                <Tab.Screen name={POST_NAME} component={HomeScreen} />
                <Tab.Screen name={PROFILE_NAME} component={HomeScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;