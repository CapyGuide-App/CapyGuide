import React from 'react';
import { View, TouchableOpacity } from 'react-native';

const CustomTabBarButton = ({ children, navigation, style }) => {
  const onPress = () => {
      navigation.navigate("AddPost");
  };
  return (<TouchableOpacity
      style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center',
      }}
      onPress={onPress}
  >
      <View style={style}>
          {children}
      </View>
  </TouchableOpacity>);
}

export default CustomTabBarButton;