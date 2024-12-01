import {SearchBar as Search, useTheme} from '@rneui/themed';
import { ArrowLeftIcon, SearchIcon, XIcon } from 'lucide-react-native';
import React, { createRef, useMemo, useRef, useState } from 'react';
import { Animated, Easing, InteractionManager, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';
import LocationPickerText from './LocationPickerText';
import { Text } from 'react-native-svg';
import { hexToRGBA } from '../styles/Methods';

interface SearchBarProps {
    contentContainerStyle?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<SearchBarProps> = ({contentContainerStyle}) => {
    const {theme} = useTheme();
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const updateSearch = (search: string) => setSearch(search);
    const searchRef = useRef(null);
    const fakeSearchRef = useRef(null);
    const [searchPosition, setSearchPosition] = useState({x: 0, y: 0});

    const searchIconProps = {
        color: theme.colors.primary,
        size: 25,
    };

    const searchBarStyles = StyleSheet.create({
        container: {
            padding: 0,
            margin: 0,
            backgroundColor: hexToRGBA(theme.colors.primary, 0.15),
            borderColor: 'transparent',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            overflow: 'hidden',
        },
        inputContainer: {
            width: 100,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            overflow: 'hidden',
        },
        input: {
            color: theme.colors.primary,
            fontSize: 16,
            flex: 1,
        },
    });

    return (
        <>
        <View
            style={searchBarStyles.container}
            ref={fakeSearchRef}
        >
            <View style={searchBarStyles.inputContainer} 
                onStartShouldSetResponder={() => {
                    setIsFocused(true);
                    fakeSearchRef.current?.measure((x, y, width, height, pageX, pageY) => {
                        setSearchPosition({x: pageX, y: pageY});
                    });
                    return true;
                }}
            >
                <SearchIcon {...searchIconProps} />
                <TextInput style={searchBarStyles.input}
                    placeholder='Search'
                    placeholderTextColor={hexToRGBA(theme.colors.primary, 0.8)}
                    editable={false}
                    value={search}
                />
            </View>
        </View>
        <Modal isVisible={isFocused}
            animationIn="fadeIn"
            animationOut="fadeOut"
            avoidKeyboard={true}
            onShow={() => {
                setTimeout(() => {
                    searchRef.current?.focus();
                }, 200);
            }}
            backdropColor='white'
            backdropOpacity={isFocused ? 1 : 0}
            style={{
                justifyContent: 'flex-start',
                margin: 0,
                padding: 0,
                flexDirection: 'column',
            }}
            animationOutTiming={0}
        >
            <View style={[contentContainerStyle, {
                paddingTop: searchPosition.y,
            }]}>
                <View style={searchBarStyles.container} >
                    <View style={searchBarStyles.inputContainer} >
                        {isFocused ? <ArrowLeftIcon {...searchIconProps} onPress={() => {
                            setIsFocused(false);
                        }} /> : <SearchIcon {...searchIconProps} />}
                        <TextInput style={searchBarStyles.input}
                            placeholder='Search'
                            placeholderTextColor={hexToRGBA(theme.colors.primary, 0.8)}
                            editable={true}
                            ref={searchRef}
                            numberOfLines={1}
                            onChangeText={updateSearch}
                            value={search}
                        />
                        {search.length > 0 && <XIcon {...searchIconProps} onPress={() => {
                            setSearch('');
                        }} />} 
                    </View>
                </View>
            </View>
        </Modal>
        </>
    );
}

export default SearchBar;