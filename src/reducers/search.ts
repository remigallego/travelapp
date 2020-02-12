import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import Backend from '../Backend';
import { Place } from '../Backend/types';

export interface SearchState {
  origin: Place;
  destination: Place;

  originQuery: string;
  destinationQuery: string;

  originPlaces: Place[];
  destinationPlaces: Place[];

  originLoading: boolean;
  destinationLoading: boolean;
}

const initialState: SearchState = {
  origin: null,
  destination: null,
  originQuery: '',
  destinationQuery: '',
  originPlaces: [],
  destinationPlaces: [],
  originLoading: false,
  destinationLoading: false,
};

const SET_ORIGIN = 'SET_ORIGIN';
const SET_DESTINATION = 'SET_DESTINATION';
const TOGGLE_ORIGIN_LOADING = 'TOGGLE_ORIGIN_LOADING';
const TOGGLE_DESTINATION_LOADING = 'TOGGLE_DESTINATION_LOADING';
const SET_ORIGIN_QUERY = 'SET_ORIGIN_QUERY';
const SET_DESTINATION_QUERY = 'SET_DESTINATION_QUERY';
const SET_ORIGIN_PLACES = 'SET_ORIGIN_PLACES';
const SET_DESTINATION_PLACES = 'SET_DESTINATION_PLACES';

const searchReducer = (state: SearchState = initialState, action: any) => {
  switch (action.type) {
    case SET_ORIGIN:
      return {
        ...state,
        origin: action.payload.origin,
      };
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload.destination,
      };
    case TOGGLE_ORIGIN_LOADING:
      return {
        ...state,
        originLoading: action.payload.loading,
      };
    case TOGGLE_DESTINATION_LOADING:
      return {
        ...state,
        destinationLoading: action.payload.loading,
      };
    case SET_ORIGIN_QUERY:
      return {
        ...state,
        originQuery: action.payload.originQuery,
      };
    case SET_DESTINATION_QUERY:
      return {
        ...state,
        destinationQuery: action.payload.destinationQuery,
      };
    case SET_ORIGIN_PLACES:
      return {
        ...state,
        originPlaces: action.payload.originPlaces,
      };
    case SET_DESTINATION_PLACES:
      return {
        ...state,
        destinationPlaces: action.payload.destinationPlaces,
      };
    default:
      return state;
  }
};

export const setOrigin = (origin: Place) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOriginPlaces());
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
    dispatch(resetDestinationPlaces());
    return dispatch({
      type: SET_DESTINATION,
      payload: {
        destination,
      },
    });
  };
};

export const toggleOriginLoading = (loading: boolean) => ({
  type: TOGGLE_ORIGIN_LOADING,
  payload: {
    loading,
  },
});

export const toggleDestinationLoading = (loading: boolean) => ({
  type: TOGGLE_DESTINATION_LOADING,
  payload: {
    loading,
  },
});

export const setOriginQuery = (originQuery: string) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  dispatch(setOrigin(null));
  dispatch({
    type: SET_ORIGIN_QUERY,
    payload: {
      originQuery,
    },
  });
};

export const setDestinationQuery = (destinationQuery: string) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  dispatch(setDestination(null));
  dispatch({
    type: SET_DESTINATION_QUERY,
    payload: {
      destinationQuery,
    },
  });
};

export const setOriginPlaces = () => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    if (getState().search.originLoading) {
      return;
    }
    dispatch(toggleOriginLoading(true));
    const query = getState().search.originQuery;
    const originPlaces = await Backend.getPlaces(query);
    dispatch({
      type: SET_ORIGIN_PLACES,
      payload: {
        originPlaces,
      },
    });
    dispatch(toggleOriginLoading(false));
  };
};

export const setDestinationPlaces = () => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    if (getState().search.destinationLoading) {
      return;
    }
    dispatch(toggleDestinationLoading(true));
    const query = getState().search.destinationQuery;
    const destinationPlaces = await Backend.getPlaces(query);
    dispatch({
      type: SET_DESTINATION_PLACES,
      payload: {
        destinationPlaces,
      },
    });
    dispatch(toggleDestinationLoading(false));
  };
};

export const resetOriginPlaces = () => ({
  type: SET_ORIGIN_PLACES,
  payload: {
    originPlaces: new Array(0),
  },
});

export const resetDestinationPlaces = () => ({
  type: SET_DESTINATION_PLACES,
  payload: {
    destinationPlaces: new Array(0),
  },
});

export default searchReducer;
