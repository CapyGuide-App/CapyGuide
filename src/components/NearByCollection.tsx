import { Card, useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, StyleProp, StyleSheet, Text, ViewStyle, SectionList, TouchableOpacity, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import * as turf from '@turf/turf';
import { useLocation } from "../context/LocationContext";
import { Star } from "lucide-react-native";

interface NearByCollectionProps {
    title: string;
    geoData: any;
    style?: StyleProp<ViewStyle>;
}

const NearByCollection: React.FC<NearByCollectionProps> = ({title, geoData, style}) => {
    const {theme} = useTheme();
    const {location} = useLocation();
    const [nearByData, setNearByData] = useState(geoData.features.slice(0, 20));

    useEffect(() => {
        if (location) {
            const origin = turf.point([location.coords.longitude, location.coords.latitude]);
            const features = geoData.features.map((feature: any) => {
                const distance = turf.distance(origin, feature.geometry.coordinates);
                return {
                    ...feature,
                    distance,
                };
            });

            features.sort((a: any, b: any) => a.distance - b.distance);
            setNearByData(features.slice(0, 20));
        }
    }, [location]);

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal={true}
                data={nearByData}
                renderItem={({item}) => (
                    <TouchableOpacity>
                        <Card theme={theme} containerStyle={styles.card}>
                            <Image source={{uri: item.properties.picture}} style={styles.image}/>
                            <Text numberOfLines={1} style={styles.name}>{item.properties.name}</Text>
                            <View style={styles.description}>
                                {item.distance && <Text numberOfLines={1}>{item.distance.toFixed(2)} km</Text>}
                                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                    <Star size={16} fill={theme.colors.primary} color={theme.colors.primary}/>
                                    <Text>{item.properties.avg_rating.toFixed(1)}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const cardStyle = {
    padding: 10,
    width: 180,
    height: 200,
    borderRadius: 20,
    marginLeft: 0,
    marginRight: 10,
    margin: 0,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    card: {
        ...cardStyle,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: cardStyle.borderRadius - cardStyle.padding,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});


export default NearByCollection;