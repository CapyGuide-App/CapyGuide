import { SearchBar, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import NearByCollection from '../components/NearByCollection';
import { useTranslation } from 'react-i18next';
import { Button } from '@rneui/base';
import i18n, { changeLanguage } from '../i18n/i18n';

const hexToRGBA = (hex: string, opacity: number) => {
    hex = hex.replace('#', '');
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const HomeScreen: React.FC = () => {
    const { theme } = useTheme();
    const {t} = useTranslation();

    const [search, setSearch] = useState("");
    const updateSearch = (search:string) => {
        setSearch(search);
    };

    const [isFocused, setIsFocused] = useState(false);

    const searchIconProps = {
        color: theme.colors.primary,
        size: 24,
    };

    const sampleData: { title: string; description: string; data: string[] }[] = [
        {
            title: "Sample Title 1",
            description: "This is the description for the first sample item.",
            data: ['Pizza', 'Burger', 'Risotto','Pizza', 'Burger', 'Risotto'],
        },
      ];

    return (
        <ScrollView style={styles.container}>
            <SearchBar placeholder={t("search")}
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderBottomWidth: 0,
                }}
                inputContainerStyle={{
                    backgroundColor: hexToRGBA(theme.colors.primary, 0.1),
                    borderColor: isFocused ? theme.colors.primary : 'transparent',
                    borderWidth: 2,
                    borderBottomWidth: 2,
                }}
                inputStyle={{
                    color: theme.colors.primary,
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                searchIcon={searchIconProps}
                clearIcon={searchIconProps}
                cancelIcon={searchIconProps}
                round={true}
                lightTheme={true}
                onChangeText={updateSearch}
                value={search}
                placeholderTextColor={hexToRGBA(theme.colors.primary, 0.7)}
            />
            
            <Button onPress={() => changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}>
                {t('change language')} 
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});

export default HomeScreen;