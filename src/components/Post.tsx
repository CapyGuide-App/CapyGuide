import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ReactionButton from './ReactionButton';
import CommentsModal from './CommentsModal';
import PostImage from './PostImage';
import Share from 'react-native-share';

interface PostProps {
  author: string;
  avatar: string;
  title: string;
  description: string;
  images: string[];
}

const Post: React.FC<PostProps> = ({author, avatar, title, description, images}) => {
  const [reactions, setReactions] = useState({
    like: 1200,
    love: 800,
    haha: 300,
    wow: 50,
    sad: 20,
    angry: 10,
  });
  const [commentsCount, setCommentsCount] = useState(1900);
  const [sharesCount, setSharesCount] = useState(352);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const handleReact = (reaction: string) => {
    setReactions(prev => ({
      ...prev,
      [reaction]: (prev[reaction] || 0) + 1,
    }));
  };

  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Chia sẻ bài viết',
        message: `Hãy xem bài viết này: ${title}`,
        url: images[0],
      });
      setSharesCount(prev => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.authorContainer}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.authorName}>{author}</Text>
      </View>

      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postDescription}>{description}</Text>
      <PostImage images={images} />

      <View style={styles.interactionSummary}>
        <View style={styles.reactionsContainer}>
          <Text style={styles.reactionIcons}>
            👍 ❤️
          </Text>
          <Text style={styles.interactionText}>
            {formatCount(
              Object.values(reactions).reduce((a, b) => a + b, 0)
            )} cảm xúc
          </Text>
        </View>
        <Text style={styles.interactionText}>
          {formatCount(commentsCount)} bình luận
        </Text>
        <Text style={styles.interactionText}>
          {formatCount(sharesCount)} lượt chia sẻ
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleReact}>
          <Text style={styles.icon}>👍</Text>
          <Text style={styles.actionText}>Thích</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowCommentsModal(true)}>
          <Text style={styles.icon}>💬</Text>
          <Text style={styles.actionText}>Bình luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Text style={styles.icon}>↗️</Text>
          <Text style={styles.actionText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>

      <CommentsModal
        visible={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={[
          {id: 1, user: 'Lương Sơn Bá', content: 'Xào cặp đến "cháy nhà" luôn 😂'},
          {id: 2, user: 'Tran Linda', content: 'Hợp thật!'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 2,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  interactionSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  reactionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionIcons: {
    fontSize: 16,
    marginRight: 5,
  },
  interactionText: {
    fontSize: 14,
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  actionText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Post;
