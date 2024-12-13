import React, {createContext, useContext, useState, useEffect} from 'react';
import {createTheme, ThemeProvider} from '@rneui/themed';
import {loadSettings, updateSettings} from '../Storage';

declare module '@rneui/themed' {
  export interface Colors {
    text: string;
    element: string;
    element2: string;
    element3: string;
    button: string;
    background2: string;
    link: string;
    normalText: string;
    dimText: string;
    border: string;
    selected: string;
    tabBar: string;
    searchBar: string;
    comment: string;
    indicatorBar: string;
    tabBarIcon: string;
    button2Active: string;
    button2ActiveText: string;
    button2: string;
    button2Text: string;
  }
}

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};

const CustomThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await loadSettings();
      setIsDarkMode(settings?.theme === 'dark');
    };

    fetchSettings();
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    await updateSettings({theme: newTheme});
  };

  const colors = {
    primary: '#027fff',
    black: '#0b0b0b',
    white: '#ffffff',
  };

  const theme = createTheme({
    lightColors: {
      // primary: '#ea940c',
      primary: '#027fff',
      element: '#ffffff',
      element2: colors.white,
      element3: '#c8e1fe',
      // button: '#ffaa00',
      button: '#3D90CF',
      background2: '#f3f5f7',
      // background2: '#f5f5f5',
      // link: '#ffaa00',
      link: '#3D90CF',
      text: '#333',
      dimText: '#858585',
      border: '#eee',
      selected: '#FFE4B5',
      tabBar: colors.white,
      tabBarIcon: 'gray',
      button2Active: '#027fff',
      searchBar: '#3D90CF',
      // comment: '#E0E0E0',
      comment: '#F0F2F5',
      indicatorBar: '#000',
      button2ActiveText: colors.white,
      button2: '#efefef',
      button2Text: colors.primary,
      white: colors.white,
    },
    darkColors: {
      primary: '#027fff',
      element: '#2e2e2e',
      element2: '#6B6B6B',
      element3: '#333',
      button: '#48aaf5',
      background2: '#191919',
      link: '#48aaf5',
      text: colors.white,
      dimText: '#d0d0d0',
      border: '#333',
      selected: '#2e2e2e',
      tabBar: colors.black,
      tabBarIcon: colors.white,
      button2Active: colors.white,
      button2ActiveText: colors.black,
      button2: '#484d4e',
      searchBar: '#5BAEF5',
      comment: '#333334',
      indicatorBar: '#fff',
      button2Text: colors.white,
      white: colors.white,
    },
    mode: isDarkMode ? 'dark' : 'light',
  });

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
