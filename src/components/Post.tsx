import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {
  Bookmark,
  MoreVertical,
  Heart,
  MessageCircle,
} from 'lucide-react-native';
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
    setSave(!save);
  };

  useEffect(() => {
    setSave(item.saved);
  }, [item.saved]);

  const date = Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(item.created_at));

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

        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.infoRow}>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          <View>
            <Text style={styles.author}>{item.displayname}</Text>
            <Text style={styles.date}>{date}</Text>
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
        <View style={[styles.reactionRow, {marginTop: 46}]}>
          <Heart size={12} color="#f44" fill="#f44" />
          <Text style={styles.reactionText}>{item.reactions}</Text>
        </View>
        <View style={styles.reactionRow}>
          <MessageCircle size={12} color={theme.colors.black} fill={theme.colors.black} />
          <Text style={styles.commentText}>{item.commentCount}</Text>
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
      marginBottom: 26,
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
    },
    commentText: {
      fontSize: 12,
      color: theme.colors.dimText,
      marginLeft: 4,
    },
  });

export default Post;
