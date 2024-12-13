import * as React from "react";
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
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InfoIcon, NavigationIcon, Star } from "lucide-react-native";
import Svg, { Polygon } from "react-native-svg";
import { googleMapRoute } from "../request/GoogleMapRequest";
import { useTheme } from "@rneui/themed";

interface CustomShapeSourceProps {
  type: string;
  data: any;
  onMarkerPress: (feature: any) => void;
}

const to_geojson = (data: any):GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> | undefined => {
    if (!data) return undefined;
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

interface MapboxProps {
    indexTab: number;
    placeData: any;
    foodData: any;
    navigation: any;
    ref: any;
}

const Mapbox: React.FC<MapboxProps> = React.forwardRef(({ indexTab, placeData, foodData, navigation }, ref) => {
  const [selectedFeature, setSelectedFeature] = React.useState<any | null>(null);
  const [isFocused, setIsFocused] = React.useState<boolean>(true);
  const cameraRef = React.useRef<Camera>(null);

  React.useImperativeHandle(ref, () => ({
      selectFeature: (feature: any) => {
          setIsFocused(false);
          setSelectedFeature(feature);
      },
      focusOnUser: () => {
          setIsFocused(true);
      }
  }));

  const handleMarkerPress = (feature: any) => {
      setIsFocused(false);
      setSelectedFeature(feature);
  };

  React.useEffect(() => {
    if (!isFocused && selectedFeature) {
      setTimeout(() => {
        cameraRef.current?.setCamera({
          centerCoordinate: [selectedFeature.longitude, selectedFeature.latitude],
          animationDuration: 500,
          zoomLevel: 15,
        });
      }, 0);
    }
  }, [isFocused, selectedFeature]);

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
          <SymbolLayer
            id={`${type}-icons`}
            style={{
              iconImage: type,
              iconAllowOverlap: false,
              iconAnchor: "bottom",
              iconSize: 0.1,
            }}
          />
        </ShapeSource>
      );
    }, []);

  const SelectedShapeSource = React.useMemo(() => ({type}: {type: string}) => {
    if (!selectedFeature || selectedFeature.type !== type) return null;
    return (
      <ShapeSource
        id="selected-source"
        shape={to_geojson([selectedFeature])}
      >
        <CircleLayer
          id={`selected-${type}-circle`}
          style={{
            circleRadius: 5,
            circleColor: "#FF0000",
          }}
        />
      </ShapeSource>
    );
  }, [selectedFeature]);

  const {theme} = useTheme();
  const mapStyles: string[] = [
    "mapbox://styles/suzueyume/cm3yjge2z00jj01sd81ge3ni3", 
    "mapbox://styles/suzueyume/cm4gyl9fa004t01sf03wm4vz1"
  ]

  return (
  <MapView
    styleURL={mapStyles[theme.mode === "dark" ? 1 : 0]}
    style={styles.map}
    localizeLabels={{ locale: "vi" }}
    onTouchMove={() => {
        setIsFocused(false);
        setSelectedFeature(null);
    }}
    logoEnabled={false}
    attributionEnabled={false}
    scaleBarEnabled={false}
  >
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
    <SelectedShapeSource type={indexTab === 0 ? "place" : "food"} />
    <LocationPuck />

    {selectedFeature && ((indexTab === 0 ? "place" : "food") === selectedFeature.type) && (
      <MarkerView 
        key={selectedFeature.id} 
        coordinate={[selectedFeature.longitude, selectedFeature.latitude]}
        anchor={{ x: 0, y: 1 }}
        allowOverlapWithPuck={true}
      >
        <View style={{position: 'relative', alignItems: 'center', paddingBottom: 9}}>
          <View style={styles.markerContainer}>
            <Text numberOfLines={2} style={styles.markerTitle}>{selectedFeature.name}</Text>
            <View style={styles.markerDescription}>
              <View style={styles.markerInfoField}>
                <Text style={[styles.markerInfo, { fontWeight: 'bold' }]}>Distance</Text>
                <Text style={styles.markerInfo} numberOfLines={1}>{`${selectedFeature.distance.toFixed(2)} km`}</Text>
              </View>
              <View style={[styles.markerInfoField]}>
                <Text style={[styles.markerInfo, { fontWeight: 'bold' }]}>Rating</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Star size={12} fill='#ffc02d' color='#ffc02d'/>
                    <Text style={styles.markerInfo}>{selectedFeature.avg_rating.toFixed(1)}</Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate("Detail", { poiID: selectedFeature.id, initItem: selectedFeature })}
                    style={[styles.markerButton, { backgroundColor: "#A1EEBD" }]}
                >
                    <InfoIcon size={16} />
                    <Text>Chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => googleMapRoute(selectedFeature)}
                    style={[styles.markerButton, { backgroundColor: "#BBE9FF" }]}
                >
                    <NavigationIcon size={16} />
                    <Text>Chỉ đường</Text>
                </TouchableOpacity>
            </View>
          </View>
          <Svg height="10" width="20" style={{ position: 'absolute', bottom: 0,}}>
            <Polygon points="0,0 10,10 20,0" fill="white" />
          </Svg>
        </View>
      </MarkerView>
    )}
  </MapView>
)});

export default Mapbox;

const styles = StyleSheet.create({
    map: {
      flex: 1,
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
      shadowColor: "#000",
      elevation: 5,
    },
    markerTitle: {
      fontWeight: "bold",
    },
    markerDescription: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    markerInfoField: {
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    markerInfo: {
      fontSize: 12,
      color: "gray",
    },
    markerButton: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        gap: 5,
    },
});