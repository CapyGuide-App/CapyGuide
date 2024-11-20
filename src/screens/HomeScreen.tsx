import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { SearchBar, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import locationsData from '../data/locations.json';
import specialtiesData from '../data/specialties.json';
import featuredPostsData from '../data/featured_posts.json';

const HomeScreen: React.FC = ({ navigation }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const updateSearch = (search: string) => setSearch(search);

  const navigateToDetail = (item: any) => {
    navigation.navigate('Detail', { item });
  };

  const renderSection = (title: string, data: any[]) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetail(item)}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder={t('search')}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
        inputContainerStyle={{
          backgroundColor: theme.colors.primary + '10',
          borderColor: isFocused ? theme.colors.primary : 'transparent',
          borderWidth: 2,
          borderBottomWidth: 2,
        }}
        inputStyle={{
          color: theme.colors.primary,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        searchIcon={{ color: theme.colors.primary, size: 24 }}
        clearIcon={{ color: theme.colors.primary, size: 24 }}
        cancelIcon={{ color: theme.colors.primary, size: 24 }}
        round
        lightTheme
        onChangeText={updateSearch}
        value={search}
        placeholderTextColor={theme.colors.primary + '70'}
      />

      {renderSection('Địa danh gần bạn', locationsData)}
      {renderSection('Đặc sản gần bạn', specialtiesData)}
      {renderSection('Bài viết nổi bật', featuredPostsData)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionContainer: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  card: {
    width: 100,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default HomeScreen;
