import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Share2} from 'lucide-react-native';
import Share from 'react-native-share';

interface PostShareProps {
  title: string;
  url?: string;
}

const PostShare: React.FC<PostShareProps> = ({title, url}) => {
  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Share Post',
        message: `Check out this post: ${title}`,
        url: url || '', // Pass a URL if available
      });
    } catch (error) {
      console.log('Share Error: ', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
      <Share2 size={20} color="#333" />
      <Text style={styles.actionText}>Chia sẻ</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
    width: 100,
  },
});

export default PostShare;
