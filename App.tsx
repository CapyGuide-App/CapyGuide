import React from 'react';
import MainContainer from './src/MainContainer';
import { createTheme, makeStyles, ThemeProvider } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#ea940c',
  },
  mode: 'light',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer />
    </ThemeProvider>
  );
}

export default App;