import * as React from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  MapView,
} from "@rnmapbox/maps";
import { useRef, useState } from "react";
import { useLocation } from "../context/LocationContext";
import { Locate, Star } from "lucide-react-native";
import { LazyFlatList } from "../components/BottomSheetCollection";
import Svg, { Polygon } from "react-native-svg";
import { fetchData } from "../request/DataRequest";
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
  const [placeData, setPlaceData] = useState<any>(null);
  const [foodData, setFoodData] = useState<any>(null);
  const [placeStatus, setPlaceStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [foodStatus, setFoodStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const mapRef = useRef<any>(null);

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
  };

  const snapPoints = React.useMemo(() => ['20%', '40%', '100%'], []);
  const bottomSheetRef = React.useRef<BottomSheet>(null);
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

  return (
    <SafeAreaView style={styles.page}>
      <Mapbox 
        indexTab={indexTab} placeData={placeData} 
        foodData={foodData} navigation={navigation} 
        ref={mapRef}
      />
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
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
                flex: 1,
              }}>
                {placeStatus === 'loading' && <ActivityIndicator color={theme.colors.primary} size="large" />}
                {placeStatus === 'error' && <CustomErrorContent />}
                {placeStatus === 'success' && <LazyFlatList data={placeData} onItemPress={handleMarkerPress}/>}
              </View>
            </TabView.Item>
            <TabView.Item style={{ flex: 1 }}>
              <View style={{
                alignItems: 'center',
                flex: 1,
              }}>
                {foodStatus === 'loading' && <ActivityIndicator color={theme.colors.primary} size="large" />}
                {foodStatus === 'error' && <CustomErrorContent />}
                {foodStatus === 'success' && <LazyFlatList data={foodData} onItemPress={handleMarkerPress}/>}
              </View>
            </TabView.Item>
          </TabView>
        </BottomSheetView>
      </BottomSheet>
      <TouchableOpacity style={styles.focusButton} onPress={focusOnUser}>
        <Locate size={24} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  page: {
    position: "relative",
    flex: 1,
  },
  focusButton: {
    position: "absolute",
    bottom: "50%",
    right: 20,
    borderRadius: 50,
    backgroundColor: "white",
    padding: 10,
    elevation: 2,
  },
});

import { useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { ReduceMotion } from 'react-native-reanimated';

export function useBottomSheetIOSReduceMotionOverride() {
  const animationConfigs = useBottomSheetSpringConfigs({
    reduceMotion: ReduceMotion.Never,
    stiffness: 200,
    overshootClamping: true,
  });

  return { animationConfigs };
}