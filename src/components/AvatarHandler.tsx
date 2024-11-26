import { Alert } from 'react-native';

// Xóa hình đại diện
export const removeImage = (
  setImageUri: (uri: string | null) => void,
  imageUri: string | null
) => {
  if (imageUri) {
    setImageUri(null); // Xóa ảnh hiện tại
    Alert.alert('Thành công', 'Hình đại diện đã được xóa!');
  } else {
    Alert.alert('Thông báo', 'Không có hình đại diện nào để xóa.');
  }
};

// Đặt làm mặc định
export const setDefaultImage = (setImageUri: (uri: string | null) => void) => {
  const defaultImageUri = 'https://via.placeholder.com/100'; // Đường dẫn ảnh mặc định
  setImageUri(defaultImageUri);
  Alert.alert('Thành công', 'Hình đại diện mặc định đã được áp dụng!');
};
