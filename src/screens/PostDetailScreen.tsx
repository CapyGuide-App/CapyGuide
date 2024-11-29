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
  Pressable,
} from 'react-native';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react-native';
import Share from 'react-native-share';

const {width} = Dimensions.get('window');

const PostDetailScreen: React.FC<any> = ({route}) => {
  const {post} = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);

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

  const handleShare = async ({title, url}: {title: string; url?: string}) => {
    try {
      await Share.open({
        title: 'Share Post',
        message: `Check out this post: ${title}`,
        url: url || '',
      });
    } catch (error) {
      console.log('Share Error: ', error);
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageWrapper}>
          <Pressable onPress={openModal}>
            <Image
              source={{uri: post.images[currentImageIndex]}}
              style={styles.image}
            />
          </Pressable>

          {currentImageIndex > 0 && (
            <Pressable
              style={[styles.arrowWrapper, styles.arrowLeft]}
              onPress={showPreviousImage}>
              <ArrowLeft size={40} color="#fff" />
            </Pressable>
          )}
          {currentImageIndex < post.images.length - 1 && (
            <Pressable
              style={[styles.arrowWrapper, styles.arrowRight]}
              onPress={showNextImage}>
              <ArrowRight size={40} color="#fff" />
            </Pressable>
          )}

          <Text style={styles.imageIndicator}>
            {currentImageIndex + 1} / {post.images.length}
          </Text>
        </View>


      <ScrollView style={styles.scrollContent}>
        {/* Thumbnails */}
        <FlatList
          data={post.images}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setCurrentImageIndex(index)}>
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

        {/* Content Section */}
        <View style={styles.content}>
          {/* Category */}
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{post.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{post.title}</Text>

          {/* Metadata */}
          <View style={styles.metadataRow}>
            <Image source={{uri: post.avatar}} style={styles.avatar} />
            <View>
              <Text style={styles.author}>{post.author}</Text>
              <Text style={styles.metadata}>
                {post.date} • {post.views} views
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{post.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setLoved(!loved)}>
          <Heart
            size={24}
            color={loved ? '#ff5050' : '#333'}
            fill={loved ? '#ff5050' : 'none'}
          />
          <Text
            style={[styles.actionText, {color: loved ? '#ff5050' : '#333'}]}>
            Love
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle size={24} color="#333" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setSaved(!saved)}>
          <Bookmark size={24} color="#333" fill={saved ? '#333' : 'white'} />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleShare({title: post.title, url: post.url})}>
          <Share2 size={24} color="#333" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Fullscreen Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeModal} onPress={closeModal}>
            <ArrowLeft size={40} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{uri: post.images[currentImageIndex]}}
            style={styles.fullImage}
          />
          {currentImageIndex > 0 && (
            <Pressable
              style={[styles.arrowWrapper, styles.arrowLeft]}
              onPress={showPreviousImage}>
              <ArrowLeft size={40} color="#fff" />
            </Pressable>
          )}
          {currentImageIndex < post.images.length - 1 && (
            <Pressable
              style={[styles.arrowWrapper, styles.arrowRight]}
              onPress={showNextImage}>
              <ArrowRight size={40} color="#fff" />
            </Pressable>
          )}
          <Text style={styles.imageIndicator2}>
            {currentImageIndex + 1} / {post.images.length}
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  arrowWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 50,
    height: 50,
  },
  arrowLeft: {
    top: '50%',
    left: 10,
    transform: [{translateY: -25}],
  },
  arrowRight: {
    top: '50%',
    right: 10,
    transform: [{translateY: -25}],
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{translateX: -width * 0.075}],
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    borderRadius: 10,
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
  thumbnailContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
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
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EA9400',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  metadata: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
    minWidth: '100%',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  actionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    width: 60,
    textAlign: 'center',
  },
});

export default PostDetailScreen;
