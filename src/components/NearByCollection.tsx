import { Card, useTheme } from "@rneui/themed";
import React, { useEffect } from "react";
import { View, StyleProp, StyleSheet, Text, ViewStyle, Image, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Star } from "lucide-react-native";
import { Pressable } from "react-native";
import { FlashList } from "@shopify/flash-list";

interface NearByCollectionProps {
    title: string;
    geoData: any[];
    style?: StyleProp<ViewStyle>;
    windowSize?: number;
    onPressItem?: (item: any) => void;
    status?: 'loading' | 'error' | 'success';
    onShowAll?: () => void;
}

const NearByCollection: React.FC<NearByCollectionProps> = ({title, geoData, style, onPressItem, status = 'loading', onShowAll }) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, style]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.title}>{title}</Text>
                <Pressable onPress={() => onShowAll && onShowAll()}>
                    <Text style={{ color: theme.colors.primary }}>Xem thêm</Text>
                </Pressable>
            </View>
            {status === 'loading' && <ActivityIndicator color={theme.colors.primary} size="large" />}
            {status === 'success' && 
                <View style={{ maxHeight: 180 }}>
                    <FlashList
                        horizontal={true}
                        data={geoData.slice(0, 10)}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => onPressItem(item)}
                                style={{
                                    flex: 1,
                                }}
                            >
                                <Card theme={theme} containerStyle={styles.cardContent}>
                                    <Image source={{ uri: item.picture }} style={styles.image} />
                                    <View style={styles.content}>
                                        <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                                        <View style={styles.description}>
                                            {item.duration && <Text style={styles.descriptionText} numberOfLines={1}>{item.distance.toFixed(1)} km {'\uA78F'} {item.duration.toFixed(1)} phút</Text>}
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
                                                <Star size={16} fill='#ffc02d' color='#ffc02d' />
                                                <Text style={styles.descriptionText}>{item.avg_rating.toFixed(1)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card>
                            </Pressable>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        estimatedItemSize={180}
                        removeClippedSubviews={true}
                    />
                </View>}
        </View>
    );
};

const cardStyle = {
    padding: 0,
    width: 180,
    borderRadius: 20,
    marginLeft: 0,
    marginRight: 10,
    margin: 0,
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1
    },
    card: {
        ...cardStyle,
    },
    cardContent: {
        ...cardStyle,
        shadowColor: 'transparent',
    },
    image: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: cardStyle.borderRadius - cardStyle.padding,
        borderTopRightRadius: cardStyle.borderRadius - cardStyle.padding,
    },
    content: {
        padding: 10,
        paddingHorizontal: 10,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionText: {
        fontSize: 12,
        color: 'gray',
    },
});

export default NearByCollection;
