import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import Post from "../components/Post";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";
import { hexToRGBA } from "../styles/Methods";
import { useTheme } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import { fetchBlogs, reloadData } from "../request/DataRequest";
import ErrorContent from "../components/ErrorContent";

const BlogScreen: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useTheme();
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const isFocused = useIsFocused();
  const handleSearch = (data: any) => {
    setSearchData(data);
  };

  useEffect(() => {
    const controller = new AbortController();
    const request = fetchBlogs(controller.signal);
    reloadData(request, setData, setStatus);

    return () => {
      controller.abort();
    };
  }, []);

  const handlePostPress = (post: any) => {
    navigation.navigate("PostDetailScreen", { postId: post.id });
  };
  
  useEffect(() => {
    if (isFocused) {
      reloadData(fetchBlogs(), setData, setStatus);
    }
  }, [isFocused]);

  return (
      <View style={styles.container}>
        <SearchBar
          backgroundColor={hexToRGBA(theme.colors.primary, 0.15)}
          contentContainerStyle={styles.container}
          placeholder="Tìm kiếm bài viết"
          type="article"
          isModal={false}
          data={data}
          searchField="title"
          handleSearchData={handleSearch}
        />
        {status === "loading" && <ActivityIndicator size="large" color={theme.colors.primary} />}
        {status === "error" && <ErrorContent onRetry={() => reloadData(fetchBlogs, setData, setStatus)} />}
        {status === "success" && (
          <FlashList
            refreshing={status === "loading"}
            onRefresh={() => reloadData(fetchBlogs(), setData, setStatus)}
            data={searchData}
            renderItem={({ item }) => (
              <Post item={item} onPress={() => handlePostPress(item)} />
            )}
            keyExtractor={(item) => item.id.toString()}
            removeClippedSubviews={true}
            estimatedItemSize={300}
          />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    paddingTop: 20,
    flexDirection: 'column',
    gap: 10,
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
