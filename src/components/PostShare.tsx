import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Share from 'react-native-share';

interface PostShareProps {
  title: string;
  url: string;
}

const PostShare: React.FC<PostShareProps> = ({title, url}) => {
  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Share Post',
        message: `Check out this post: ${title}`,
        url: url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
      <Text style={styles.shareText}>Share</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  shareText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default PostShare;
