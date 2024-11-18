import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import VisibilityOptionModal from '../components/VisibilityOptionModal';
import PostOptions from '../components/PostOptions';
import styles from '../styles/AddPostStyles';

const AddPostScreen: React.FC = ({ navigation }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedVisibilityOption, setSelectedVisibilityOption] = useState('🌍 Công khai');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]); // Mảng lưu trữ ảnh được chọn

  const visibilityOptions = [
    { id: '1', label: '🌍 Công khai' },
    { id: '2', label: '👥 Bạn bè' },
    { id: '3', label: '🔒 Chỉ mình tôi' },
    { id: '4', label: '🌟 Bạn thân' },
  ];

  const handlePostSubmit = () => {
    if (postContent.trim() === '') {
      return;
    }
    console.log('Nội dung bài viết:', postContent);
    console.log('Ảnh đã chọn:', selectedImages);
    navigation.goBack();
  };

  const addImage = (imageUri: string | null) => {
    if (imageUri) {
      setSelectedImages((prevImages) => [...prevImages, imageUri]); // Thêm ảnh mới vào danh sách
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={[
            styles.headerButton,
            { backgroundColor: postContent.trim() ? '#007BFF' : '#ccc' },
          ]}
          onPress={postContent.trim() ? handlePostSubmit : undefined}
        >
          <Text
            style={[
              styles.headerButtonText,
              { color: postContent.trim() ? '#fff' : '#888' },
            ]}
          >
            Đăng
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, postContent]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/271731848_1860371254351185_7983418418645333699_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHmgBV7HKmnmIFs7EB4DBicagPguRLKezpqA-C5Esp7OkSzJxGwFE6YoEwlgCHTsAw-vNfX8L76wFCjzYUhrGQb&_nc_ohc=hvjEMDS_a60Q7kNvgEhsf0N&_nc_zt=23&_nc_ht=scontent.fhan20-1.fna&_nc_gid=APpC2E-sJATzePD5qgENbWw&oh=00_AYCF1IkIf04Tubsg9TVECaFOoXXArJvt1-4xk2XZAvUgFQ&oe=673F93A9' }}
          style={styles.profilePic}
        />
        <View>
          <Text style={styles.userName}>Mẫn Thị Bích Lợi</Text>
          <View style={styles.quickOptionRow}>
            <TouchableOpacity
              style={styles.quickOption}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.visibilityOptionText}>
                {selectedVisibilityOption}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickOption}>
              <Text style={styles.quickOptionText}>+ Album</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Tiên sinh muốn đăng gì?"
        placeholderTextColor="#888"
        multiline
        value={postContent}
        onChangeText={setPostContent}
      />

<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.imageScroll}>
        {/* Hiển thị danh sách ảnh */}
        {selectedImages.map((imageUri, index) => (
          <Image
            key={index}
            source={{ uri: imageUri }}
            style={styles.imagePreview} // Style cho từng ảnh
          />
        ))}
      </ScrollView>

      <ScrollView>
        {/* Truyền callback để nhận ảnh từ PostOptions */}
        <PostOptions
          onImagePicked={(imageUri) => addImage(imageUri)}
        />
      </ScrollView>

      <VisibilityOptionModal
        visible={modalVisible}
        options={visibilityOptions}
        onSelect={(option) => {
          setSelectedVisibilityOption(option);
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default AddPostScreen;
