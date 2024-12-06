import React from 'react';
import {House, Search, Plus, LayoutList, User} from 'lucide-react-native';
import {useTheme} from '@rneui/themed';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BlogScreen from '../screens/BlogScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import SettingsScreen from '../screens/SettingsScreen';
import { PortalHost } from '@gorhom/portal';

const Tab = createBottomTabNavigator();

const HOME_NAME = 'Home';
const SEARCH_NAME = 'Explore';
const ADD_NAME = 'Add';
const POST_NAME = 'Post';
const PROFILE_NAME = 'Profile';

const {width, height} = Dimensions.get('window');

const TAB_BAR_HEIGHT = 60;

const CustomTabBarBackground = () => {
  const theme = useTheme();
  const styles = dynamicStyles(theme);
  const borderWidth = 10;
  const halfHeight = TAB_BAR_HEIGHT / 2;
  const halfWidth = width / 2;
  const offset = halfHeight + borderWidth;
  const connectionWidth = 20;
  return (
    <View
      style={{
        position: 'absolute',
        top: -offset,
        left: 0,
        right: 0,
        height: TAB_BAR_HEIGHT + offset,
        display: 'flex',
      }}>
      <Svg>
        <Path
          d={`
                        M ${
                          halfWidth - halfHeight - borderWidth - connectionWidth
                        } ${offset}
                        A ${connectionWidth} ${connectionWidth / 2} 0 0 0 ${
            halfWidth - halfHeight - borderWidth + 1
          } ${offset - connectionWidth / 2}
                        L ${halfWidth - halfHeight - borderWidth} ${offset}
                        A ${halfHeight + borderWidth} ${
            halfHeight + borderWidth
          } 0 0 1 ${halfWidth + halfHeight + borderWidth} ${offset}
                        L ${halfWidth + halfHeight + borderWidth - 1} ${
            offset - connectionWidth / 2
          }
                        A ${connectionWidth} ${connectionWidth / 2} 0 0 0 ${
            halfWidth + halfHeight + borderWidth + connectionWidth
          } ${offset}
                        Z
                    `}
          fill={styles.tabBar.backgroundColor}
        />
      </Svg>
    </View>
  );
};

const CustomTabBarButton: React.FC<{children: React.ReactNode, navigation: any, style?: any}> = ({children, navigation, style}) => {
  const onPress = () => {
    navigation.navigate('AddPost');
  };
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View style={style}>{children}</View>
    </TouchableOpacity>
  );
};

const MainTabNavigator: React.FC = () => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);

  return (
    <>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, ...props}) => {
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
              icon = <Plus color={'white'} size={35} />;
              break;
            case POST_NAME:
              icon = <LayoutList color={color} {...props} />;
              break;
            case PROFILE_NAME:
              icon = <User color={color} {...props} />;
              break;
          }

          return icon;
        },
        headerShown: false,
        tabBarShowIcon: true,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: theme.colors.primary,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
          // borderTopLeftRadius: TAB_BAR_HEIGHT / 3,
          // borderTopRightRadius: TAB_BAR_HEIGHT / 3,
          backgroundColor: styles.tabBar.backgroundColor,
          elevation: 0,
          shadowOpacity: 0,
        },
        // tabBarBackground: () => <CustomTabBarBackground />,
      })}>
      <Tab.Screen name={HOME_NAME} component={HomeScreen} />
      <Tab.Screen name={SEARCH_NAME} component={ExploreScreen} />
      <Tab.Screen
        name={ADD_NAME}
        component={HomeScreen}
        options={({navigation}) => ({
          tabBarButton: props => (
            <CustomTabBarButton
              {...props}
              navigation={navigation}
              style={{
                width: TAB_BAR_HEIGHT - 10,
                height: TAB_BAR_HEIGHT - 10,
                borderRadius: TAB_BAR_HEIGHT / 2,
                backgroundColor: theme.colors.primary,
                marginHorizontal: 15,
              }}
            />
          ),
        })}
      />
      <Tab.Screen name={POST_NAME} component={BlogScreen} />
      <Tab.Screen name={PROFILE_NAME} component={SettingsScreen} />
    </Tab.Navigator>
    <PortalHost name="search-bar" />
    </>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.tabBar,
    },
  });

export default MainTabNavigator;
