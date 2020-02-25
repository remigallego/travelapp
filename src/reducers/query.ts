import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import { Place, SessionsOpts } from '../Backend/types';
import { resetOnboardingPlaces } from './onboardingSearch';
import Backend from '../Backend';
import {
  setKey,
  toggleSessionLoading,
  toggleSessionLoadingInsideScreen,
} from './session';
import { setResults } from './results';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

export interface QueryState {
  country: string;
  currency: string;
  locale: string; // ISO Locale
  originPlace: Place; // Backend needs string
  destinationPlace: Place; // Backends needs string
  outboundDate: Date; // Backends needs YYYY-MM-DD
  adults: number;
  /* ⏬optional */

  inboundDate?: Date; // Backends needs YYYY-MM-DD
  cabinClass?: string;
  children?: number;
  infants?: number;
  includeCarriers?: string;
  excludeCarriers?: string;
  groupPricing?: string;
}

export const queryInitialState: QueryState = {
  country: 'US',
  currency: 'EUR',
  locale: 'en-US',
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

const SET_ORIGIN_TO_QUERY = 'SET_ORIGIN_TO_QUERY';
const SET_DESTINATION_TO_QUERY = 'SET_DESTINATION_TO_QUERY';
const SET_INBOUND_TO_QUERY = 'SET_INBOUND_TO_QUERY';
const SET_OUTBOUND_TO_QUERY = 'SET_OUTBOUND_TO_QUERY';
const SET_ADULTS_TO_QUERY = 'SET_ADULTS_TO_QUERY';
const SET_INFANTS_TO_QUERY = 'SET_INFANTS_TO_QUERY';
const SET_CURRENCY_TO_QUERY = 'SET_CURRENCY_TO_QUERY';

const queryReducer = (state: QueryState = queryInitialState, action: any) => {
  switch (action.type) {
    case SET_ORIGIN_TO_QUERY:
      return {
        ...state,
        originPlace: action.payload.origin,
      };
    case SET_DESTINATION_TO_QUERY:
      return {
        ...state,
        destinationPlace: action.payload.destination,
      };
    case SET_OUTBOUND_TO_QUERY:
      return {
        ...state,
        outboundDate: action.payload.date,
      };
    case SET_INBOUND_TO_QUERY:
      return {
        ...state,
        inboundDate: action.payload.date,
      };
    case SET_ADULTS_TO_QUERY:
      return {
        ...state,
        adults: action.payload.adults,
      };
    case SET_INFANTS_TO_QUERY:
      return {
        ...state,
        infants: action.payload.infants,
      };
    case SET_CURRENCY_TO_QUERY:
      return {
        ...state,
        currency: action.payload.currency,
      };
    default:
      return state;
  }
};

export const setCurrencyToQuery = (currency: string) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    return dispatch({
      type: SET_CURRENCY_TO_QUERY,
      payload: {
        currency,
      },
    });
  };
};

export const setOriginToQuery = (origin: Place) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOnboardingPlaces('origin'));
    return dispatch({
      type: SET_ORIGIN_TO_QUERY,
      payload: {
        origin,
      },
    });
  };
};

export const setDestinationToQuery = (destination: Place) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOnboardingPlaces('destination'));
    return dispatch({
      type: SET_DESTINATION_TO_QUERY,
      payload: {
        destination,
      },
    });
  };
};

export const setOutboundToQuery = (date: Date) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    return dispatch({
      type: SET_OUTBOUND_TO_QUERY,
      payload: {
        date,
      },
    });
  };
};

export const setInboundToQuery = (date: Date) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    return dispatch({
      type: SET_INBOUND_TO_QUERY,
      payload: {
        date,
      },
    });
  };
};

export const setAdultsToQuery = (adults: number) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    if (adults <= 0 || adults >= 10) return;
    return dispatch({
      type: SET_ADULTS_TO_QUERY,
      payload: {
        adults,
      },
    });
  };
};

export const setInfantsToQuery = (infants: number) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    if (infants < 0 || infants >= 10) return;
    return dispatch({
      type: SET_INFANTS_TO_QUERY,
      payload: {
        infants,
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
      let inboundDate = null;
      if (searchSession.inboundDate) {
        inboundDate = moment(searchSession.inboundDate).format(DATE_FORMAT);
      }

      return {
        ...searchSession,
        inboundDate,
        outboundDate: moment(searchSession.outboundDate).format(DATE_FORMAT),
        destinationPlace: searchSession.destinationPlace.PlaceId,
        originPlace: searchSession.originPlace.PlaceId,
      };
    };
    const key = await Backend.createSession(craftOptions());
    dispatch(setKey(key));
    const results = await Backend.pollSession(key, true);
    dispatch(setResults(results));
    dispatch(toggleSessionLoading(false));
  };
};

export const recreateSession = () => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    dispatch(toggleSessionLoadingInsideScreen(true));

    const craftOptions: () => SessionsOpts = () => {
      const searchSession = getState().query;
      let inboundDate = null;
      if (searchSession.inboundDate) {
        inboundDate = moment(searchSession.inboundDate).format(DATE_FORMAT);
      }

      return {
        ...searchSession,
        inboundDate,
        outboundDate: moment(searchSession.outboundDate).format(DATE_FORMAT),
        destinationPlace: searchSession.destinationPlace.PlaceId,
        originPlace: searchSession.originPlace.PlaceId,
      };
    };
    const key = await Backend.createSession(craftOptions());
    dispatch(setKey(key));
    const results = await Backend.pollSession(key, false);
    dispatch(setResults(results));
    dispatch(toggleSessionLoadingInsideScreen(false));
  };
};

export const updateSession = () => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    if (getState().session.loading || getState().session.loadingInsideScreen)
      return;
    const key = getState().session.key;
    const results = await Backend.pollSession(key, false);
    if (key !== getState().session.key) return;
    dispatch(setResults(results));
  };
};

export default queryReducer;
