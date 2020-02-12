import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppWithProvider from './src/AppWithProvider';

const App: () => ReactElement = () => {
  return (
    <>
      <Provider store={store}>
        <AppWithProvider />
      </Provider>
    </>
  );
};

export default App;
