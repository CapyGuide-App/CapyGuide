import * as React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Mapbox, {Camera, MapView, UserTrackingMode, UserLocation, LocationPuck} from "@rnmapbox/maps";
import { MAPBOX_ACCESS_TOKEN } from '@env';

Mapbox.requestAndroidLocationPermissions();
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

Mapbox.setTelemetryEnabled(false);

const ExploreScreen: React.FC = () => {
    return (
      <SafeAreaView style={styles.map}>
        <MapView 
          styleURL="mapbox://styles/mapbox/standard" 
          style={styles.map} 
          localizeLabels={{"locale": "vi"}}>
            <Camera 
              followUserLocation={true} 
              followUserMode={UserTrackingMode.Follow} 
              followZoomLevel={17}/>
            <UserLocation 
              visible={false} 
              minDisplacement={100} 
              requestsAlwaysUse={true}
              showsUserHeadingIndicator={true}/>
            <LocationPuck
              puckBearing='heading'
              puckBearingEnabled={true}
              visible={true}
              scale={['interpolate', ['linear'], ['zoom'], 10, 1.0, 20, 4.0]}
              pulsing={{
                isEnabled: true,
                color: 'teal',
                radius: 50.0,
              }}
            />
        </MapView>
      </SafeAreaView>
    );
}

export default ExploreScreen;