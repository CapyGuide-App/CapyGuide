import React, {createContext, useContext, useState, useEffect} from 'react';
import {createTheme, ThemeProvider} from '@rneui/themed';
import {loadSettings, updateSettings} from '../Storage';

declare module '@rneui/themed' {
  export interface Colors {
    text: string;
    element: string;
    element2: string;
    button: string;
    background2: string;
    link: string;
    normalText: string;
    dimText: string;
    border: string;
    selected: string;
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

  const theme = createTheme({
    lightColors: {
      primary: '#ea940c',
      element: '#f9f9f9',
      element2: '#fff',
      button: '#ffaa00',
      background2: '#f9f9f9',
      link: '#ffaa00',
      text: '#333',
      dimText: '#666',
      border: '#eee',
      selected: '#FFDD77',
    },
    darkColors: {
      primary: '#3D90CF',
      element: '#2e2e2e',
      element2: '#6B6B6B',
      button: '#3D90CF',
      background2: '#000000',
      link: '#3D90CF',
      text: '#fff',
      dimText: '#f3f3f3',
      border: '#333',
      selected: '#2e2e2e',
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
