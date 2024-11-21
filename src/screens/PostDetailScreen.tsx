import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  Heart,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  ArrowLeftCircle,
} from 'lucide-react-native';
import PostShareButton from '../components/PostShare';
import { color } from '@rneui/base';
import renderComment from '../components/renderComment';

const comments = [
  {username: '@vanphuongcute', userRating: '8.9', commentText: 'Chơi rất vui'},
  {username: '@mhiennoob', userRating: '8.2', commentText: 'Phục vụ hơi kém'},
];

const {width} = Dimensions.get('window');

const PostDetailScreen: React.FC<any> = ({route, navigation}) => {
  const {post} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loved, setLoved] = useState(false);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showNextImage = () => {
    if (currentImageIndex < post.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const showPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleThumbnailPress = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image
              source={{uri: post.images[currentImageIndex]}}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dimmedOverlay, styles.arrowLeft]}
            onPress={showPreviousImage}>
            <ArrowLeft size={40} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dimmedOverlay, styles.arrowRight]}
            onPress={showNextImage}>
            <ArrowRight size={40} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.imageIndicator}>
            {currentImageIndex + 1} / {post.images.length}
          </Text>
        </View>

        <FlatList
          data={post.images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => handleThumbnailPress(index)}>
              <Image
                source={{uri: item}}
                style={[
                  styles.thumbnail,
                  index === currentImageIndex && styles.activeThumbnail,
                ]}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeModal} onPress={closeModal}>
              <ArrowLeftCircle size={40} color="#fff" />
            </TouchableOpacity>
            <Image
              source={{uri: post.images[currentImageIndex]}}
              style={styles.fullImage}
            />
            <TouchableOpacity
              style={[styles.dimmedOverlay2, styles.arrowLeft]}
              onPress={showPreviousImage}>
              <ArrowLeft size={40} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dimmedOverlay2, styles.arrowRight]}
              onPress={showNextImage}>
              <ArrowRight size={40} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.imageIndicator2}>
              {currentImageIndex + 1} / {post.images.length}
            </Text>
          </View>
        </View>
      </Modal>

      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.metadata}>
          {post.date} | {post.views} lượt xem | {post.commentsCount} thảo luận |{' '}
          {post.reactions.like + post.reactions.love} thích
        </Text>
        <Text style={styles.description}>{post.description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => {setLoved(!loved)}}>
            <Heart size={20} color={loved ? "#ff5050" : "#333"} fill={loved ? "#ff5050" : "rgba(0, 0, 0, 0)"}/>
            <Text style={[styles.actionText, {color: loved ? "#ff5050" : "#333"}]}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={20} color="#333" />
            <Text style={styles.actionText}>Thảo luận</Text>
          </TouchableOpacity>

          <PostShareButton title={post.title} url={post.url} />
        </View>
      </View>
      <View>
        {comments.map((comment, index) => (
            <View key={index}>
              {renderComment(
                comment.username,
                comment.userRating,
                comment.commentText,
              )}
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  dimmedOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    left: 0,
  },
  arrowRight: {
    right: 0,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{translateX: -width * 0.1}],
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  thumbnailContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  activeThumbnail: {
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  closeModal: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  dimmedOverlay2: {
    position: 'absolute',
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicator2: {
    position: 'absolute',
    bottom: 20,
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  content: {
    padding: 15,
    paddingBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  metadata: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
    width: 100,
  },
});

export default PostDetailScreen;
