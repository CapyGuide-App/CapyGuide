import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Link } from 'lucide-react-native';

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
    <Modal visible={isVisible} transparent animationType="fade">
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

          <TouchableOpacity style={styles.addButton} onPress={handleAddLink}>
            <Text style={styles.addButtonText}>Thêm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    paddingVertical: 5,
  },
  addButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});
