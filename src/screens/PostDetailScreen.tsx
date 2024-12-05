import React, {useEffect, useState} from 'react';
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
  TouchableWithoutFeedback,
  Linking,
  ActivityIndicator,
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
import { fetchBlog, fetchReactionBlog, reloadData } from '../request/DataRequest';
import ErrorContent from '../components/ErrorContent';
import BottomSheet, { BottomSheetFooter, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { formatRelativeTime } from '../styles/Methods';

const {width} = Dimensions.get('window');

const PostContent = ({post}: any) => {
  return (
    <View style={{paddingBottom: 90}}>
      <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{post.category}</Text>
          </View>
          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.metadataRow}>
            <Image source={{uri: post.avatar}} style={styles.avatar} />
            <View>
              <Text style={styles.author}>{post.displayname}</Text>
              <Text style={styles.metadata}>
                {post && formatRelativeTime(post.created_at)} • {post.views} views
              </Text>
            </View>
          </View>
        </View>
        {post.content.map((element: any, index: number) => {
          switch (element.content_type) {
            case 'text':
              return <Text key={index} style={styles.textContent}>{element.content_data}</Text>;
            case 'image':
              return (
                <View style={styles.inlineImageContainer} key={index}>
                  <Image source={{uri: element.content_data}} style={styles.inlineImage} />
                </View>
              );
            case 'link':
              return (
                <Text style={{color: '#007BFF'}} onPress={() => Linking.openURL(element.content_data)} key={index}>
                  {element.content_data}
                </Text>
              );
            case 'video':
              return (
                <View key={index}>
                  <Text>Video: {element.content_data}</Text>
                </View>
              );
            default:
              return null;
          }
        })}
    </View>
  );
};

const PostDetailScreen: React.FC<any> = ({route}) => {
  const {postId} = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const request = fetchBlog(postId, controller.signal);
    reloadData(request, setPost, setStatus);

    return () => {
      controller.abort();
    };
  }, [postId]);

  const reload = () => {
    const request = fetchBlog(postId);
    reloadData(request, setPost, setStatus);
  };

  const handleShare = async ({title, url}: {title: string; url?: string}) => {
    try {
      await Share.open({
        title: 'Share Post',
        message: `Bạn ơi, đọc bài viết này hay lắm: ${title}`,
        url: `https://api.suzueyume.id.vn/blog/${postId}/share` || url || '',
      }).then(() => console.log('Share Success'));
    } catch (error) {
      console.log('Share Error: ', error);
    }
  };

  const handleReactions = (type: string) => {
    switch (type) {
      case 'love':
        const newLoved = !loved;
        setLoved(newLoved);
        fetchReactionBlog(postId, 'reaction', newLoved);
        break;
      case 'save':
        setSaved(!saved);
        fetchReactionBlog(postId, 'save', !saved);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (post) {
      setLoved(post.loved);
      setSaved(post.saved);
    }
  }, [post]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const renderFooter = (props: any) => {
    return (
      <BottomSheetFooter {...props}>
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleReactions('love')}>
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
            onPress={() => handleReactions('save')}>
            <Bookmark size={24} color="#333" fill={saved ? '#333' : 'white'} />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare({title: post?.title, url: post?.picture})}>
            <Share2 size={24} color="#333" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
  )}

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Pressable onPress={openModal}>
          {post?.picture && <Image source={{uri: post?.picture}} style={styles.titleImage} />}
        </Pressable>
      </View>

      <BottomSheet
        snapPoints={['75%']}
        index={0}
        footerComponent={renderFooter}
        animateOnMount={false}
        overDragResistanceFactor={1}
      >
        <BottomSheetScrollView style={styles.scrollContent}>
          <View>
            {status === 'loading' && <ActivityIndicator size="large" color="#007BFF" />}
            {status === 'error' && <ErrorContent onRetry={reload} />}
            {status === 'success' && <PostContent post={post} />}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  titleImage: {
    width: '100%',
    height: 230,
    resizeMode: 'cover',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
  scrollContent: {
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  content: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
    marginBottom: 20,
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

  textContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  inlineImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inlineImage: {
    width: '80%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
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
