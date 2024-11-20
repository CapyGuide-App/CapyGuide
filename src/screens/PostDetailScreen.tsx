import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const PostDetailScreen: React.FC<any> = ({ route }) => {
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Tác giả: {post.author}</Text>
      <Image source={{ uri: post.images[0] }} style={styles.image} />
      <Text style={styles.description}>{post.description}</Text>
      <View style={styles.reactions}>
        <Text>❤️ {post.reactions.love}</Text>
        <Text>👍 {post.reactions.like}</Text>
        <Text>💬 {post.commentsCount} bình luận</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostDetailScreen;
