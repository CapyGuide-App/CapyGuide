import { useTheme } from "@rneui/themed";
import { ArrowLeftIcon, ArrowUpIcon, ArrowUpLeftIcon, HistoryIcon, MapPinIcon, SearchIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Button,
    Easing,
    StyleProp,
    StyleSheet,
    TextInput,
    View,
    ViewStyle,
    TouchableWithoutFeedback,
    Text,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import { Portal, PortalHost } from "@gorhom/portal";
import { formatNumber, normalizeString } from "../styles/Methods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";

interface SearchPoiItemProps {
    item: any;
    type: string;
    searchText?: string;
    onPress?: (item: any) => void;
    onPaste?: (item: any) => void;
}

export const SearchPoiItem: React.FC<SearchPoiItemProps> = ({ item, type, searchText, onPress, onPaste }) => {
    const { theme } = useTheme();
    const prefixLength = searchText?.length || 0;
    const prefix = item.name.slice(0, prefixLength);
    const remainder = item.name.slice(prefixLength);

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
        },
        icon: {
            alignItems: "center",
        },
        prefix: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#767676",
        },
        remainder: {
            color: "black",
        },
    });

    return (
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", paddingVertical: 10 }} onPress={onPress}>
            <View style={{ alignItems: "center", width: 40 }}>
            {type === "search" ? ( <MapPinIcon color={theme.colors.primary} size={25} /> )
                : ( <HistoryIcon color={theme.colors.primary} size={25} /> )}
            {item.distance && <Text style={{ fontSize: 12, color: theme.colors.primary }}>{formatNumber(item.distance)} km</Text>}
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text numberOfLines={1} style={styles.prefix}>
                    {prefix}
                    <Text style={styles.remainder}>{remainder}</Text>
                </Text>
                {item.address && <Text numberOfLines={1} style={{ fontSize: 14, color: "#767676" }}>{item.address}</Text>}
            </View>

            {type === "search" && 
            <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", padding: 5, borderRadius: 50 }} onPress={onPaste}>
                <ArrowUpLeftIcon color={theme.colors.primary} size={25} />
            </TouchableOpacity>}
        </TouchableOpacity>
    );
};

interface SearchBarProps {
    contentContainerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    clearOnClose?: boolean;
    backgroundColor?: string;
    onSelected?: (item: any) => void;
    ref?: any;
    handleSearchData?: (data: any) => void;
    placeholder?: string;
    type: "poi" | "article";
    isModal?: boolean;
    data: any[];
    searchField?: string;
}

const SearchBar: React.FC<SearchBarProps> = React.forwardRef(({ style, contentContainerStyle, clearOnClose = true, backgroundColor, handleSearchData, onSelected, placeholder = "Tìm kiếm", type, isModal = true, data, searchField }, ref) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const animationValue = useRef(new Animated.Value(0)).current;
    const [searchBarPosition, setSearchBarPosition] = useState({ x: 0, y: 0 });
    const fakeSearchBarRef = useRef<View>(null);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState<any[]>(data);
    const searchInputRef = useRef<TextInput>(null);
    const [searchHistory, setSearchHistory] = useState<any[]>([]);

    React.useImperativeHandle(ref, () => ({
        searchResult,
    }));

    const STORAGE_KEY = "SEARCH_HISTORY" + (type === "poi" ? "_POI" : "_ARTICLE");
    const saveSearch = async (term) => {
        try {
            if (searchField ? !term[searchField] : !term.name) {
                return;
            }
            const updatedHistory = [term, ...searchHistory.filter((item) => 
                searchField ? item[searchField] !== term.name : item.name !== term.name
            )];

            // Save max 10 items
            if (updatedHistory.length > 10) {
                updatedHistory.pop();
            }
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
            setSearchHistory(updatedHistory);

        } catch (error) {
            console.error("Error saving search term:", error);
        }
    };

    const loadSearchHistory = async () => {
        try {
            const history = await AsyncStorage.getItem(STORAGE_KEY);
            if (history) {
                setSearchHistory(JSON.parse(history));
            }
        } catch (error) {
            console.error("Error loading search history:", error);
        }
    };

    const clearHistory = async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setSearchHistory([]);
        } catch (error) {
            console.error("Error clearing search history:", error);
        }
    };

    useEffect(() => {
        loadSearchHistory();
    }, []);

    useEffect(() => {
        setSearchResult(data);
    }, [data]);

    const openModal = () => {
        fakeSearchBarRef.current?.measure((x, y) => {
            setSearchBarPosition({ x, y });
        });
        setTimeout(() => {
            if (!clearOnClose) {
                searchInputRef.current?.setNativeProps({ text: searchText });
                search(searchText);
            }
        }, 50);
        setIsFocused(true);
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(animationValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => setIsFocused(false));
        if (clearOnClose) {
            setSearchText("");
            setSearchResult(data);
        }
    };

    const search = (text: string) => {
        text = text.trim();
        setSearchText(text);
        if (text.length > 0) {
            const normalizedText = normalizeString(text);
            setSearchResult(data?.filter((item: any) => {
                const name = searchField ? item[searchField] : item.name;
                return normalizeString(name).startsWith(normalizedText);
            }));
        } else {
            setSearchResult(data);
        }
    }

    useEffect(() => {
        handleSearchData && handleSearchData(searchResult);
    }, [searchResult]);

    const pasteSearch = (item) => {
        setSearchText(item.name);
        searchInputRef.current?.setNativeProps({ text: item.name });
        searchInputRef.current?.focus();
        search(item.name);
    };

    const animatedOpacity = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    
    const animatedBackgroundColor = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["white", "rgb(242, 242, 242)"],
    });

    const animatedRotate = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-90deg"],
    });    

    BackHandler.addEventListener("hardwareBackPress", () => {
        if (isFocused) {
            closeModal();
            return true;
        }
        return false;
    });

    const searchBarStyles = StyleSheet.create({
        container: {
            padding: 0,
            margin: 0,
            backgroundColor: backgroundColor || "white",
            borderRadius: 20,
        },
        inputContainer: {
            flexDirection: "row",
            gap: 10,
            overflow: "hidden",
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignItems: "center",
        },
        input: {
            color: theme.colors.primary,
            fontSize: 16,
            flex: 1,
        },
        modalContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            opacity: animatedOpacity,
            paddingTop: searchBarPosition.y,
        },
    });

    return (
        <>
            <View style={[searchBarStyles.container, style]} ref={fakeSearchBarRef}>
                <TouchableWithoutFeedback onPress={openModal}>
                    <View style={[searchBarStyles.inputContainer]}>
                        <SearchIcon color={theme.colors.primary} size={25} />
                        <TextInput
                            style={searchBarStyles.input}
                            placeholder={placeholder}
                            placeholderTextColor={theme.colors.primary}
                            editable={!isModal}
                            onChangeText={search}
                            value={searchText}
                            clearTextOnFocus={false}
                            numberOfLines={1}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {isModal && <Portal hostName="search-bar">
                {isFocused && (
                <Animated.View style={[searchBarStyles.modalContainer, contentContainerStyle]}>
                    <Animated.View style={[searchBarStyles.container, {backgroundColor: backgroundColor || animatedBackgroundColor}]}>
                        <View style={searchBarStyles.inputContainer}>
                            <Animated.View style={{ transform: [{ rotate: animatedRotate }] }}>
                                <TouchableOpacity onPress={closeModal}>
                                    <ArrowUpIcon color={theme.colors.primary} size={25}/>
                                </TouchableOpacity>
                            </Animated.View>
                            <TextInput
                                style={searchBarStyles.input}
                                placeholder={placeholder}
                                placeholderTextColor={theme.colors.primary}
                                autoFocus
                                onChangeText={search}
                                ref={searchInputRef}
                                clearTextOnFocus={false}
                                numberOfLines={1}
                                onSubmitEditing={() => {
                                    if (searchText.length > 0) {
                                        saveSearch({ name: searchText });
                                        search(searchText);
                                        closeModal();
                                    }
                                }}
                            />
                        </View>
                    </Animated.View>
                    <View style={{ flex: 1 }}>
                        <FlashList
                            data={(searchText.length > 0 ? searchResult : searchHistory).slice(0, 5)}
                            renderItem={({ item }) => (
                                type === "poi" ? (
                                    <SearchPoiItem item={item} 
                                    type={searchText.length > 0 ? "search" : "history"}
                                    searchText={searchText}
                                    onPress={() => {
                                        saveSearch(item);
                                        pasteSearch(item);
                                        if (item.id || !clearOnClose) {
                                            closeModal();
                                        }
                                        item.id && onSelected && onSelected(item);
                                    }}
                                    onPaste={() => {
                                        pasteSearch(item);
                                    }}
                                />) : (
                                    <Text>{searchField ? item[searchField] : item.name}</Text>
                                )
                            )}
                            keyExtractor={(item) => (item.id?.toString() || (searchField ? item[searchField] : item.name))}
                            estimatedItemSize={50}
                        />
                    </View>
                </Animated.View>
                )}
            </Portal>}
        </>
)});

export default SearchBar;