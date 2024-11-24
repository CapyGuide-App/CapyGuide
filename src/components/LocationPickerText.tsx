import { useTheme } from "@rneui/themed";
import { ChevronRight, MapPin } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocation } from "../context/LocationContext";
import { fetchReverseGeocode } from "../request/GeocodingRequest";


const LocationPickerText: React.FC = () => {
  const { location, updateLocation } = useLocation();
  const { theme } = useTheme();
  const [locationText, setLocationText] = React.useState<string>('Đang tìm vị trí...');
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (location) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      fetchReverseGeocode(location, controller.signal)
        .then((data) => {
          if (data && !controller.signal.aborted) {
            setLocationText(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location]);

  const styles = StyleSheet.create({
      location: {
        direction: 'ltr',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 5,
      },
      locationText: {
        flex: 1,
        fontSize: 15,
        color: theme.colors.primary,
      },
  });

  return (
    <TouchableOpacity onPress={updateLocation} style={styles.location}>
        <MapPin size={20} color={theme.colors.primary}/>
        <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">{locationText}</Text>
        <ChevronRight size={20} color={theme.colors.primary}/>
    </TouchableOpacity>
  );
};

export default LocationPickerText;