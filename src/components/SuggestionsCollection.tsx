import React from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import { HeartIcon } from "lucide-react-native";
import { useTheme } from "@rneui/themed";

interface SuggestionsCollectionProps {
    data: any;
    onPressItem?: (item: any) => void;
    status: string;
    marginHorizontal: number;
}

interface SuggestionsItemProps {
    item: any;
    index?: number;
    onPress?: () => void;
    paddingHorizontal?: number;
}

const {width} = Dimensions.get('screen');

const SuggestionsItem: React.FC<SuggestionsItemProps> = ({item, index, onPress, paddingHorizontal}) => {
    const {theme} = useTheme();
    return (
        <View style={[itemStyles.container, {paddingHorizontal}]}>
            <Image 
                source={{uri: item.picture}} 
                style={itemStyles.image}
                resizeMode="cover"
            />
            <LinearGradient 
                colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.8)']}
                style={itemStyles.background}
            >
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <View>
                    <Text style={{
                        fontSize: 10, 
                        color: 'white', 
                        backgroundColor: theme.colors.primary, 
                        padding: 5, 
                        paddingHorizontal: 10,
                        fontWeight: 'bold',
                        borderRadius: 20
                    }}>
                        {item.category.toUpperCase()}
                    </Text>
                    </View>
                    <TouchableOpacity
                        style={itemStyles.icon}
                    >
                        <HeartIcon 
                            size={24} 
                            color="white" 
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onPress}>
                    <Text style={itemStyles.title}>{item.name}</Text>
                    <Text style={itemStyles.description}> {item.address} </Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const itemStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 20,
        justifyContent: 'space-between',
        padding: 15,
    },
    icon: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 8,
        borderRadius: 50,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    description: {
        fontSize: 12,
        color: 'white',
    },
});

const SuggestionsCollection: React.FC<SuggestionsCollectionProps> = ({data, onPressItem, status = 'loading', marginHorizontal}) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [suggestData, setSuggestData] = React.useState<any>(null);
    const {theme} = useTheme();

    React.useEffect(() => {
        if (data) {
            setSuggestData(data.filter((item: any) => item.should_visit));
        }
    }, [data]);

    return (
        <View style={{flex: 1, marginHorizontal}}>
            {status === 'loading' && <ActivityIndicator size="large" color={theme.colors.primary} />}
            {status === 'success' && (
                <Carousel
                    data={suggestData}
                    autoPlay={true}
                    autoPlayInterval={10000}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={({item, index}) => (
                        <SuggestionsItem 
                            item={item} 
                            index={index} 
                            onPress={() => onPressItem && onPressItem(item)}
                            paddingHorizontal={Math.abs(marginHorizontal)}
                        />
                    )}
                    vertical={false}
                    width={width}
                    height={220}
                />    
            )}
        </View>
    );
}

export default SuggestionsCollection;