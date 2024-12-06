import React, { useEffect, useState } from 'react';
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
import { fetchProfile, fetchUpdateProfile } from '../request/DataRequest';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@rneui/themed';
import { th } from 'date-fns/locale';

const ProfileSettingsScreen = ({ navigation }: { navigation: any }) => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const {currentUser, setCurrentUser} = useAuth();
  const [image, setImage] = useState<{ uri: string, type?: string, name?: string } | null>(null);
  const [name, setName] = useState<string | null>(null); 
  const [username, setUsername] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCameraHandlerVisible, setCameraHandlerVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSaveChanges = () => {
    if (!name || !username) {
      Alert.alert('Error', 'Name and username are required');
      return;
    }

    fetchUpdateProfile({
      displayname: name,
      username,
      bio,
    }, image).then((res) => {
      setCurrentUser(res.user);
      navigation.goBack();
    }).catch((err) => {
      Alert.alert('Error', err.message);
    });
  };

  const openCameraHandler = () => {
    setCameraHandlerVisible(true); 
  };

  const handleImageSelected = (image: any) => {
    setImage(image);
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayname);
      setUsername(currentUser.username);
      setBio(currentUser.bio);
      setImage({ uri: currentUser.avatar });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={openModal}>
          <Image
            source={image?.uri ? { uri: image.uri } : avatar}
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
          value={name || ''}
          onChangeText={setName}
        />

        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={styles.input}
          value={username || ''}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>BIO</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={bio || ''}
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
            source={image?.uri ? { uri: image.uri } : avatar}
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

const dynamicStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
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
    borderColor: theme.colors.border,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: theme.colors.primary,
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
    color: theme.colors.text,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: theme.colors.element,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    color: theme.colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  saveButtonText: {
    color: theme.colors.text,
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
