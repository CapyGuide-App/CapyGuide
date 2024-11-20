import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface CameraHandlerProps {
  onImageSelected: (imageUri: string) => void;
}

const CameraHandler: React.FC<CameraHandlerProps> = ({ onImageSelected }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCameraPress = () => {
    setIsModalVisible(true);
  };

  const openCamera = async () => {
    setIsModalVisible(false);
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
    });

    if (result.assets && result.assets[0].uri) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const openLibrary = async () => {
    setIsModalVisible(false);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets && result.assets[0].uri) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const closeModal = () => setIsModalVisible(false);

  return (
    <View>
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn tùy chọn</Text>
          <TouchableOpacity style={styles.optionButton} onPress={openCamera}>
            <Text style={styles.optionText}>📷 Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={openLibrary}>
            <Text style={styles.optionText}>📁 Thư viện</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {handleCameraPress && <View />}
    </View>
  );
};

export default CameraHandler;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});
