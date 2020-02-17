import { Place } from '../Backend/types';
import { PermissionsAndroid, Platform } from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { AppState } from '../store';

export interface LocalisationState {
  hasPermissions: boolean;
  position: any;
}

const initialState: LocalisationState = {
  hasPermissions: false,
  position: {},
};

const SET_PERMISSIONS = 'SET_PERMISSIONS';
const SET_POSITION = 'SET_POSITION';

const localisationReducer = (
  state: LocalisationState = initialState,
  action: any,
) => {
  switch (action.type) {
    case SET_PERMISSIONS:
      return {
        ...state,
        hasPermissions: action.payload.hasPermissions,
      };
    case SET_POSITION:
      return {
        ...state,
        position: action.payload.position,
      };
    default:
      return state;
  }
};

export const setPermissions = () => {
  return async (dispatch: ThunkDispatch<AppState, any, Action>) => {
    let hasPermissions = false;
    if (Platform.OS === 'android') {
    } else {
    }
    dispatch({
      type: SET_PERMISSIONS,
      payload: {
        hasPermissions,
      },
    });
  };
};

export const getCurrentPosition = () => {
  return async (dispatch: ThunkDispatch<AppState, any, Action>) => {};
};

export default localisationReducer;
