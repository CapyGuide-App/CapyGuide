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
  Pressable,
} from 'react-native';
import {
  Plus,
  Image as ImageIcon,
  VideoIcon,
  Link,
  Edit,
  X,
  ArrowUp,
  ArrowDown,
  Menu,
} from 'lucide-react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';
import CameraHandler from '../components/CameraHandler';
import AddVideoHandler from '../components/AddVideoHandler';
import AddLinkHandler from '../components/AddLinkHandler';
import Video from 'react-native-video';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { fetchCreatePost } from '../request/DataRequest';

interface AddPostScreenProps {
  navigation: NavigationProp<any>;
}

const AddPostScreen: React.FC<AddPostScreenProps> = ({navigation}) => {
  const [postTitle, setPostTitle] = useState('');
  const [selectedTitleImage, setSelectedTitleImage] = useState<any | null>(
    null,
  );
  const [isTitleImageHandlerVisible, setIsTitleImageHandlerVisible] =
    useState(false);
  const [postElements, setPostElements] = useState<any[]>([]);
  const [isCameraHandlerVisible, setIsCameraHandlerVisible] = useState(false);
  const [isVideoHandlerVisible, setIsVideoHandlerVisible] = useState(false);
  const [isLinkHandlerVisible, setIsLinkHandlerVisible] = useState(false);
  const [newTextContent, setNewTextContent] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingElement, setEditingElement] = useState<any>(null);
  const [editContent, setEditContent] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [cntElements, setCntElements] = useState(0);

  const handleImageSelected = (image) => {
    if (editingElement) {
      setPostElements(prev =>
        prev.map(el => (el === editingElement ? image : el)),
      );
      setEditingElement(null);
    } else {
      setCntElements(cntElements + 1);
      setPostElements(prev => [
        ...prev,
        {...image,}
      ]);
    }
    setIsCameraHandlerVisible(false);
  };

  const handleTitleImageSelected = (image: any) => {
    setSelectedTitleImage(image);
  };

  const handleVideoSelected = (video: any) => {
    if (editingElement) {
      setPostElements(prev =>
        prev.map(el => (el === editingElement ? video : el)),
      );
      setEditingElement(null);
    } else {
      setCntElements(cntElements + 1);
      setPostElements(prev => [
        ...prev,
        {...video,}
      ]);
    }
    setIsVideoHandlerVisible(false);
  };

  const handleLinkAdded = (link: {title: string; url: string}) => {
    setCntElements(cntElements + 1);
    setPostElements(prev => [
      ...prev,
      {type: 'link', title: link.title, url: link.url},
    ]);
  };

  const handleDoneAddingText = () => {
    if (newTextContent.trim()) {
      setCntElements(cntElements + 1);
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
    console.log(postElements);

    fetchCreatePost(postTitle, selectedTitleImage, postElements).then(() => {
      navigation.goBack();
    });
  };

  const handleEditElement = (element: any) => {
    if (element.type === 'text') {
      setEditingElement(element);
      setEditContent(element.content);
      setIsModalVisible(true);
    } else if (element.type === 'link') {
      setEditingElement(element);
      setEditContent(element.title);
      setEditUrl(element.url);
      setIsModalVisible(true);
    } else if (element.type === 'image') {
      setIsCameraHandlerVisible(true);
      setEditingElement(element);
    } else if (element.type === 'video') {
      setIsVideoHandlerVisible(true);
      setEditingElement(element);
    }
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

  function keyExtractor(item: any, index: number) {
    return `${item.type}-${index}`;
  }

  function renderItem(info: DragListRenderItemInfo<any>) {
    const {item, onDragStart, onDragEnd, isActive} = info;

    return (
      <View style={styles.previewElement}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteElement(item)}>
          <X color="#000" size={22} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditElement(item)}>
          <Edit color="#000" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dragButton}
          onPressIn={onDragStart}
          onPressOut={onDragEnd}>
          <Menu color="#000" size={20} />
        </TouchableOpacity>

        {item.type === 'text' && (
          <Text style={styles.textPreview}>{item.content}</Text>
        )}
        {item.type.startsWith('image') && (
          <Image source={{uri: item.uri}} style={styles.imagePreview} />
        )}
        {item.type.startsWith('video') && (
          <View style={styles.videoContainer}>
            <Video
              source={{uri: item.uri}}
              style={styles.videoPreview}
              controls
              resizeMode="cover"
            />
          </View>
        )}
        {item.type === 'link' && (
          <TouchableOpacity
            onPress={() => {
              let url = item.url;

              if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = `https://${url}`;
              }

              Linking.openURL(url).catch(err =>
                console.error('Failed to open URL:', err),
              );
            }}>
            <Text style={styles.linkTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...postElements]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setPostElements(copy);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.previewContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.imagePicker,
              selectedTitleImage && {backgroundColor: 'transparent'},
            ]}
            onPress={() => setIsTitleImageHandlerVisible(true)}>
            {selectedTitleImage ? (
              <Image
                source={{uri: selectedTitleImage.uri}}
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
            multiline
          />
        </View>
        <DragList
          data={postElements}
          keyExtractor={keyExtractor}
          onReordered={onReordered}
          renderItem={renderItem}
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
            onPress={() => {
              setIsCameraHandlerVisible(true);
            }}>
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
              multiline
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
                multiline
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
  previewContainer: {},
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
    top: 5,
    right: 10,
    zIndex: 1,
    padding: 5,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 40,
    zIndex: 1,
    padding: 5,
    borderRadius: 50,
  },
  dragButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 1,
    padding: 5,
    borderRadius: 50,
  },
  upArrowButton: {
    position: 'absolute',
    top: 7,
    right: 90,
  },
  downArrowButton: {
    position: 'absolute',
    top: 7,
    right: 130,
  },
  textPreview: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  videoContainer: {
    marginVertical: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginTop: 20,
  },
  linkTitle: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  videoPreview: {
    width: '100%',
    height: '100%',
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
});
