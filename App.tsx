import React, {useState} from 'react';
import MainContainer from './src/MainContainer';
import 'react-native-gesture-handler';
import {LocationProvider} from './src/context/LocationContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthContext';
import {PortalProvider} from '@gorhom/portal';
import CustomThemeProvider from './src/context/ThemeContext';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

function App() {
  const [settings, setSettings] = useState<{
    // theme: string;
    language: string;
  } | null>(null);

  return (
    <CustomThemeProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <PortalProvider>
          <SafeAreaProvider>
            <AuthProvider>
              <LocationProvider>
                <MainContainer/>
              </LocationProvider>
            </AuthProvider>
          </SafeAreaProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    </CustomThemeProvider>
  );
}

export default App;
