import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

interface AddLinkHandlerProps {
  onLinkAdded: (link: { title: string; url: string }) => void;
  isVisible: boolean;
  onClose: () => void;
}

const AddLinkHandler: React.FC<AddLinkHandlerProps> = ({ onLinkAdded, isVisible, onClose }) => {
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleAddLink = () => {
    if (linkTitle.trim() && linkUrl.trim()) {
      onLinkAdded({ title: linkTitle, url: linkUrl });
      setLinkTitle('');
      setLinkUrl('');
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thêm liên kết</Text>

          <TextInput
            style={styles.input}
            placeholder="Tiêu đề liên kết"
            placeholderTextColor="#aaa"
            value={linkTitle}
            onChangeText={setLinkTitle}
          />

          <TextInput
            style={styles.input}
            placeholder="URL (https://example.com)"
            placeholderTextColor="#aaa"
            value={linkUrl}
            onChangeText={setLinkUrl}
            keyboardType="url"
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.saveButton} onPress={handleAddLink}>
              <Text style={styles.saveButtonText}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddLinkHandler;

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
  input: {
    width: '100%',
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    marginRight: 5,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 5,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
