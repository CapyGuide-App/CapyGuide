import {Icon, useTheme} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import LocationPickerText from '../components/LocationPickerText';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import NearByCollection from '../components/NearByCollection';
import SearchBar from '../components/SearchBar';
import { fetchData } from '../request/DataRequest';
import { useLocation } from '../context/LocationContext';
import { useFocusEffect } from '@react-navigation/native';

import ErrorContent from '../components/ErrorContent';

const HomeScreen: React.FC = ({navigation}: any) => {
  const { location } = useLocation();
  const [foodData, setFoodData] = useState<any[]>([]);
  const [placeData, setPlaceData] = useState<any[]>([]);
  const [placeStatus, setPlaceStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [foodStatus, setFoodStatus] = useState<'loading' | 'error' | 'success'>('loading');

  const reload = (type: string, saveData: any, setStatus: any, controller: AbortController) => {
    setStatus((prevStatus: string) => {
      if (prevStatus === 'loading') return prevStatus;
      return 'loading';
    });
    fetchData(location, type, controller.signal).then((data) => {
      if (data) {
        saveData(data);
        setStatus('success');
      }
    }).catch((error) => {
      if (error.name === "CanceledError" || error.name === "AbortError") {
        console.log(`${type} request was canceled`);
      } else {
        setStatus("error");
        console.error(error);
      }
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    reload('food', setFoodData, setFoodStatus, controller);
    reload('place', setPlaceData, setPlaceStatus, controller);
    return () => {
      controller.abort();
    };
  }, [location]);
  
  const navigateToDetail = (item: any) => {
    navigation.navigate('Detail', {item});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LocationPickerText />
      <SearchBar contentContainerStyle={styles.container}/>
      {placeStatus !== 'error' && foodStatus !== 'error' &&
      <NearByCollection title="Địa danh gần bạn"
        geoData={placeData} onPressItem={navigateToDetail} 
        status={placeStatus} onShowAll={() => navigation.navigate('Explore', { indexTab: 0, title: 'Địa danh gần bạn' })}/>}
      {placeStatus !== 'error' && foodStatus !== 'error' &&
      <NearByCollection title="Đặc sản gần bạn" 
        geoData={foodData} onPressItem={navigateToDetail} 
        status={foodStatus} onShowAll={() => navigation.navigate('Explore', { indexTab: 1, title: 'Đặc sản gần bạn' })}/>}
      {(placeStatus === 'error' || foodStatus === 'error') &&
        <ErrorContent onRetry={() => {
          const controller = new AbortController();
          reload('food', setFoodData, setFoodStatus, controller);
          reload('place', setPlaceData, setPlaceStatus, controller);
        }}/>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'column',
    gap: 10,
    height: '100%',
  },
});
export default HomeScreen;