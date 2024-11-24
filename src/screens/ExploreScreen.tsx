import * as React from "react";
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import {
  Camera,
  MapView,
  UserTrackingMode,
  LocationPuck,
  ShapeSource,
  SymbolLayer,
  Images,
  MarkerView,
} from "@rnmapbox/maps";
import { useRef, useState } from "react";
import { useLocation } from "../context/LocationContext";
import { Locate, Star } from "lucide-react-native";
import { useData } from "../context/DataContext";
import BottomSheetCollection from "../components/BottomSheetCollection";

import PlacePin from "../assets/place-pin.png";
import FoodPin from "../assets/food-pin.png";

interface CustomShapeSourceProps {
  type: string;
  data: any;
  onMarkerPress: (feature: any) => void;
}

const CustomShapeSource: React.FC<CustomShapeSourceProps> = ({ type, data, onMarkerPress }) => {
  return (
    <ShapeSource
      id={`${type}-source`}
      shape={{
        type: "FeatureCollection",
        features: data,
      }}
      onPress={(event) => {
        console.log(event);
        const feature = event.features[0];
        if (feature) onMarkerPress(feature);
      }}
    >
      <SymbolLayer
        id={`${type}-icons`}
        style={{
          iconImage: type,
          iconAllowOverlap: true,
          iconAnchor: "bottom",
          iconSize: 0.07,
        }}
      />
    </ShapeSource>
  );
};

const ExploreScreen: React.FC = () => {
  const { location } = useLocation();
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const cameraRef = useRef(null);
  const { placeData, foodData } = useData();
  const [indexTab, setIndexTab] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null);

  const focusOnUser = () => {
    setIsFocused(true);
  };

  const handleMarkerPress = (feature: any) => {
    setIsFocused(false);
    setSelectedFeature(feature);
  };

  React.useEffect(() => {
    if (!isFocused && selectedFeature) {
      setTimeout(() => {
        cameraRef.current.setCamera({
          centerCoordinate: selectedFeature.geometry.coordinates,
          followUserLocation: false,
          animationDuration: 500,
          zoomLevel: 15,
        });
      }, 0);
    }
  }, [isFocused, selectedFeature]);

  return (
    <SafeAreaView style={styles.page}
      onTouchStart={() => {
        setSelectedFeature(null)
      }}
    >
      <MapView
        styleURL="mapbox://styles/mapbox/standard"
        style={styles.map}
        localizeLabels={{ locale: "vi" }}
        onTouchStart={() => {
          setIsFocused(false)
          setSelectedFeature(null)
        }}
      >
        <Camera
          ref={cameraRef}
          animationDuration={1000}
          zoomLevel={15}
          followZoomLevel={15}
          followUserLocation={isFocused}
          followUserMode={UserTrackingMode.Follow}
        />
        <LocationPuck
          puckBearing="heading"
          puckBearingEnabled={true}
          visible={true}
          scale={["interpolate", ["linear"], ["zoom"], 10, 1.0, 20, 4.0]}
          pulsing={{
            isEnabled: true,
          }}
        />
        <Images images={{ place: PlacePin, food: FoodPin }} />
        <CustomShapeSource
          key={indexTab}
          type={indexTab === 0 ? "place" : "food"}
          data={indexTab === 0 ? placeData : foodData}
          onMarkerPress={handleMarkerPress}
        />

        {selectedFeature && (
          <MarkerView key={selectedFeature.properties.id} coordinate={selectedFeature.geometry.coordinates}>
            <View style={styles.markerContainer}>
              <Text numberOfLines={2} style={styles.markerTitle}>{selectedFeature.properties.name}</Text>
              <View style={styles.markerDescription}>
                <View style={styles.markerInfoField}>
                  <Text style={[styles.markerInfo, { fontWeight: 'bold' }]}>Distance</Text>
                  <Text style={styles.markerInfo} numberOfLines={1}>{`${selectedFeature.properties.distance.toFixed(2)} km`}</Text>
                </View>
                <View style={[styles.markerInfoField, { marginLeft: 'auto' }]}>
                  <Text style={[styles.markerInfo, { fontWeight: 'bold' }]}>Rating</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Star size={12} fill='#ffc02d' color='#ffc02d'/>
                      <Text style={styles.markerInfo}>{selectedFeature.properties.avg_rating.toFixed(1)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </MarkerView>
        )}
      </MapView>

      <TouchableOpacity style={styles.focusButton} onPress={focusOnUser}>
        <Locate size={24} />
      </TouchableOpacity>

      <BottomSheetCollection 
        placeData={placeData} 
        foodData={foodData} 
        onTabIndexChange={setIndexTab}
        onItemPress={handleMarkerPress}
      />
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
