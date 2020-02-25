import React, { ReactElement } from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

const AppWithProvider: () => ReactElement = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

export default AppWithProvider;
