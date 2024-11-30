import * as React from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  Camera,
  MapView,
  UserTrackingMode,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  Images,
  MarkerView,
  CircleLayer,
} from "@rnmapbox/maps";
import { useRef, useState } from "react";
import { useLocation } from "../context/LocationContext";
import { Locate, Star } from "lucide-react-native";
import { LazyFlatList } from "../components/BottomSheetCollection";
import Svg, { Polygon } from "react-native-svg";
import { fetchData } from "../request/DataRequest";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Tab, TabView, useTheme } from "@rneui/themed";
import { set } from "@react-native-firebase/database";
import ErrorContent from "../components/ErrorContent";

interface CustomShapeSourceProps {
  type: string;
  data: any;
  onMarkerPress: (feature: any) => void;
}

const to_geojson = (data: any) => {
  if (!data) return null;
  const features = data.map((item: any) => {
    return {
      type: "Feature",
      id: item.id,
      geometry: {
        type: "Point",
        coordinates: [item.longitude, item.latitude],
      },
      properties: item,
    };
  });

  return {
    type: "FeatureCollection",
    features
  };
};

const ExploreScreen: React.FC = ({route, navigation}) => {
  const { location } = useLocation();
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const cameraRef = useRef(null);
  const [indexTab, setIndexTab] = useState(route.params?.indexTab || 0);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);
  const [placeData, setPlaceData] = useState<any>(null);
  const [foodData, setFoodData] = useState<any>(null);
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

  const CustomShapeSource = React.useMemo(
    () => ({ type, data, onMarkerPress }: CustomShapeSourceProps) => {
      return (
        <ShapeSource
          id={`${type}-source`}
          shape={to_geojson(data)}
          onPress={(event) => {
            if (event.features[0]) {
              console.log(event);
              onMarkerPress(event.features[0].properties);
            }
          }}
        >
          <CircleLayer
            id={`${type}-selected`}
            style={{
              circleRadius: 5,
              circleColor: "#FF0000",
            }}
            filter={["==", ["get", "id"], selectedFeature?.id || ""]}
          />
          <SymbolLayer
            id={`${type}-icons`}
            style={{
              iconImage: type,
              iconAllowOverlap: true,
              iconAnchor: "bottom",
              iconSize: 0.1,
            }}
            filter={["!=", ["get", "id"], selectedFeature?.id || ""]}
          />
        </ShapeSource>
      );
    },[selectedFeature]
  );

  const focusOnUser = () => {
    setIsFocused(true);
  };

  const handleMarkerPress = (feature: any) => {
    setIsFocused(false);
    setSelectedFeature(feature);
    bottomSheetRef.current?.collapse();
  };

  React.useEffect(() => {
    if (!isFocused && selectedFeature) {
      setTimeout(() => {
        cameraRef.current.setCamera({
          centerCoordinate: [selectedFeature.longitude, selectedFeature.latitude],
          followUserLocation: false,
          animationDuration: 500,
          zoomLevel: 15,
        });
      }, 0);
    }
  }, [isFocused, selectedFeature]);

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
      <MapView
        styleURL="mapbox://styles/suzueyume/cm3yjge2z00jj01sd81ge3ni3"
        style={styles.map}
        localizeLabels={{ locale: "vi" }}
        onTouchStart={() => {
          setIsFocused(false);
        }}
      >
        <LocationPuck
          puckBearing="heading"
          puckBearingEnabled={true}
          visible={true}
          scale={["interpolate", ["linear"], ["zoom"], 10, 1.0, 20, 4.0]}
          pulsing={{
            isEnabled: true,
          }}
        />
        <Camera
          ref={cameraRef}
          animationDuration={1000}
          zoomLevel={15}
          followZoomLevel={15}
          followUserLocation={isFocused}
          followUserMode={UserTrackingMode.Follow}
        />
        <Images images={{ place: require("../assets/place-pin.png"), food: require("../assets/food-pin.png") }} />
        <CustomShapeSource
          key={indexTab}
          type={indexTab === 0 ? "place" : "food"}
          data={indexTab === 0 ? placeData : foodData}
          onMarkerPress={handleMarkerPress}
        />

        {selectedFeature && (
          <MarkerView 
            key={selectedFeature.id} 
            coordinate={[selectedFeature.longitude, selectedFeature.latitude]}
            anchor={{ x: 0, y: 1 }}
          >
            <View style={{position: 'relative', alignItems: 'center', paddingBottom: 9}}>
              <View style={styles.markerContainer}>
                <Text numberOfLines={2} style={styles.markerTitle}>{selectedFeature.name}</Text>
                <View style={styles.markerDescription}>
                  <View style={styles.markerInfoField}>
                    <Text style={[styles.markerInfo, { fontWeight: 'bold' }]}>Distance</Text>
                    <Text style={styles.markerInfo} numberOfLines={1}>{`${selectedFeature.distance.toFixed(2)} km`}</Text>
                  </View>
                  <View style={[styles.markerInfoField, { marginLeft: 'auto' }]}>
                    <Text style={[styles.markerInfo, { fontWeight: 'bold' }]}>Rating</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Star size={12} fill='#ffc02d' color='#ffc02d'/>
                        <Text style={styles.markerInfo}>{selectedFeature.avg_rating.toFixed(1)}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Svg height="10" width="20" style={{ position: 'absolute', bottom: 0 }}>
                <Polygon points="0,0 10,10 20,0" fill="white" />
              </Svg>
            </View>
          </MarkerView>
        )}
      </MapView>

      <TouchableOpacity style={styles.focusButton} onPress={focusOnUser}>
        <Locate size={24} />
      </TouchableOpacity>
      
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        ref={bottomSheetRef}
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
              }}>
                {placeStatus === 'loading' && <ActivityIndicator color={theme.colors.primary} size="large" />}
                {placeStatus === 'error' && <CustomErrorContent />}
                {placeStatus === 'success' && <LazyFlatList data={placeData} onItemPress={handleMarkerPress}/>}
              </View>
            </TabView.Item>
            <TabView.Item style={{ flex: 1 }}>
              <View style={{
                alignItems: 'center',
              }}>
                {foodStatus === 'loading' && <ActivityIndicator color={theme.colors.primary} size="large" />}
                {foodStatus === 'error' && <CustomErrorContent />}
                {foodStatus === 'success' && <LazyFlatList data={foodData} onItemPress={handleMarkerPress}/>}
              </View>
            </TabView.Item>
          </TabView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  page: {
    position: "relative",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  focusButton: {
    position: "absolute",
    bottom: "50%",
    right: 20,
    borderRadius: 50,
    backgroundColor: "white",
    padding: 10,
  },
  markerContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    position: "relative",
    maxWidth: 250,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  markerTitle: {
    fontWeight: "bold",
  },
  markerDescription: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  markerInfoField: {
    flexDirection: "column",
    alignItems: "center",
  },
  markerInfo: {
    fontSize: 12,
    color: "gray",
  }
});
