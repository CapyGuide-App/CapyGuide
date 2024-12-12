import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Heart, MessageCircle, Bookmark, Share2} from 'lucide-react-native';
import Share from 'react-native-share';
import {useTheme} from '@rneui/themed';
import { fetchReactionBlog, fetchReactionPOI } from '../request/DataRequest';

interface PostProps {
  item: any;
  onComment: () => void;
  type: string;
}

const BottomBar: React.FC<PostProps> = ({item, onComment, type}) => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (item) {
      setLoved(item.loved ?? false);
      setSaved(item.saved ?? false);
    }
  }, [item]);

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

  const handleReactions = (reactionType: string) => {
    switch (reactionType) {
      case 'love':
        const newLoved = !loved;
        setLoved(newLoved);
        (type === 'blog' ? fetchReactionBlog : fetchReactionPOI)(item.id, 'reaction', newLoved);
        break;
      case 'save':
        setSaved(!saved);
        (type === 'blog' ? fetchReactionBlog : fetchReactionPOI)(item.id, 'save', !saved);
        break;
      default:
        break;
    }
  };

  return (
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

      <TouchableOpacity style={styles.actionButton} onPress={onComment}>
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
        onPress={() => handleShare({title: item.name, url: item.url})}>
        <Share2 size={24} color={theme.colors.black} />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
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
      color: theme.colors.black,
      marginTop: 4,
      width: 60,
      textAlign: 'center',
    },
  });

export default BottomBar;
