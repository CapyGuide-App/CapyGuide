import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text } from 'react-native';
import { Camera, Edit, FileText, Smile, MoreHorizontal, Folder } from 'lucide-react-native';
import CameraHandler from './CameraHandler'; // Import CameraHandler

interface PostTaskBarProps {
  onImageSelected: (imageUri: string) => void;
}

const PostTaskBar: React.FC<PostTaskBarProps> = ({ onImageSelected }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { handleCameraPress } = CameraHandler({
    onImageSelected: (imageUri: string) => {
      onImageSelected(imageUri); // Truyền ảnh đã chọn ra ngoài thông qua props
      setIsModalVisible(false); // Đóng modal sau khi chọn ảnh
    },
  });

  const openCameraHandler = () => {
    handleCameraPress(); // Mở tùy chọn CameraHandler
    setIsModalVisible(false); // Đóng modal khi chọn xong
  };

  const options = [
    { icon: <Camera size={24} color="#000" />, action: () => setIsModalVisible(true) },
    { icon: <Edit size={24} color="#000" />, action: () => console.log('Text clicked') },
    { icon: <FileText size={24} color="#000" />, action: () => console.log('List clicked') },
    { icon: <Smile size={24} color="#000" />, action: () => console.log('Emoji clicked') },
    { icon: <MoreHorizontal size={24} color="#000" />, action: () => console.log('More clicked') },
  ];

  const camera_options = [
    {
      icon: <Camera size={24} color="#000" />,
      label: 'Chụp ảnh',
      action: openCameraHandler,
    },
    {
      icon: <Folder size={24} color="#000" />,
      label: 'Thư viện',
      action: handleCameraPress,
    },
  ];

  return (
    <>
      <View style={styles.taskBar}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.taskBarButton}
            onPress={option.action}
          >
            {option.icon}
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal tùy chọn Camera */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chọn tùy chọn</Text>

            {camera_options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalButton}
                onPress={option.action}
              >
                <View style={styles.modalOption}>
                  {option.icon}
                  <Text style={styles.modalButtonText}>{option.label}</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PostTaskBar;

const styles = StyleSheet.create({
  taskBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  taskBarButton: {
    flex: 1,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    textAlign: 'center',
  },
  modalCancel: {
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#FF3B30',
  },
});
