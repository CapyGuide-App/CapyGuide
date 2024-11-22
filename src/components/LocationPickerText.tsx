import { useTheme } from "@rneui/themed";
import { ChevronRight, MapPin } from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocation } from "../context/LocationContext";
import { fetchReverseGeocode } from "../request/GeocodingRequest";


const LocationPickerText: React.FC = () => {
  const { location, updateLocation } = useLocation();
  const { theme } = useTheme();
  const [locationText, setLocationText] = React.useState<string>('Đang tìm vị trí...');

  useEffect(() => {
    if (location) {
      fetchReverseGeocode(location).then((res) => {
        if (res) {
          setLocationText(res);
        }
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