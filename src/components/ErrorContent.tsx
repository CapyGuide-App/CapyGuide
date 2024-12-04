import { Icon } from "@rneui/themed";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import errorImage from '../assets/error-icon.png';

const ErrorContent = ({onRetry, style}: { onRetry: () => void, style?: any }) => {
    return (
        <View style={[{ alignItems: 'center', justifyContent: 'center'}, style]}>
          <Image source={errorImage} style={{ 
              width: 80, height: 80, resizeMode: 'contain', tintColor: '#c2c2c2'
          }} />
          <Text style={{ 
              color: 'gray', 
              fontWeight: 'bold',
              fontSize: 16,
          }}>Đã xảy ra lỗi khi tải dữ liệu</Text>
          <Pressable onPress={onRetry}>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
              <Icon name='rotate-right' size={16} color='#bdc0c9' type='font-awesome' />
              <Text style={{ color: '#aaaaaa', fontSize: 16}}>Nhấn để thử lại</Text>
            </View>
          </Pressable>
      </View>
    );
};

export default ErrorContent;