
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import App from './App';
import {name as appName} from './app.json';

const theme = {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
      myOwnColor: '#BADA55',
    }
  };


export default function Main() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
