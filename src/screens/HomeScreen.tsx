import {SearchBar, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import LocationPickerText from '../components/LocationPickerText';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import locationsData from '../data/locations.json';
import NearByCollection from '../components/NearByCollection';
import { useData } from '../context/DataContext';

const hexToRGBA = (hex: string, opacity: number) => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const HomeScreen: React.FC = ({navigation}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const {theme} = useTheme();
  const [search, setSearch] = useState('');
  const {placeData, foodData} = useData();

  const updateSearch = (search: string) => setSearch(search);

  const navigateToDetail = (item: any) => {
    navigation.navigate('Detail', {item});
  };

  const searchIconProps = {
      color: theme.colors.primary,
      size: 24,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <NearByCollection title="Địa danh gần bạn" geoData={placeData} />
        <NearByCollection title="Đặc sản gần bạn" geoData={foodData} />
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
});
export default HomeScreen;