import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/AddPostStyles';

interface PostOptionsProps {
  onImagePicked: (imageUri: string | null) => void; // Nhận callback từ AddPostScreen
}

const PostOptions: React.FC<PostOptionsProps> = ({ onImagePicked }) => {
  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.didCancel) {
      Alert.alert('Đã hủy', 'Bạn chưa chọn ảnh nào.');
    } else if (result.assets) {
      const imageUri = result.assets[0].uri;
      onImagePicked(imageUri || null); // Gửi ảnh đã chọn về AddPostScreen
    } else {
      Alert.alert('Lỗi', 'Không thể chọn ảnh.');
    }
  };

  const handleCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
    });

    if (result.didCancel) {
      Alert.alert('Đã hủy', 'Bạn chưa chụp ảnh nào.');
    } else if (result.assets) {
      const imageUri = result.assets[0].uri;
      onImagePicked(imageUri || null); // Gửi ảnh đã chụp về AddPostScreen
    } else {
      Alert.alert('Lỗi', 'Không thể sử dụng camera.');
    }
  };

  const options = [
    { icon: '📷', label: 'Ảnh/Video', action: handleImagePicker },
    { icon: '📸', label: 'Camera', action: handleCamera },
    { icon: '👤', label: 'Gắn thẻ người khác' },
    { icon: '😊', label: 'Cảm xúc/hoạt động' },
    { icon: '📍', label: 'Check-in' },
    { icon: '📹', label: 'Video trực tiếp' },
    { icon: '🎨', label: 'Màu nền' },
  ];

  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.postOptionRow}
          onPress={option.action}
        >
          <Text style={styles.postOptionIcon}>{option.icon}</Text>
          <Text style={styles.postOptionLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PostOptions;
