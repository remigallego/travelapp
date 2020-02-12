import { Place } from '../Backend/types';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
      const request = await PermissionsAndroid.request(
        'android.permission.ACCESS_FINE_LOCATION',
      );
      hasPermissions = request === 'granted';
    } else {
      // TODO: iOS Permissions
      // const authorization = await Geolocation.requestAuthorization();
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
  return async (dispatch: ThunkDispatch<AppState, any, Action>) => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: SET_POSITION,
          payload: {
            position,
          },
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };
};

export default localisationReducer;
/*  Geolocation.getCurrentPosition(
      position => {
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    ); */
