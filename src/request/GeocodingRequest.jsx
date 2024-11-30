import axios from "axios";

const fetchReverseGeocode = async (location, signal) => {
  const BASE_URL = 'https://api.suzueyume.id.vn/nominatim/reverse';
  const params = {
    lon: location.coords.longitude,
    lat: location.coords.latitude,
    format: 'json',
    zoom: 16,
  };
  const response = await axios.get(BASE_URL, {
    params,
    timeout: 5000,
    signal,
  });
  console.log(response.data);
  return response.data.display_name;
};

export { fetchReverseGeocode };