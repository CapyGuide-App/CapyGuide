import React, { createContext, useContext, useState } from 'react';

import foodPoints from '../data/food_points.json';
import placePoints from '../data/travel_points.json';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [places, setPlaces] = useState(placePoints);
    const [restaurants, setRestaurants] = useState(foodPoints);

    const placeData = React.useMemo(() => ( places ), [places]);
    const foodData = React.useMemo(() => ( restaurants ), [restaurants]);

    return (
        <DataContext.Provider value={{ placeData, foodData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);