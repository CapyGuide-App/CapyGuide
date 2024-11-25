import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as turf from '@turf/turf';

import foodPoints from '../data/food_points.json';
import placePoints from '../data/travel_points.json';
import { fetchDistances } from '../request/RouteRequest';
import { useLocation } from './LocationContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [place, setPlaces] = useState(placePoints.features);
    const [food, setRestaurants] = useState(foodPoints.features);
    const abortControllerRef = useRef<AbortController | null>(null);
    const {location} = useLocation();

    const placeData = useMemo(() => place, [place]);
    const foodData = useMemo(() => food, [food]);

    useEffect(() => {
        const fetchData = async (data, onComplete) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            if (location) {
                const origin = turf.point([location.coords.longitude, location.coords.latitude]);
                data = data.map((feature) => {
                    const distance = turf.distance(origin, feature.geometry.coordinates);
                    return {
                        ...feature,
                        properties: {
                            ...feature.properties,
                            distance: distance,
                            picture: feature.properties.picture || 'https://lh3.googleusercontent.com/pw/AP1GczNG-3SVQF6xMyNXNrFgk_2AQEfuXxp0watGXLE4e6MT6Uhh0szg4En1xCOx8wolsMYJPLJFL-AlbNI3QM4omJ07oyZS-7vF_mGkEyzekuoK5dIX3ls=w2400',
                        },
                    };
                });

                data.sort((a, b) => a.properties.distance - b.properties.distance);
                if (controller.signal.aborted) {
                    return;
                }
                onComplete(data);

                const fetchData = async (slice, data) => {
                    if (!location || controller.signal.aborted) {
                        return null;
                    }
                    fetchDistances(location.coords, data, {
                        signal: controller.signal,
                    }).then((distances) => {
                        if (!distances) {
                            return null;
                        }
                        data = data.map((feature, index) => {
                            return {
                                ...feature,
                                properties: {
                                    ...feature.properties,
                                    distance: distances[index] / 1000,
                                },
                            };
                        });
                        data.sort((a, b) => a.properties.distance - b.properties.distance);
                        if (controller.signal.aborted) {
                            return null;
                        }
                        return data;
                    });
                };
                fetchData(data.slice(0, 20)).then((res) => {
                    if (res) {
                        onComplete(res);
                    }
                    
                    fetchData(data).then((res) => {
                        if (res) {
                            onComplete(res);
                        }
                    });
                }).catch((error) => {
                    console.error(error);
                });
            }
        }
        fetchData(place, setPlaces);
        fetchData(food, setRestaurants);
    }, [location]);

    return (
        <DataContext.Provider value={{ placeData, foodData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);