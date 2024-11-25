import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from '@env';

const fetchReverseGeocode = async (location) => {
  const BASE_URL = 'https://api.suzueyume.id.vn/reverse';
  const params = {
    lon: location.coords.longitude,
    lat: location.coords.latitude,
    format: 'json'
  };

  retry = 0;
  while (retry++ < 3) {
    console.log(`Fetching reverse geocode in attempt ${retry}...`);
    try {
      const response = await axios.get(BASE_URL, {
        params,
        timeout: 5000
      });
      return response.data.display_name;
    } catch (error) {
      console.error(`Failed to fetch reverse geocode in attempt ${retry}: ${error}`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};

export { fetchReverseGeocode };