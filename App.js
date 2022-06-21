/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import Navigation from './navigation';
import { Provider } from 'react-redux';

import configureStore from './redux/Store/store';
  
const store = configureStore();

const App = () => {
  return (
    <Provider store = {store}>
      <Navigation />
    </Provider>
  );
};



export default App;
