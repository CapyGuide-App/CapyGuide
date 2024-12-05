import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {
  Bookmark,
  MoreVertical,
  Heart,
  MessageCircle,
} from 'lucide-react-native';
import { fetchReactionBlog } from '../request/DataRequest';
import { format } from 'date-fns';
import { formatRelativeTime } from '../styles/Methods';

interface PostProps {
  item: any;
  onPress: () => void;
}

const Post: React.FC<PostProps> = ({
  item,
  onPress,
}) => {
  const [save, setSave] = useState(false);

  const onPressBookMark = () => {
    const newSave = !save;
    setSave(newSave);
    fetchReactionBlog(item.id, 'save', newSave);
  };

  useEffect(() => {
    setSave(item.saved);
  }, [item.saved]);

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
      <Image source={{uri: item.picture}} style={styles.thumbnail} />

      <View style={styles.textContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>{item.category}</Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.infoRow}>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          <View>
            <Text style={styles.author}>{item.displayname}</Text>
            <Text style={styles.date}>{formatRelativeTime(item.created_at)}</Text>
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
          <Text style={styles.reactionText}>{item.reactions}</Text>
        </View>
        <View style={styles.reactionRow}>
          <MessageCircle size={12} color="#555" />
          <Text style={styles.commentText}>{item.commentCount}</Text>
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
