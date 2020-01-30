import React, { ReactElement } from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/AppNavigator';
import { StatusBar } from 'react-native';
import colors from './src/colors';

const AppContainer = createAppContainer(AppNavigator);

const App: () => ReactElement = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
