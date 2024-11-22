import React, { useEffect, useState } from 'react';
import MainContainer from './src/MainContainer';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { loadSettings } from './src/Storage';
import 'react-native-gesture-handler';
import { LocationProvider } from './src/context/LocationContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DataProvider } from './src/context/DataContext';

function App() {
  const [settings, setSettings] = useState<{ theme: string; language: string } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const loadedSettings = await loadSettings();
      if (loadedSettings) {
        setSettings(loadedSettings);
      }
    };

    fetchSettings();
  }, []);

  const theme = createTheme({
    lightColors: {
      primary: '#ea940c',
    },
    mode: settings?.theme === 'dark' ? 'dark' : 'light',
  });

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <DataProvider>
          <LocationProvider>
            <MainContainer />
          </LocationProvider>
        </DataProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;