import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Linking,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  PencilLineIcon,
  ChevronLeft,
  ArrowLeft,
} from 'lucide-react-native';
import Share from 'react-native-share';
import {fetchBlog, fetchReactionBlog, reloadData} from '../request/DataRequest';
import ErrorContent from '../components/ErrorContent';
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {formatRelativeTime} from '../styles/Methods';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import {useTheme} from '@rneui/themed';
import ModalComment from '../components/ModalComment';
const {width} = Dimensions.get('window');

const PostContent: React.FC<{
  post: any;
  setCurrentImageUri: any;
  openModal: any;
}> = ({post, setCurrentImageUri, openModal}) => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  return (
    <View style={{paddingBottom: 90}}>
      <View style={styles.content}>
        {/* <View style={styles.categoryContainer}>
          <Text style={styles.category}>{post.category}</Text>
        </View> */}
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
            return (
              <Text key={index} style={styles.textContent}>
                {element.content_data}
              </Text>
            );
          case 'image':
            console.log(element);
            return (
              <View style={styles.inlineImageContainer} key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentImageUri(element.content_data);
                    openModal();
                  }}>
                  <Image
                    source={{uri: element.content_data}}
                    style={styles.inlineImage}
                  />
                </TouchableOpacity>
              </View>
            );
          case 'link':
            return (
              <Text
                style={{color: theme.colors.link}}
                onPress={() => Linking.openURL(element.content_data)}
                key={index}>
                {element.content_data}
              </Text>
            );
          case 'video':
            return (
              <View key={index}>
                <Video
                  source={{uri: element.content_data}}
                  style={{width: width - 40, height: 200}}
                  controls
                  paused
                />
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
  const navigation = useNavigation();
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const {postId} = route.params;
  const [currentImageUri, setCurrentImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);

  interface Post {
    picture?: string;
    category?: string;
    title?: string;
    avatar?: string;
    displayname?: string;
    created_at?: string;
    views?: number;
    content: Array<{content_type: string; content_data: string}>;
    loved?: boolean;
    saved?: boolean;
    url?: string;
    owner?: boolean;
  }

  const [post, setPost] = useState<Post | null>(null);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(
    'loading',
  );
  const [commentModalVisible, setCommentModalVisible] = useState(false);

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
  };

  useEffect(() => {
    if (post) {
      // console.log(post);
      setLoved(post.loved ?? false);
      setSaved(post.saved ?? false);
    }
  }, [post]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, []),
  );

  const renderFooter = (props: any) => {
    return (
      <BottomSheetFooter {...props}>
        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleReactions('love')}>
            <Heart
              size={24}
              color={loved ? '#ff5050' : theme.colors.black}
              fill={loved ? '#ff5050' : 'none'}
            />
            <Text
              style={[
                styles.actionText,
                {color: loved ? '#ff5050' : theme.colors.black},
              ]}>
              Love
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setCommentModalVisible(true)}>
            <MessageCircle size={24} color={theme.colors.black} />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleReactions('save')}>
            <Bookmark
              size={24}
              color={theme.colors.black}
              fill={saved ? theme.colors.black : 'transparent'}
            />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              handleShare({title: post?.title ?? '', url: post?.picture ?? ''})
            }>
            <Share2 size={24} color={theme.colors.black} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFooter>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <ChevronLeft size={24} color={theme.colors.white} />
        </TouchableOpacity>
        {post?.owner && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddPost', {title: 'Edit Post', post})
            }
            style={styles.headerButton}>
            <PencilLineIcon size={24} color={theme.colors.white} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.imageWrapper}>
        <Pressable
          onPress={() => {
            setCurrentImageUri(post?.picture ?? null);
            openModal();
          }}>
          {post?.picture && (
            <Image source={{uri: post?.picture}} style={styles.titleImage} />
          )}
        </Pressable>
      </View>

      <BottomSheet
        snapPoints={['80%']}
        index={0}
        footerComponent={renderFooter}
        animateOnMount={false}
        overDragResistanceFactor={1}
        backgroundStyle={{
          borderRadius: 20,
          backgroundColor: theme.colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.text,
        }}>
        <BottomSheetScrollView style={styles.scrollContent}>
          <View>
            {status === 'loading' && (
              <ActivityIndicator size="large" color="#007BFF" />
            )}
            {status === 'error' && <ErrorContent onRetry={reload} />}
            {status === 'success' && (
              <PostContent
                post={post}
                setCurrentImageUri={setCurrentImageUri}
                openModal={openModal}
              />
            )}
          </View>

          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalContainer}>
                <TouchableOpacity
                  style={styles.closeModal}
                  onPress={closeModal}>
                  <ArrowLeft size={40} color="#fff" />
                </TouchableOpacity>
                <View style={styles.innerContainer}>
                  {currentImageUri && (
                    <Image
                      source={{uri: currentImageUri}}
                      style={styles.fullImage}
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <ModalComment
            visible={commentModalVisible}
            onClose={() => setCommentModalVisible(false)}
            onSubmit={comment => {
              console.log('Bình luận:', comment);
              setCommentModalVisible(false);
            }}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    fixedHeader: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: 'transparent',
      zIndex: 1000,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: {width: 0, height: 2},
    },
    headerButton: {
      padding: 10,
      borderRadius: '50%',
      backgroundColor: `${theme.colors.black}CC`,
    },
    titleImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },
    imageWrapper: {
      position: 'relative',
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
    innerContainer: {
      width: '95%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
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
      paddingHorizontal: 20,
      overflow: 'hidden',
      backgroundColor: theme.colors.background,
    },
    content: {
      borderBottomWidth: 2,
      marginBottom: 20,
      borderBottomColor: theme.colors.border,
    },
    categoryContainer: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.element,
      borderRadius: 12,
      paddingVertical: 4,
      paddingHorizontal: 8,
      marginBottom: 10,
    },
    category: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.text,
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
      color: theme.colors.text,
    },
    metadata: {
      fontSize: 14,
      color: theme.colors.dimText,
      marginTop: 2,
      minWidth: '100%',
    },

    textContent: {
      fontSize: 16,
      lineHeight: 24,
      color: theme.colors.text,
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
    link: {color: theme.colors.link},
    actionBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      backgroundColor: theme.colors.background,
    },
    actionButton: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionText: {
      fontSize: 12,
      color: theme.colors.text,
      marginTop: 4,
      width: 60,
      textAlign: 'center',
    },
  });

export default PostDetailScreen;
