import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SearchBar } from "@rneui/themed";
import Post from "../components/Post";
import postsData from "../data/sample_posts.json";
import { useNavigation } from "@react-navigation/native";

const BlogScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const handlePostPress = (post: any) => {
    navigation.navigate("PostDetailScreen", { post });
  };

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder="Search articles..."
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.searchInputContainer}
        inputStyle={styles.searchInput}
        searchIcon={{ size: 20 }}
        clearIcon={{ size: 20 }}
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
            category={post.category}
            author={post.author}
            avatar={post.avatar}
            title={post.title}
            date={post.date}
            images={post.images}
            reactionCount={Object.values(post.reactions).reduce((sum, value) => sum + value, 0)}
            commentCount={post.commentsCount}
            onPress={() => handlePostPress(post)}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    marginBottom: 40,
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 10,
  },
  searchInputContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 14,
  },
});

export default BlogScreen;
