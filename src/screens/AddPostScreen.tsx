import React, {useState} from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import {
  Plus,
  Image as ImageIcon,
  VideoIcon,
  Link,
  Pencil,
  X,
} from 'lucide-react-native';
import CameraHandler from '../components/CameraHandler';
import AddVideoHandler from '../components/AddVideoHandler';
import AddLinkHandler from '../components/AddLinkHandler';
import Video from 'react-native-video';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface AddPostScreenProps {
  navigation: NavigationProp<any>;
}

const AddPostScreen: React.FC<AddPostScreenProps> = ({navigation}) => {
  const [postTitle, setPostTitle] = useState('');
  const [selectedTitleImage, setSelectedTitleImage] = useState<string | null>(
    null,
  );
  const [isTitleImageHandlerVisible, setIsTitleImageHandlerVisible] =
    useState(false);
  const [shortDescription, setShortDescription] = useState('');
  const [postElements, setPostElements] = useState<any[]>([]);
  const [isCameraHandlerVisible, setIsCameraHandlerVisible] = useState(false);
  const [isVideoHandlerVisible, setIsVideoHandlerVisible] = useState(false);
  const [isLinkHandlerVisible, setIsLinkHandlerVisible] = useState(false);
  const [newTextContent, setNewTextContent] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingElement, setEditingElement] = useState<any>(null);
  const [editContent, setEditContent] = useState('');
  const [editUrl, setEditUrl] = useState('');

  const handleImageSelected = (imageUri: string) => {
    setPostElements(prev => [...prev, {type: 'image', src: imageUri}]);
  };

  const handleTitleImageSelected = (imageUri: string) => {
    setSelectedTitleImage(imageUri);
  };

  const handleVideoSelected = (videoUri: string) => {
    setPostElements(prev => [...prev, {type: 'video', src: videoUri}]);
  };

  const handleLinkAdded = (link: {title: string; url: string}) => {
    setPostElements(prev => [
      ...prev,
      {type: 'link', title: link.title, url: link.url},
    ]);
  };

  const handleDoneAddingText = () => {
    if (newTextContent.trim()) {
      setPostElements(prev => [
        ...prev,
        {type: 'text', content: newTextContent},
      ]);
    }
    setNewTextContent('');
  };

  const handleDeleteElement = (index: number) => {
    setPostElements(prev => prev.filter((_, i) => i !== index));
  };

  const handlePostSubmit = () => {
    if (postElements.length === 0 || postTitle.trim() === '') {
      return;
    }

    const newPost = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      author: 'Mẫn Thị Bích Lợi', // Replace with the actual author
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD
      views: 0, // Initial views
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg', // Replace with the actual avatar
      title: postTitle,
      reactions: {like: 0, love: 0}, // Initial reactions
      commentsCount: 0, // Initial comments count
      category: 'Ẩm thực', // Replace with a category picker if necessary
      titleImage: postElements.find(el => el.type === 'image')?.src || '', // Use the first image as the title image
      elements: postElements.map(el => {
        if (el.type === 'text') {
          return {type: 'text', content: el.content};
        } else if (el.type === 'image') {
          return {type: 'image', src: el.src, alt: 'Image Description'};
        } else if (el.type === 'video') {
          return {type: 'video', src: el.src};
        } else if (el.type === 'link') {
          return {type: 'link', title: el.title, url: el.url};
        }
        return el;
      }),
    };

    console.log('New Post:', JSON.stringify(newPost, null, 2));
    navigation.goBack();
  };

  const handleEditElement = (element: any) => {
    setEditingElement(element);
    setEditContent(element.type === 'text' ? element.content : element.title);
    setEditUrl(element.type === 'link' ? element.url : '');
    setIsModalVisible(true);
  };

  const handleSaveElement = () => {
    setPostElements(prev =>
      prev.map(el => {
        if (el === editingElement) {
          if (el.type === 'text') {
            return {...el, content: editContent};
          } else if (el.type === 'link') {
            return {...el, title: editContent, url: editUrl};
          }
        }
        return el;
      }),
    );
    setIsModalVisible(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={[
            styles.headerButton,
            {
              backgroundColor:
                postElements.length > 0 && postTitle.trim()
                  ? '#007BFF'
                  : '#ccc',
            },
          ]}
          onPress={
            postElements.length > 0 && postTitle.trim()
              ? handlePostSubmit
              : undefined
          }>
          <Text
            style={[
              styles.headerButtonText,
              {
                color:
                  postElements.length > 0 && postTitle.trim() ? '#fff' : '#888',
              },
            ]}>
            Đăng
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, postTitle, postElements]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.imagePicker,
            selectedTitleImage && {backgroundColor: 'transparent'},
          ]}
          onPress={() => setIsTitleImageHandlerVisible(true)}>
          {selectedTitleImage ? (
            <Image
              source={{uri: selectedTitleImage}}
              style={styles.titleImagePreview}
            />
          ) : (
            <Text style={styles.imagePickerText}>Chọn ảnh</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.titleInput}
          placeholder="Tiêu đề bài viết"
          placeholderTextColor="#aaa"
          value={postTitle}
          onChangeText={setPostTitle}
        />
      </View>
      <TextInput
        style={styles.shortDescriptionInput}
        placeholder="Giới thiệu ngắn ..."
        placeholderTextColor="#aaa"
        multiline
        value={shortDescription}
        onChangeText={setShortDescription}
      />

      <View style={styles.contentSection}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={handleDoneAddingText}>
          <Plus color="#ddd" size={24} />
        </TouchableOpacity>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Nhập nội dung ..."
            placeholderTextColor="#aaa"
            multiline
            value={newTextContent}
            onChangeText={setNewTextContent}
          />
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.roundButton}>
          <Plus color="#ddd" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsCameraHandlerVisible(true)}>
          <ImageIcon color="#000" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsVideoHandlerVisible(true)}>
          <VideoIcon color="#000" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setIsLinkHandlerVisible(true)}>
          <Link color="#000" size={30} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.previewContainer}>
        {postElements.map((el, index) => (
          <View key={index} style={styles.previewElement}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteElement(index)}>
              <X color="#000" size={20} />
            </TouchableOpacity>
            {(el.type === 'text' || el.type === 'link') && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditElement(el)}>
                <Pencil color="#000" size={20} />
              </TouchableOpacity>
            )}

            {el.type === 'text' && (
              <Text style={styles.textPreview}>{el.content}</Text>
            )}
            {el.type === 'image' && (
              <Image source={{uri: el.src}} style={styles.imagePreview} />
            )}
            {el.type === 'video' && (
              <View style={styles.videoContainer}>
                <Video
                  source={{uri: el.src}}
                  style={styles.videoPreview}
                  controls
                  resizeMode="cover"
                />
              </View>
            )}
            {el.type === 'link' && (
              <TouchableOpacity
                onPress={() => {
                  let url = el.url;

                  if (
                    !url.startsWith('http://') &&
                    !url.startsWith('https://')
                  ) {
                    url = `https://${url}`;
                  }

                  Linking.openURL(url).catch(err =>
                    console.error('Failed to open URL:', err),
                  );
                }}>
                <Text style={styles.linkTitle}>{el.title}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <CameraHandler
        isVisible={isCameraHandlerVisible}
        onClose={() => setIsCameraHandlerVisible(false)}
        onImageSelected={handleImageSelected}
      />

      <CameraHandler
        isVisible={isTitleImageHandlerVisible}
        onClose={() => setIsTitleImageHandlerVisible(false)}
        onImageSelected={handleTitleImageSelected}
      />

      <AddVideoHandler
        isVisible={isVideoHandlerVisible}
        onClose={() => setIsVideoHandlerVisible(false)}
        onVideoSelected={handleVideoSelected}
      />

      <AddLinkHandler
        isVisible={isLinkHandlerVisible}
        onClose={() => setIsLinkHandlerVisible(false)}
        onLinkAdded={handleLinkAdded}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingElement?.type === 'text' ? 'Edit Text' : 'Edit Link'}
            </Text>

            <TextInput
              style={styles.modalInput}
              value={editContent}
              onChangeText={setEditContent}
              placeholder={
                editingElement?.type === 'text'
                  ? 'Enter new text'
                  : 'Enter link title'
              }
            />

            {editingElement?.type === 'link' && (
              <TextInput
                style={styles.modalInput}
                value={editUrl}
                onChangeText={setEditUrl}
                placeholder="Enter link URL"
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveElement}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    minWidth: 100,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleImagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#333',
  },
  titleInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  shortDescriptionInput: {
    fontSize: 16,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  contentSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  roundButton: {
    width: 45,
    height: 45,
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textInputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    fontSize: 16,
    color: '#333',
    minHeight: 40,
    maxHeight: 200,
    textAlignVertical: 'center',
  },
  addContentButton: {
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 50,
    height: 45,
  },
  actionButton: {
    color: '#000',
    padding: 10,
    borderRadius: 5,
  },
  previewContainer: {
    marginTop: 20,
  },
  previewElement: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#333',
  },
  textPreview: {
    fontSize: 16,
    color: '#333',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  videoContainer: {
    marginVertical: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  linkTitle: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  linkUrl: {
    fontSize: 14,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 40,
    zIndex: 1,
  },
});
