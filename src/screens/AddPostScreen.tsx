import React, { useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import PostTaskBar from '../components/PostTaskBar';

const AddPostScreen: React.FC = ({navigation}) => {
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageSelected = (imageUri: string) => {
    setSelectedImages((prevImages) => [...prevImages, imageUri]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  const checkValidPost = () => {
    return (postContent.trim() !== '' || selectedImages.length > 0) && postTitle.trim() !== '';
  }

  const handlePostSubmit = () => {
    if (postContent.trim() === '') {
      return;
    }
    console.log('Title:', postTitle);
    console.log('Content:', postContent);
    console.log('IMGs:', selectedImages);
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={[
            styles.headerButton,
            {backgroundColor: postContent.trim() ? '#007BFF' : '#ccc'},
          ]}
          onPress={postContent.trim() ? handlePostSubmit : undefined}>
          <Text
            style={[
              styles.headerButtonText,
              {color: postContent.trim() ? '#fff' : '#888'},
            ]}>
            Đăng
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, postContent]);

  return (
    <View style={styles.container}>

            <TextInput
        style={styles.titleInput}
        placeholder="Add a title"
        placeholderTextColor="#aaa"
        value={postTitle}
        onChangeText={setPostTitle}
      />

      <TouchableOpacity style={styles.addLocation}>
        <Text style={styles.locationText}>📍 Add location</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.contentInput}
        placeholder="Share your story here."
        placeholderTextColor="#aaa"
        multiline
        value={postContent}
        onChangeText={setPostContent}
      />

      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={styles.imageScroll}
      >
        {selectedImages.map((imageUri, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <PostTaskBar onImageSelected={handleImageSelected} />
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },  
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
    color: '#fff',
    fontWeight: 'bold',
  },titleInput: {
    fontSize: 18,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    paddingBottom: 5,
  },
  addLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#007BFF',
  },
  contentInput: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlignVertical: 'top',
  },
  imageScroll: {
    marginVertical: 10,
    maxHeight: 200,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});
