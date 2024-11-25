import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from '@env';

const fetchReverseGeocode = async (location, signal) => {
  const BASE_URL = 'https://api.suzueyume.id.vn/nominatim/reverse';
  const params = {
    lon: location.coords.longitude,
    lat: location.coords.latitude,
    format: 'json'
  };

  retry = 0;
  while (retry++ < 3) {
    try {
      const response = await axios.get(BASE_URL, {
        params,
        timeout: 5000,
        signal,
      });
      console.log(`Fetched reverse geocode in attempt ${retry}: ${response.data.display_name}`);
      return response.data.display_name;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log(`Cancelled reverse geocode request in attempt ${retry}`);
        return null;
      }
      console.error(`Failed to fetch reverse geocode in attempt ${retry}: ${error}`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export { fetchReverseGeocode };