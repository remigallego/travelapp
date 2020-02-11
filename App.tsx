import React, { ReactElement } from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/AppNavigator';

const AppContainer = createAppContainer(AppNavigator);

const App: () => ReactElement = () => {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest;
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData;

  fetch;

  if (window.__FETCH_SUPPORT__) {
    window.__FETCH_SUPPORT__.blob = false;
  } else {
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
    global.FileReader = global.originalFileReader
      ? global.originalFileReader
      : global.FileReader;
  }

  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
