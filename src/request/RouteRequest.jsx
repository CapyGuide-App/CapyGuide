import axios from "axios";

const fetchDistances = async (source, features, options = {}, chunkSize = 20) => {
    const BASE_URL = "https://api.suzueyume.id.vn/osrm/table/v1/driving";

    const sourceCoordinates = [source.longitude, source.latitude];

    const destinations = features.map(feature => feature.geometry.coordinates);

    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    const destinationChunks = chunkArray(destinations, chunkSize);
    const allDistances = [];

    for (const chunk of destinationChunks) {
        const coordinates = [sourceCoordinates, ...chunk]
        .map(coord => coord.join(","))
        .join(";");

        retry = 0;
        while (true) {
            if (retry > 3) {
                console.error("Request failed. Max retry exceeded.");
                return null;
            }
            try {
                const response = await axios.get(`${BASE_URL}/${coordinates}`, {
                    ...options,
                    params: {
                        annotations: "distance",
                    },
                    timeout: 5000,
                });
    
                allDistances.push(...response.data.distances[0].slice(1));
                break;
            } catch (error) {
                if (axios.isCancel(error)) {
                    return null
                } else {
                    ++retry;
                    console.error(`Request failed. Retrying... (${retry})`);
                }
            }
        }
    }

    return allDistances;
};

const fetchDistance = async (source, destination, options = {}) => {
    const BASE_URL = "https://api.suzueyume.id.vn/osrm/table/v1/driving";

    const sourceCoordinates = [source.longitude, source.latitude];
    const destinationCoordinates = [destination.longitude, destination.latitude];

    const coordinates = [sourceCoordinates, destinationCoordinates]
        .map(coord => coord.join(","))
        .join(";");

    try {
        const response = await axios.get(`${BASE_URL}/${coordinates}`, {
            ...options,
            params: {
                annotations: "distance",
            },
        });

        return response.data.routes[0].distance;
    } catch (error) {
        console.error("Request failed.", error);
        return null;
    }
};

export { fetchDistances, fetchDistance };