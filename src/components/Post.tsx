import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {
  Bookmark,
  MoreVertical,
  Heart,
  MessageCircle,
} from 'lucide-react-native';

interface PostProps {
  category: string;
  author: string;
  avatar: string;
  title: string;
  date: string;
  images: string[];
  reactionCount: number;
  commentCount: number;
  onPress: () => void;
}

const Post: React.FC<PostProps> = ({
  category,
  author,
  avatar,
  title,
  date,
  images,
  reactionCount,
  commentCount,
  onPress,
}) => {
  const [save, setSave] = useState(false);

  const onPressBookMark = () => {
    setSave(!save);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.postContainer,
        {
          transform: pressed ? [{scale: 0.9}] : [{scale: 1}],
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      {images.length > 0 && (
        <Image source={{uri: images[0]}} style={styles.thumbnail} />
      )}

      <View style={styles.textContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>{category}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.infoRow}>
          <Image source={{uri: avatar}} style={styles.avatar} />
          <View>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionIcons}>
          <Bookmark
            size={22}
            color="#EA9400"
            fill={save ? '#EA9400' : 'white'}
            onPress={onPressBookMark}
          />
        <View style={[styles.reactionRow, {marginTop: 46}]}>
          <Heart size={12} color="#f44" />
          <Text style={styles.reactionText}>{reactionCount}</Text>
        </View>
        <View style={styles.reactionRow}>
          <MessageCircle size={12} color="#555" />
          <Text style={styles.commentText}>{commentCount}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    margin: 10,
    marginBottom: 0,
    borderRadius: 12,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 6,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  categoryLabel: {
    fontSize: 10,
    color: '#EA9400',
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    marginLeft: 2,
    lineHeight: 20,
    height: 40,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 12,
    marginRight: 8,
  },
  author: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  date: {
    fontSize: 9,
    color: '#888',
    marginTop: 2,
  },
  actionIcons: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  reactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
  commentText: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
});

export default Post;
