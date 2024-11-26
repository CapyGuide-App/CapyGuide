import { Card, useTheme } from "@rneui/themed";
import React from "react";
import { View, StyleProp, StyleSheet, Text, ViewStyle, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Star } from "lucide-react-native";
import { Pressable } from "react-native";

interface NearByCollectionProps {
    title: string;
    geoData: any;
    style?: StyleProp<ViewStyle>;
    windowSize?: number;
    onPressItem: (item: any) => void;
}

const NearByCollection: React.FC<NearByCollectionProps> = ({ title, geoData, style, windowSize = 10, onPressItem }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                horizontal={true}
                data={geoData.slice(0, windowSize)}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => onPressItem(item)}
                        style={({ pressed }) => [
                            styles.card,
                            {
                                transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
                                opacity: pressed ? 0.8 : 1,
                            },
                        ]}
                    >
                        <Card theme={theme} containerStyle={styles.cardContent}>
                            <Image source={{ uri: item.properties.picture }} style={styles.image} />
                            <Text numberOfLines={1} style={styles.name}>{item.properties.name}</Text>
                            <View style={styles.description}>
                                {item.properties.distance && <Text numberOfLines={1}>{item.properties.distance.toFixed(1)} km</Text>}
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
                                    <Star size={16} fill='#ffc02d' color='#ffc02d' />
                                    <Text>{item.properties.avg_rating.toFixed(1)}</Text>
                                </View>
                            </View>
                        </Card>
                    </Pressable>
                )}
                keyExtractor={(item) => item.properties.id.toString()}
                initialNumToRender={windowSize}
                removeClippedSubviews={true}
                maxToRenderPerBatch={windowSize}
                updateCellsBatchingPeriod={10}
                windowSize={windowSize}
            />
        </View>
    );
};

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
    cardContent: {
        ...cardStyle,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Hiệu ứng nổi (shadow) cho Android
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
