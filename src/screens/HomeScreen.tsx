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
  TouchableOpacity,
} from 'react-native';
import NearByCollection from '../components/NearByCollection';
import SearchBar from '../components/SearchBar';
import {fetchData, reloadData} from '../request/DataRequest';
import {useLocation} from '../context/LocationContext';
import {useFocusEffect} from '@react-navigation/native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';

import ErrorContent from '../components/ErrorContent';
import { hexToRGBA } from '../styles/Methods';
import { RefreshControl } from 'react-native-gesture-handler';

const HomeScreen: React.FC = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = dynamicStyles(theme);
  const {location} = useLocation();
  const [foodData, setFoodData] = useState<any[]>([]);
  const [placeData, setPlaceData] = useState<any[]>([]);
  const [placeStatus, setPlaceStatus] = useState<
    'loading' | 'error' | 'success'
  >('loading');
  const [foodStatus, setFoodStatus] = useState<'loading' | 'error' | 'success'>(
    'loading',
  );

  const reload = (
    type: string,
    saveData: any,
    setStatus: any,
    controller: AbortController,
  ) => {
    const request = fetchData(location, type, controller.signal);
    reloadData(request, saveData, setStatus);
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
    navigation.navigate('Detail', {poiID: item.id, initItem: item});
  };

  function keyExtractor(str: string, _index: number) {
    return str;
  }

  function renderItem(info: DragListRenderItemInfo<string>) {
    const {item, onDragStart, onDragEnd, isActive} = info;

    return (
      <TouchableOpacity
        key={item}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  }

  const [data, setData] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ]);
  async function onReordered(fromIndex: number, toIndex: number) {
    const copy = [...data]; // Don't modify react data in-place
    const removed = copy.splice(fromIndex, 1);

    copy.splice(toIndex, 0, removed[0]); // Now insert at the new pos
    setData(copy);
  }

  const {updateLocation} = useLocation();

  return (
    <ScrollView contentContainerStyle={styles.container}
      refreshControl={
      <RefreshControl refreshing={placeStatus === 'loading' || foodStatus === 'loading'} onRefresh={updateLocation} />
    }>
      <LocationPickerText />
      <SearchBar
        contentContainerStyle={[styles.container]}
        backgroundColor={hexToRGBA(theme.colors.primary, 0.15)}
        data={placeData.concat(foodData)}
        type="poi"
        onSelected={navigateToDetail}
      />
      {placeStatus !== 'error' && foodStatus !== 'error' && (
        <NearByCollection
          title="Địa danh gần bạn"
          geoData={placeData}
          onPressItem={navigateToDetail}
          status={placeStatus}
          onShowAll={() =>
            navigation.navigate('Explore', {
              indexTab: 0,
              title: 'Địa danh gần bạn',
            })
          }
        />
      )}
      {placeStatus !== 'error' && foodStatus !== 'error' && (
        <NearByCollection
          title="Đặc sản gần bạn"
          geoData={foodData}
          onPressItem={navigateToDetail}
          status={foodStatus}
          onShowAll={() =>
            navigation.navigate('Explore', {
              indexTab: 1,
              title: 'Đặc sản gần bạn',
            })
          }
        />
      )}
      {(placeStatus === 'error' || foodStatus === 'error') && (
        <ErrorContent
          style={{flexGrow: 1}}
          onRetry={() => {
            const controller = new AbortController();
            reload('food', setFoodData, setFoodStatus, controller);
            reload('place', setPlaceData, setPlaceStatus, controller);
          }}
        />
      )}
    </ScrollView>
  );
};

const dynamicStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 15,
      flexDirection: 'column',
      gap: 10,
      height: '100%',
      backgroundColor: theme.colors.background2,
    },
  });
export default HomeScreen;
