import Geolocation from '@react-native-community/geolocation';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Mapbox from '@rnmapbox/maps';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const defaultLocation = {
    coords: {
      latitude: 21.038235896565038,
      longitude: 105.78268034109105,
    },
  };
  const [location, setLocation] = useState(defaultLocation);

  const saveLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const updateLocation = () => {
    const hasLocationPermission = Mapbox.requestAndroidLocationPermissions();
    if (!hasLocationPermission) {
      console.log('No location permission');
      return;
    }
    Geolocation.getCurrentPosition(
      (position) => {
        saveLocation(position);
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, saveLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
