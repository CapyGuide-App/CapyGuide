import { useTheme } from "@rneui/themed";
import { MapPin } from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocation } from "../context/LocationContext";
import { fetchReverseGeocode } from "../request/GeocodingRequest";
import { requestLocationPermission } from "../Permissions";
import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";

const LocationPickerText: React.FC = () => {
    const { theme } = useTheme();
    const { location, saveLocation } = useLocation();
    const [locationText, setLocationText] = React.useState<string>('');

    // useEffect(() => {
    //     if (location) {
    //         fetchReverseGeocode(location.longitude, location.latitude).then(res => {
    //             for (let i = 0; i < res.features.length; i++) {
    //                 if (res.features[i].properties.full_address) {
    //                     setLocationText(res.features[i].properties.full_address);
    //                     break;
    //                 }
    //             }
    //         });
    //     }
    // }, [location]);

    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
          if (res) {
            Geolocation.getCurrentPosition(
              position => {
                saveLocation(position);
              },
              error => {
                console.log(error.code, error.message);
              },
              {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
            );
          }
        });
    };

    const styles = StyleSheet.create({
        location: {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
        },
        locationText: {
            fontSize: 15,
            color: theme.colors.primary,
        },
        changeLocation: {
            fontSize: 14,
            color: 'white',
        },
    });

    return (
        <TouchableOpacity onPress={getLocation} style={styles.location}>
            <MapPin size={20} color={theme.colors.primary}/>
            <Text style={styles.locationText}>{locationText}</Text>
        </TouchableOpacity>
    );
};

export default LocationPickerText;