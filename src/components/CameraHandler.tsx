import React from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { Camera, Folder } from 'lucide-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface CameraHandlerProps {
  onImageSelected: (image: any) => void;
  isVisible: boolean;
  onClose: () => void;
}

const CameraHandler: React.FC<CameraHandlerProps> = ({
  onImageSelected,
  isVisible,
  onClose,
}) => {
  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: false,
    });
    if (result.assets && result.assets[0].uri) {
      onImageSelected(result.assets[0].uri);
    }
    onClose();
  };

  const openLibrary = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.assets && result.assets[0].uri) {
      onImageSelected(result.assets[0].uri);
    }
    onClose();
  };

  const cameraOptions = [
    {
      icon: <Camera size={24} color="#FF9800" />,
      label: 'Chụp ảnh',
      action: openCamera,
    },
    {
      icon: <Folder size={24} color="#FF9800" />,
      label: 'Thư viện',
      action: openLibrary,
    },
  ];

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Chọn tùy chọn</Text>
          {cameraOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalButton}
              onPress={option.action}
            >
              <View style={styles.modalOption}>
                {option.icon}
                <Text style={styles.modalButtonText} numberOfLines={1}>
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.modalCancel} onPress={onClose}>
            <Text style={styles.modalCancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CameraHandler;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFEF8',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#FF9800',
    marginLeft: 10,
    textAlign: 'center',
  },
  modalCancel: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    textAlign: 'center',
  },
});
