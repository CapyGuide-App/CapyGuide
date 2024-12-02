import BottomSheet, { BottomSheetFlashList, BottomSheetFlatList, BottomSheetFooter, BottomSheetScrollView, BottomSheetSectionList, BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, Tab, TabView, Divider } from '@rneui/themed';
import { Flag, LandPlot, Star } from 'lucide-react-native';
import * as React from "react";
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const ItemStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        gap: 10,
    },
    image: {
        width: 120,
        height: 80,
    },
    description: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 12,
    },
});

interface LazyFlatListProps {
    data: any[];
    itemsPerPage?: number;
    windowSize?: number;
    onItemPress?: (item: any) => void;
}
  
const LazyFlatList: React.FC<LazyFlatListProps> = ({
    data,
    itemsPerPage = 15,
    onItemPress = () => {}
}) => {

    return (
        <View style={{flex: 1, width: '100%'}}>
            <BottomSheetFlashList
                data={data}
                renderItem={({ item }) => <CollectionItem data={item} onPress={onItemPress} />}
                ItemSeparatorComponent={() => <Divider inset={false} />}
                removeClippedSubviews={true}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                onEndReachedThreshold={0.2}
                estimatedItemSize={100}
            />
        </View>
    );
};

interface CollectionItemProps {
    data: any;
    onPress?: (item: any) => void;
}

const CollectionItem: React.FC<CollectionItemProps> = ({data: item, onPress=() => {}}) => {
    return (
        <TouchableOpacity style={ItemStyle.container} onPress={() => onPress(item)}
            accessible={true} accessibilityRole='button' accessibilityLabel={item.name}
        >
            <Image
                source={{uri: item.picture}}
                style={ItemStyle.image}
            />
            <View style={ItemStyle.description}>
                <Text numberOfLines={1} style={ItemStyle.name}>{item.name}</Text>
                <Text numberOfLines={1} style={ItemStyle.address}>{item.address}</Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-start', gap: 5, marginLeft: 'auto'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <Star size={16} fill='#ffc02d' color='#ffc02d'/>
                    <Text>{item.avg_rating.toFixed(1)}</Text>
                </View>
                {item.distance &&
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <Flag size={16} fill='#1aac4a' color='#1aac4a'/>
                    <Text>{item.distance.toFixed(1)}km</Text>
                </View>
                }
            </View>
        </TouchableOpacity>
    );
};

export { LazyFlatList }