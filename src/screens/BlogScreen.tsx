import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Post from '../components/Post';
import postsData from '../data/sample_posts.json';
import { useNavigation } from '@react-navigation/native';

const BlogScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const handlePostPress = (post: any) => {
    navigation.navigate('PostDetailScreen', { post });
  };

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm bài viết..."
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        searchIcon={{ size: 20 }}
        clearIcon={{ size: 20 }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        round
        lightTheme
        onChangeText={updateSearch}
        value={search}
      />

      {postsData
        .filter((post) =>
          post.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((post, index) => (
          <Post
            key={index}
            author={post.author}
            avatar={post.avatar}
            title={post.title}
            description={post.description}
            images={post.images}
            reactions={post.reactions}
            commentsCount={post.commentsCount}
            onPress={() => handlePostPress(post)}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 14,
  },
});

export default BlogScreen;
