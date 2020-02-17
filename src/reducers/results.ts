import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import { SessionResults } from '../Backend/types';
import { sortItinerariesByPrice } from '../utils/results';
export interface ResultsState extends SessionResults {}

const initialState: ResultsState = {
  SessionKey: '',
  Query: {
    country: 'US',
    currency: 'EUR',
    locale: 'en-US',
    originPlace: null,
    destinationPlace: null,
    outboundDate: null,
    adults: 1,
    inboundDate: null,
    cabinClass: null,
    children: null,
    infants: null,
    includeCarriers: null,
    excludeCarriers: null,
    groupPricing: null,
  },
  Status: '',
  Itineraries: [],
  Legs: [],
  Segments: [],
  Agents: [],
  Carriers: [],
  Currencies: [],
  Places: [],
};

const SET_RESULTS = 'SET_RESULTS';

const resultsReducer = (state: ResultsState = initialState, action: any) => {
  switch (action.type) {
    case SET_RESULTS:
      return {
        ...state,
        ...action.payload.results,
      };
    default:
      return state;
  }
};

export const setResults = (results: SessionResults) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    return dispatch({
      type: SET_RESULTS,
      payload: {
        results,
      },
    });
  };
};

export default resultsReducer;

export const selectResults = (state: AppState) => {
  return {
    ...state.results,
    Itineraries: sortItinerariesByPrice(state.results.Itineraries),
  };
};
