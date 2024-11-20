import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface PostProps {
  author: string;
  avatar: string;
  title: string;
  description: string;
  images: string[];
  reactions: { like: number; love: number };
  commentsCount: number;
  onPress: () => void;
}

const Post: React.FC<PostProps> = ({
  author,
  avatar,
  title,
  description,
  images,
  reactions,
  commentsCount,
  onPress,
}) => {
  const formatCount = (count: number) =>
    count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.postContainer}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {images.length > 0 && (
            <Image source={{ uri: images[0] }} style={styles.thumbnail} />
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.author} numberOfLines={1}>{author}</Text>
          <Text style={styles.time}>4 giờ trước</Text>
        </View>

        <View style={styles.interactions}>
          <Text style={styles.interactionText}>❤️ {formatCount(reactions.love)}</Text>
          <Text style={styles.interactionText}>👍 {formatCount(reactions.like)}</Text>
          <Text style={styles.commentText}>💬 {formatCount(commentsCount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginRight: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  author: {
    fontSize: 12,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  interactionText: {
    fontSize: 12,
    color: '#555',
  },
  commentText: {
    fontSize: 12,
    color: '#555',
  },
});

export default Post;
