import {SearchBar, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Image, Touchable, TouchableOpacity} from 'react-native';
import {Button} from '@rneui/base';
import {useTranslation} from 'react-i18next';
import i18n, {changeLanguage} from '../i18n/i18n';
import Post from '../components/Post';
import postsData from '../data/sample_posts.json';
import DetailScreen from '../components/DetailScreen';

const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const HomeScreen: React.FC = ({navigation}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Post mẫu
  const [posts, setPosts] = useState(postsData);

  const updateSearch = (search: string) => setSearch(search);

    // Sample data for sections
    const locations = [
      {id: '1', name: 'Địa danh 1', image: 'https://www.paradisevietnam.com/public/backend/uploads/where-to-stay-in-halong-bay/places-to-visit-in-halong-bay_(7).jpg'},
      {id: '2', name: 'Địa danh 2', image: 'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/08/vung-chua-dong-phong-nha-05-1000.jpg'},
      {id: '3', name: 'Địa danh 1', image: 'https://www.paradisevietnam.com/public/backend/uploads/where-to-stay-in-halong-bay/places-to-visit-in-halong-bay_(7).jpg'},
      {id: '4', name: 'Địa danh 2', image: 'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/08/vung-chua-dong-phong-nha-05-1000.jpg'},
      {id: '5', name: 'Địa danh 1', image: 'https://www.paradisevietnam.com/public/backend/uploads/where-to-stay-in-halong-bay/places-to-visit-in-halong-bay_(7).jpg'},
    ];
    const specialties = [
      {id: '1', name: 'Đặc sản 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MnbUyOM0VlQHuAthhngmluLeES7bXrYMqw&s'},
      {id: '2', name: 'Đặc sản 2', image: 'https://nguyenninhhanoi.com/wp-content/uploads/2024/01/banh-phu-the.jpg'},
      {id: '3', name: 'Đặc sản 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MnbUyOM0VlQHuAthhngmluLeES7bXrYMqw&s'},
      {id: '4', name: 'Đặc sản 2', image: 'https://nguyenninhhanoi.com/wp-content/uploads/2024/01/banh-phu-the.jpg'},
      {id: '5', name: 'Đặc sản 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1MnbUyOM0VlQHuAthhngmluLeES7bXrYMqw&s'},
      {id: '6', name: 'Đặc sản 2', image: 'https://nguyenninhhanoi.com/wp-content/uploads/2024/01/banh-phu-the.jpg'},
    ];
    const featuredPosts = [
      {id: '1', name: 'Bài viết 1', image: 'https://via.placeholder.com/100'},
      {id: '2', name: 'Bài viết 2', image: 'https://via.placeholder.com/100'},
    ];

    const navigateToDetail = (item: any) => {
      navigation.navigate('Detail', {item});
    };
  
    const renderSection = (title: string, data: any[]) => (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigateToDetail(item)}>
              <View style={styles.card}>
                <Image source={{uri: item.image}} style={styles.image} />
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

      <Button
        onPress={() => changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}>
        {t('change language')}
      </Button>
      {renderSection('Địa danh gần bạn', locations)}
      {renderSection('Đặc sản gần bạn', specialties)}
      {renderSection('Bài viết nổi bật', featuredPosts)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionContainer: {marginVertical: 15},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginLeft: 10},
  card: {width: 100, marginHorizontal: 10, alignItems: 'center'},
  image: {width: 80, height: 80, borderRadius: 8, marginBottom: 5},
  cardText: {textAlign: 'center', fontSize: 12},
});

export default HomeScreen;
