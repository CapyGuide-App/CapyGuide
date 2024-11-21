import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from '@env';

const fetchReverseGeocode = async (longitude, latitude) => {
  const BASE_URL = 'https://api.mapbox.com/search/geocode/v6/reverse';
  const params = {
    types: ["neighborhood", "street", "address", "locality"],
    longitude: longitude, 
    latitude: latitude, 
    access_token: MAPBOX_ACCESS_TOKEN, 
  };

  try {
    const response = await axios.get(BASE_URL, { params }, 
        { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Full url:', response.request.responseURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reverse geocode:', error.message);
  }
};

export { fetchReverseGeocode };