import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import avatar from '../assets/avatar.jpg';
import CameraHandler from '../components/CameraHandler';

const ProfileSettingsScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null); 
  const [name, setName] = useState('Hiển Nguyễn'); 
  const [username, setUsername] = useState('kaitonmh'); 
  const [bio, setBio] = useState(
    'I am a passionate writer, currently working as a Content Creator at FizzBuzz. Based in Prague.'
  ); 
  const [modalVisible, setModalVisible] = useState(false);
  const [isCameraHandlerVisible, setCameraHandlerVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSaveChanges = () => {
    Alert.alert('Lưu thay đổi', 'Thông tin của bạn đã được cập nhật!');
  };

  const openCameraHandler = () => {
    setCameraHandlerVisible(true); 
  };

  const handleImageSelected = (uri: string) => {
    setImageUri(uri); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={openModal}>
          <Image
            source={imageUri ? { uri: imageUri } : avatar}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editIcon} onPress={openCameraHandler}>
          <Text style={styles.editIconText}>+</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.formContainer}>
        <Text style={styles.label}>NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>BIO</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio}
          onChangeText={setBio}
          multiline={true}
        />
      </View>

      
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save changes</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeModal} onPress={closeModal}>
            <ArrowLeft size={40} color="#fff" />
          </TouchableOpacity>
          <Image
            source={imageUri ? { uri: imageUri } : avatar}
            style={styles.fullImage}
          />
        </View>
      </Modal>

      <CameraHandler
        isVisible={isCameraHandlerVisible}
        onImageSelected={handleImageSelected}
        onClose={() => setCameraHandlerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#E0E0E0',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#ffaa00',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  editIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#ffaa00',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeModal: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default ProfileSettingsScreen;
