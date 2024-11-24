import BottomSheet, { BottomSheetFlatList, BottomSheetFooter, BottomSheetScrollView, BottomSheetSectionList, BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, Tab, TabView, Divider } from '@rneui/themed';
import { Star } from 'lucide-react-native';
import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface BottomSheetCollectionProps {
    foodData: any;
    placeData: any;
    onTabIndexChange?: (index: number) => void;
    onItemPress?: (item: any) => void;
}

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
    itemsPerPage = 10,
    windowSize = 10,
    onItemPress = () => {},
}) => {
    return (
        <BottomSheetFlatList
            data={data}
            renderItem={({ item }) => <CollectionItem data={item} onPress={onItemPress}/>}
            ItemSeparatorComponent={() => <Divider inset={false} />}
            initialNumToRender={itemsPerPage}
            removeClippedSubviews={true}
            maxToRenderPerBatch={itemsPerPage}
            updateCellsBatchingPeriod={10}
            windowSize={windowSize}
        />
    );
};

interface CollectionItemProps {
    data: any;
    onPress?: (item: any) => void;
}

const CollectionItem: React.FC<CollectionItemProps> = ({data: item, onPress=() => {}}) => {
    return (
        <TouchableOpacity style={ItemStyle.container} onPress={() => onPress(item)}>
            <Image
                source={{uri: item.properties.picture}}
                style={ItemStyle.image}
            />
            <View style={ItemStyle.description}>
                <Text numberOfLines={1} style={ItemStyle.name}>{item.properties.name}</Text>
                <Text numberOfLines={1} style={ItemStyle.address}>{item.properties.address}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginLeft: 'auto'}}>
                <Star size={16} fill='#ffc02d' color='#ffc02d'/>
                <Text>{item.properties.avg_rating.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const BottomSheetCollection: React.FC<BottomSheetCollectionProps> = ({foodData, placeData, onTabIndexChange=() => {}, onItemPress=() => {}}) => {
    const snapPoints = React.useMemo(() => ['15%', '50%', '100%'], []);
    const [index, setIndex] = React.useState(0);
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    const handleItemPress = (item: any) => {
        onItemPress(item);
        bottomSheetRef.current?.collapse();
    };

    return (
        <BottomSheet
            index={1}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
        >
            <Tab
                value={index}
                onChange={(e) => {
                    setIndex(e);
                    onTabIndexChange(e);
                }}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Địa điểm"
                    titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
                />
                <Tab.Item
                    title="Đặc sản"
                    titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
                />
            </Tab>
            <TabView
                value={index}
                onChange={setIndex}
                disableSwipe={true}
            >
                <TabView.Item>
                    <LazyFlatList data={placeData} onItemPress={handleItemPress}/>
                </TabView.Item>
                <TabView.Item>
                    <LazyFlatList data={foodData} onItemPress={handleItemPress}/>
                </TabView.Item>
            </TabView>
        </BottomSheet>
    );
};

export default BottomSheetCollection;