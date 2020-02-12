import React, { ReactElement, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';
import { useDispatch } from 'react-redux';
import { useSelector } from './store';
import { getCurrentPosition } from './reducers/localisation';

const AppContainer = createAppContainer(AppNavigator);

const AppWithProvider: () => ReactElement = () => {
  const dispatch = useDispatch();
  const hasPermissions = useSelector(
    state => state.localisation.hasPermissions,
  );

  useEffect(() => {
    dispatch(getCurrentPosition());
  }, [hasPermissions]);
  return (
    <>
      <AppContainer />
    </>
  );
};

export default AppWithProvider;
