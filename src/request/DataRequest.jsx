import axios from "axios";

const fetchData = async (source, type, signal, options = {}) => {
    const BASE_URL = "https://api.suzueyume.id.vn/nearby";
    const response = await axios.get(BASE_URL, {
        ...options,
        params: {
            ...options.params,
            long: source.coords.longitude, 
            lat: source.coords.latitude, 
            type: type,
        },
        signal: signal,
        timeout: 5000,
    });
    return response.data;
};

export { fetchData };