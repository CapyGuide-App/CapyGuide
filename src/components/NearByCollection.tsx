import { Card, useTheme } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleProp, StyleSheet, Text, ViewStyle, SectionList, TouchableOpacity, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Star } from "lucide-react-native";

interface NearByCollectionProps {
    title: string;
    geoData: any;
    style?: StyleProp<ViewStyle>;
    windowSize?: number;
}

const NearByCollection: React.FC<NearByCollectionProps> = ({title, geoData, style, windowSize = 10}) => {
    const {theme} = useTheme();

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal={true}
                data={geoData.slice(0, windowSize)}
                renderItem={({item}) => (
                    <TouchableOpacity>
                        <Card theme={theme} containerStyle={styles.card}>
                            <Image source={{uri: item.properties.picture}} style={styles.image}/>
                            <Text numberOfLines={1} style={styles.name}>{item.properties.name}</Text>
                            <View style={styles.description}>
                                {item.properties.distance && <Text numberOfLines={1}>{item.properties.distance.toFixed(1)} km</Text>}
                                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 'auto'}}>
                                    <Star size={16} fill='#ffc02d' color='#ffc02d'/>
                                    <Text>{item.properties.avg_rating.toFixed(1)}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.properties.id}
                initialNumToRender={windowSize}
                removeClippedSubviews={true}
                maxToRenderPerBatch={windowSize}
                updateCellsBatchingPeriod={10}
                windowSize={windowSize}
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