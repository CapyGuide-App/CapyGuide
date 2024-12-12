import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {
  Bookmark,
  Heart,
  MessageCircle,
} from 'lucide-react-native';
import { fetchReactionBlog } from '../request/DataRequest';
import { formatRelativeTime } from '../styles/Methods';
import {useTheme} from '@rneui/themed';

interface PostProps {
  item: any;
  onPress: () => void;
}

const Post: React.FC<PostProps> = ({item, onPress}) => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
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
        {/* <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>{item.category}</Text>
        </View> */}

        <View style={{flex: 1}}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.commentText} numberOfLines={2}>
            {item.short_description}
          </Text>
        </View>

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
          color={theme.colors.primary}
          fill={save ? theme.colors.primary : 'transparent'}
          onPress={onPressBookMark}
        />
        <View style={[styles.reactionRow, {marginTop: 44}]}>
          <Heart size={12} color="#f44" fill="#f44" />
          <Text style={styles.reactionText}>{item.reactions}</Text>
        </View>
        <View style={styles.reactionRow}>
          <MessageCircle size={12} color={theme.colors.black} fill={theme.colors.black} />
          <Text style={styles.reactionText}>{item.comments}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    postContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.element,
      margin: 10,
      marginBottom: 0,
      borderRadius: 12,
      elevation: 4,
    },
    thumbnail: {
      width: 100,
      height: 100,
      borderRadius: 6,
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
      height: '100%',
      flexDirection: 'column',
    },
    categoryContainer: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.element,
      borderRadius: 12,
      paddingVertical: 2,
      paddingHorizontal: 8,
      marginBottom: 4,
    },
    categoryLabel: {
      fontSize: 10,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginLeft: 2,
      lineHeight: 20,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 'auto',
    },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: 12,
      marginRight: 8,
    },
    author: {
      fontSize: 12,
      color: theme.colors.text,
      fontWeight: '500',
    },
    date: {
      fontSize: 9,
      color: theme.colors.dimText,
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
      color: theme.colors.dimText,
      marginLeft: 4,
      minWidth: 25,
    },
    commentText: {
      fontSize: 10,
      color: theme.colors.dimText,
      marginLeft: 4,
    },
  });

export default Post;
