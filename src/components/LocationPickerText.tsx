import { useTheme } from "@rneui/themed";
import { ChevronRight, MapPin } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { useLocation } from "../context/LocationContext";
import { fetchReverseGeocode } from "../request/GeocodingRequest";

const LocationPickerText: React.FC<TouchableOpacityProps> = ({...props}) => {
  const { location, updateLocation } = useLocation();
  const { theme } = useTheme();
  const [locationText, setLocationText] = React.useState<string>('Đang tìm vị trí...');
  const [status, setStatus] = React.useState<'loading' | 'error' | 'success'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    if (location) {
      setStatus('loading');
      fetchReverseGeocode(location, controller.signal)
        .then((data) => {
          setLocationText(data);
          setStatus('success');
        })
        .catch((error) => {
          if (error.name === 'AbortError' || error.name === 'CanceledError') {
            console.log('Reverse geocoding request was canceled');
          } else {
            setStatus('error');
            console.error(error);
          }
        });
    }
    return () => {
      controller.abort();
    }
  }, [location]);

  const styles = StyleSheet.create({
      location: {
        direction: 'ltr',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 5,
        alignItems: 'center',
      },
      locationText: {
        flex: 1,
        fontSize: 17,
        color: theme.colors.primary,
      },
  });

  return (
    <TouchableOpacity onPress={updateLocation} style={styles.location} {...props}>
        <MapPin size={20} color={theme.colors.primary}/>
          <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
            {status === 'loading' ? 'Đang tìm vị trí...' :
             status === 'error' ? 'Lỗi khi tìm vị trí, nhấn để thử lại' :
             status === 'success' ? locationText :
             'Đang tìm vị trí...'}
          </Text>
        <ChevronRight size={20} color={theme.colors.primary}/>
    </TouchableOpacity>
  );
};

export default LocationPickerText;