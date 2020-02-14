import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import { Place, SessionsOpts } from '../Backend/types';
import {
  resetOnboardingDestinationPlaces,
  resetOnboardingOriginPlaces,
} from './onboardingSearch';
import Backend from '../Backend';
import { setKey, toggleSessionLoading } from './session';
import { setResults } from './results';

export interface QueryState {
  country: string;
  currency: string;
  locale: string; // ISO Locale
  originPlace: Place; // Backend needs string
  destinationPlace: Place; // Backends needs string
  outboundDate: string;
  adults: number;
  /* ⏬optional */
  inboundDate?: string;
  cabinClass?: string;
  children?: number;
  infants?: number;
  includeCarriers?: string;
  excludeCarriers?: string;
  groupPricing?: string;
}

const initialState: QueryState = {
  country: 'US',
  currency: 'EUR',
  locale: 'en-US', // ISO Locale
  originPlace: null,
  destinationPlace: null,
  outboundDate: null,
  adults: 1,
  /* ⏬optional */
  inboundDate: null,
  cabinClass: null,
  children: null,
  infants: null,
  includeCarriers: null,
  excludeCarriers: null,
  groupPricing: null,
};

const SET_ORIGIN = 'SET_ORIGIN';
const SET_DESTINATION = 'SET_DESTINATION';

const queryReducer = (state: QueryState = initialState, action: any) => {
  switch (action.type) {
    case SET_ORIGIN:
      return {
        ...state,
        originPlace: action.payload.origin,
      };
    case SET_DESTINATION:
      return {
        ...state,
        destinationPlace: action.payload.destination,
      };
    default:
      return state;
  }
};

export const setOrigin = (origin: Place) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOnboardingOriginPlaces());
    return dispatch({
      type: SET_ORIGIN,
      payload: {
        origin,
      },
    });
  };
};

export const setDestination = (destination: Place) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOnboardingDestinationPlaces());
    return dispatch({
      type: SET_DESTINATION,
      payload: {
        destination,
      },
    });
  };
};

export const createSession = () => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    dispatch(toggleSessionLoading(true));
    const craftOptions: () => SessionsOpts = () => {
      const searchSession = getState().query;
      return {
        ...searchSession,
        destinationPlace: searchSession.destinationPlace.PlaceId,
        originPlace: searchSession.originPlace.PlaceId,
      };
    };
    const key = await Backend.createSession(craftOptions());
    dispatch(setKey(key));
    const results = await Backend.pollSession(key);
    dispatch(setResults(results));
    dispatch(toggleSessionLoading(false));
    console.log(results);
  };
};

export default queryReducer;
