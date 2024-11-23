import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {
  removeImage,
  setDefaultImage,
} from '../components/AvatarHandler'; // Import các hàm xử lý
import CameraHandler from '../components/CameraHandler'; // Import CameraHandler
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react-native'; // Import các icon từ lucide-react-native



const AvatarSettingsScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null); // Lưu đường dẫn ảnh
  const [isCameraHandlerVisible, setCameraHandlerVisible] = useState(false); // Trạng thái hiển thị modal

  // Mở modal CameraHandler
  const showImagePicker = () => {
    setCameraHandlerVisible(true);
  };
  return (
    <View style={styles.container}>
      
      {/* Avatar Placeholder */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: imageUri || 'https://via.placeholder.com/100', // Hiển thị ảnh hoặc ảnh mặc định
          }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon} onPress={()=> showImagePicker()}>
          <Text style={styles.editIconText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Buttons */}
         
        <TouchableOpacity onPress={()=> showImagePicker()}>
          <View style = {styles.groupButton}> 
          <Upload size={20} color="#555" />
          <Text style={styles.button}>Tải hình mới</Text>
          </View>
        </TouchableOpacity>
      
      <TouchableOpacity onPress={() => removeImage(setImageUri, imageUri)}>
        <View style = {styles.groupButton}> 
        <Trash2 size={20} color="#555" />
        <Text style={styles.button}>Xóa hình đại diện</Text>
        </View>

      </TouchableOpacity>

      
      <TouchableOpacity onPress={() => setDefaultImage(setImageUri)}>
        <View style = {styles.groupButton}>
        <ImageIcon size={20} color="#555" />
        <Text style={styles.button}>Đặt hình mặc định</Text>
        </View>
      </TouchableOpacity>
      
      <CameraHandler
        isVisible={isCameraHandlerVisible}
        onImageSelected={(uri) => setImageUri(uri)} // Cập nhật ảnh khi chọn
        onClose={() => setCameraHandlerVisible(false)} // Đóng modal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#ffcc00',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  editIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    fontSize: 18,
    marginLeft: 10,
    color: '#555',
    width: '60%',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  groupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#555', 
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10, 
    paddingLeft: 5, 
  },
});
export default AvatarSettingsScreen;
