import React from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from '../styles/AddPostStyles';

interface VisibilityOptionModalProps {
  visible: boolean;
  options: { id: string; label: string }[];
  onSelect: (option: string) => void;
  onClose: () => void;
}

const VisibilityOptionModal: React.FC<VisibilityOptionModalProps> = ({
  visible,
  options,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn quyền riêng tư</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                style={styles.visibilityOptionItem}
                onPress={() => onSelect(item.label)}
              >
                <Text style={styles.visibilityOptionText}>{item.label}</Text>
              </Pressable>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VisibilityOptionModal;
