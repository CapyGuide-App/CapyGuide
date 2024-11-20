import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Comment {
  id: number;
  user: string;
  content: string;
}

interface PostCommentsProps {
  comments: Comment[];
}

const PostComments: React.FC<PostCommentsProps> = ({comments}) => {
  return (
    <View style={styles.commentSection}>
      {comments.map(comment => (
        <View key={comment.id} style={styles.commentContainer}>
          <Text style={styles.commentUser}>{comment.user}</Text>
          <Text style={styles.commentContent}>{comment.content}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  commentSection: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentContent: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default PostComments;
