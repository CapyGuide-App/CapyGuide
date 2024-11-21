import {SearchBar, useTheme} from '@rneui/themed';
import React, {createContext, useState} from 'react';
import LocationPickerText from '../components/LocationPickerText';
import {useLocation} from '../context/LocationContext';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import locationsData from '../data/locations.json';
import specialtiesData from '../data/specialties.json';
import featuredPostsData from '../data/sample_posts.json';

const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const HomeScreen: React.FC = ({navigation}) => {
  const {theme} = useTheme();
  const [search, setSearch] = useState('');

  const updateSearch = (search: string) => setSearch(search);

  const navigateToDetail = (item: any) => {
    navigation.navigate('Detail', {item});
  };

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const renderSection = (title: string, data: any[]) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={item => item.id}
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
  
  const handlePostPress = (post: any) => {
    navigation.navigate('PostDetailScreen', { post });
  };

  const renderPost = (title: string, data: any[]) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePostPress(item)}>
              <View style={styles.card}>
              {item.images && item.images.length > 0 ? (
                <Image source={{ uri: item.images[0] }} style={styles.image} />
              ) : (
                <View style={styles.placeholder}>
                  <Text style={styles.placeholderText}>No Image</Text>
                </View>
              )}
                <Text style={styles.cardText} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const searchIconProps = {
      color: theme.colors.primary,
      size: 24,
  };

  const {saveLocation} = useLocation();

  useFocusEffect(
    React.useCallback(() => {
      console.log('Tab is focused: Starting watchPosition');

      const watchId = Geolocation.watchPosition(
        position => {
          console.log('Got position:', position);
          saveLocation(position.coords);
        },
        error => console.error('Error watching position:', error.message),
        {enableHighAccuracy: true, distanceFilter: 10},
      );

      return () => {
        console.log('Tab lost focus: Stopping watchPosition');
        Geolocation.clearWatch(watchId);
      };
    }, []),
  );

  return (
    <ScrollView style={styles.container}>
      <LocationPickerText />
      <SearchBar
        placeholder={'Search'}
        containerStyle={{
          borderBottomWidth: 0,
          padding: 0,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
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
        searchIcon={searchIconProps}
        clearIcon={searchIconProps}
        cancelIcon={searchIconProps}
        round={true}
        lightTheme={true}
        onChangeText={updateSearch}
        value={search}
        placeholderTextColor={hexToRGBA(theme.colors.primary, 0.7)}
      />

      {renderSection('Địa danh gần bạn', locationsData)}
      {renderSection('Đặc sản gần bạn', specialtiesData)}
      {renderPost('Bài viết nổi bật', featuredPostsData)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  location: {
    height: 100,
    backgroundColor: 'tomato',
  },
  sectionContainer: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 5,
    borderBottomWidth: 1,
  },
  card: {
    width: 170,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 180,
    borderRadius: 8,
    marginBottom: 5,
  },
  placeholder: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  placeholderText: {
    fontSize: 12,
    color: '#888',
  },
  cardText: {
    textAlign: 'center',
    fontSize: 18,
    width: '100%',
  },
});

export default HomeScreen;