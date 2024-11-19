import {SearchBar, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import Post from '../components/Post';
import postsData from '../data/sample_posts.json';

const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const BlogScreen: React.FC = ({}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Post mẫu
  const [posts, setPosts] = useState(postsData);

  const updateSearch = (search: string) => setSearch(search);

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder={t('search')}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: hexToRGBA(theme.colors.primary, 0.1),
          borderColor: isFocused ? theme.colors.primary : 'transparent',
          borderWidth: 2,
          borderBottomWidth: 2,
        }}
        inputStyle={{
          color: theme.colors.primary,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        searchIcon={{color: theme.colors.primary, size: 24}}
        clearIcon={{color: theme.colors.primary, size: 24}}
        cancelIcon={{color: theme.colors.primary, size: 24}}
        round
        lightTheme
        onChangeText={updateSearch}
        value={search}
        placeholderTextColor={hexToRGBA(theme.colors.primary, 0.7)}
      />

      {posts.map((post, index) => (
        <Post
          author={post.author}
          avatar={post.avatar}
          key={index}
          title={post.title}
          description={post.description}
          images={post.images}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default BlogScreen;
