import * as React from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, Dimensions, Modal } from "react-native";
import {
  MapView,
} from "@rnmapbox/maps";
import { useRef, useState } from "react";
import { useLocation } from "../context/LocationContext";
import { Locate, Search, Star } from "lucide-react-native";
import { LazyFlatList } from "../components/BottomSheetCollection";
import { fetchData, reloadData } from "../request/DataRequest";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Tab, TabView, useTheme } from "@rneui/themed";
import ErrorContent from "../components/ErrorContent";
import Mapbox from "../components/Mapbox";

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ExploreScreenProps = {
  route: RouteProp<{ params: { indexTab?: number } }, 'params'>;
  navigation: StackNavigationProp<any>;
};

const ExploreScreen: React.FC<ExploreScreenProps> = ({ route, navigation }) => {
  const { location } = useLocation();
  const [indexTab, setIndexTab] = useState(route.params?.indexTab || 0);
  const [placeData, setPlaceData] = useState<any>([]);
  const [foodData, setFoodData] = useState<any>([]);
  const [placeStatus, setPlaceStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [foodStatus, setFoodStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const mapRef = useRef<any>(null);
  const searchRef = useRef<any>(null);

  const [searchFoodData, setSearchFoodData] = useState<any>(null);
  const [searchPlaceData, setSearchPlaceData] = useState<any>(null);
  
  const handleSearch = (data: any) => {
    const foodData = data?.filter((item: any) => item.type === 'food');
    const placeData = data?.filter((item: any) => item.type === 'place');
    setSearchFoodData(foodData);
    setSearchPlaceData(placeData);
  };

  const reload = (type: string, saveData: any, setStatus: any, controller: AbortController) => {
    const request = fetchData(location, type, controller.signal);
    reloadData(request, saveData, setStatus);
  };

  React.useEffect(() => {
    const controller = new AbortController();
    reload('food', setFoodData, setFoodStatus, controller);
    reload('place', setPlaceData, setPlaceStatus, controller);
    return () => {
      controller.abort();
    };
  }, [location]);

  React.useEffect(() => {
    if (route.params?.indexTab !== undefined) {
      setIndexTab(route.params.indexTab);
    }
  }, [route.params?.indexTab]);

  const focusOnUser = () => {
    mapRef.current?.focusOnUser();
  };

  const handleMarkerPress = (item: any) => {
    bottomSheetRef.current?.collapse();
    mapRef.current?.selectFeature(item);
    setIndexTab(item.type === 'food' ? 1 : 0);
  };

  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['20%', '45%', '100%'], []);

  // Tạo animatedPosition để theo dõi vị trí BottomSheet
  const animatedPosition = useSharedValue(0);

  const { height: screenHeight } = Dimensions.get("window");
  const animatedButtonStyle = useAnimatedStyle(() => {
    const offset = 60;
    const min = screenHeight / 2;
    const translateY = interpolate(
      animatedPosition.value,
      [min, screenHeight],
      [min - offset, screenHeight - offset],
      Extrapolation.CLAMP
    );
  
    return {
      transform: [{ translateY }],
    };
  });

  const { theme } = useTheme();

  const CustomErrorContent = React.useMemo(() => () => {
    const handleRetry = () => {
      const controller = new AbortController();
      reload('food', setFoodData, setFoodStatus, controller);
      reload('place', setPlaceData, setPlaceStatus, controller);
    };
    return (
      <ErrorContent onRetry={handleRetry} style={{ marginTop: 20 }} />
    );
  }, []);

  const SearchBarMemo = React.useMemo(() => {
    return (
      <SearchBar
        style={{ 
          position: 'absolute', 
          top: 20,
          left: 20, right: 20,
        }}
        contentContainerStyle={{
          padding: 20,
        }}
        clearOnClose={false}
        ref={searchRef}
        handleSearchData={handleSearch}
        onSelected={handleMarkerPress}
        type="poi"
        data={placeData.concat(foodData)}
      />
    );
  }, [placeData, foodData]);

  return (
    <View style={styles.page}>
      <Mapbox 
        indexTab={indexTab} placeData={searchPlaceData} 
        foodData={searchFoodData} navigation={navigation} 
        ref={mapRef}
      />
      <Animated.View style={[styles.floatingButton, animatedButtonStyle]}>
        <TouchableOpacity style={styles.focusButton} onPress={focusOnUser}>
          <Locate size={24} />
        </TouchableOpacity>
      </Animated.View>
      {SearchBarMemo}
      <BottomSheet
        snapPoints={snapPoints}
        index={1}
        ref={bottomSheetRef}
        animatedPosition={animatedPosition}
        style={{ 
          borderRadius: 20, 
          elevation: 5,
        }}
        backgroundStyle={{ borderRadius: 20,}}
        {...useBottomSheetIOSReduceMotionOverride()}
      >
        <BottomSheetView style={{ flex: 1}}>
          <Tab
            value={indexTab}
            onChange={setIndexTab}
            indicatorStyle={{
                backgroundColor: 'white',
                height: 3,
            }}
            variant="primary"
          >
            {/* To-do: sửa lại UI cho nổi bật hơn */}
            <Tab.Item
                title="Địa điểm"
                titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
            />
            <Tab.Item
                title="Đặc sản"
                titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
            />
          </Tab>
          <TabView
            value={indexTab}
            onChange={setIndexTab}
            disableSwipe={true}
          >
            <TabView.Item style={{ flex: 1 }}>
              <View style={{
                alignItems: 'center',
                flexGrow: 1,
              }}>
                {placeStatus === 'loading' && <ActivityIndicator color={theme.colors.primary} size="large" style={{ marginTop: 20 }} />}
                {placeStatus === 'error' && <CustomErrorContent />}
                {placeStatus === 'success' && <LazyFlatList data={searchPlaceData} onItemPress={handleMarkerPress}/>}
              </View>
            </TabView.Item>
            <TabView.Item style={{ flex: 1 }}>
              <View style={{
                alignItems: 'center',
                flex: 1,
              }}>
                {foodStatus === 'loading' && <ActivityIndicator color={theme.colors.primary} size="large" style={{ marginTop: 20 }} />}
                {foodStatus === 'error' && <CustomErrorContent />}
                {foodStatus === 'success' && <LazyFlatList data={searchFoodData} onItemPress={handleMarkerPress}/>}
              </View>
            </TabView.Item>
          </TabView>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  page: {
    position: "relative",
    flex: 1,
  },
  floatingButton: {
    position: "absolute",
    right: 20,
  },
  focusButton: {
    borderRadius: 50,
    backgroundColor: "white",
    elevation: 2,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import Animated, { Extrapolation, interpolate, ReduceMotion, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import SearchBar from "../components/SearchBar";
import { PortalHost } from "@gorhom/portal";

export function useBottomSheetIOSReduceMotionOverride() {
  const animationConfigs = useBottomSheetSpringConfigs({
    reduceMotion: ReduceMotion.Never,
    stiffness: 200,
    overshootClamping: true,
  });

  return { animationConfigs };
}