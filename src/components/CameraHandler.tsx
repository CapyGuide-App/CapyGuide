import React from 'react';
import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface CameraHandlerProps {
  onImageSelected: (imageUri: string) => void;
}

const CameraHandler: React.FC<CameraHandlerProps> = ({ onImageSelected }) => {
  const handleCameraPress = () => {
    Alert.alert(
      'Chọn tùy chọn',
      'Bạn muốn chụp ảnh hay chọn từ thư viện?',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Thư viện', onPress: openLibrary },
        { text: 'Hủy', style: 'cancel' },
      ]
    );
  };

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
    });

    if (result.assets && result.assets[0].uri) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const openLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets[0].uri) {
      onImageSelected(result.assets[0].uri);
    }
  };

  return { handleCameraPress };
};

export default CameraHandler;
