import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import Backend from '../Backend';
import { Place } from '../Backend/types';

export interface OnboardingSearchState {
  origin: {
    value: Place;
    query: string;
    places: Place[];
    loading: boolean;
  };
  destination: {
    value: Place;
    query: string;
    places: Place[];
    loading: boolean;
  };
}

const initialState: OnboardingSearchState = {
  origin: {
    value: null,
    query: '',
    places: [],
    loading: false,
  },
  destination: {
    value: null,
    query: '',
    places: [],
    loading: false,
  },
};

const SET_ONBOARDING_ORIGIN = 'SET_ONBOARDING_ORIGIN';
const SET_ONBOARDING_DESTINATION = 'SET_ONBOARDING_DESTINATION';
const TOGGLE_ONBOARDING_ORIGIN_LOADING = 'TOGGLE_ONBOARDING_ORIGIN_LOADING';
const TOGGLE_ONBOARDING_DESTINATION_LOADING =
  'TOGGLE_ONBOARDING_DESTINATION_LOADING';
const SET_ONBOARDING_ORIGIN_QUERY = 'SET_ONBOARDING_ORIGIN_QUERY';
const SET_ONBOARDING_DESTINATION_QUERY = 'SET_ONBOARDING_DESTINATION_QUERY';
const SET_ONBOARDING_ORIGIN_PLACES = 'SET_ONBOARDING_ORIGIN_PLACES';
const SET_ONBOARDING_DESTINATION_PLACES = 'SET_ONBOARDING_DESTINATION_PLACES';

const onboardingSearchReducer = (
  state: OnboardingSearchState = initialState,
  action: any,
) => {
  switch (action.type) {
    case SET_ONBOARDING_ORIGIN:
      return {
        ...state,
        origin: {
          ...state.origin,
          value: action.payload.origin,
        },
      };
    case SET_ONBOARDING_DESTINATION:
      return {
        ...state,
        destination: {
          ...state.destination,
          value: action.payload.destination,
        },
      };
    case TOGGLE_ONBOARDING_ORIGIN_LOADING:
      return {
        ...state,
        origin: {
          ...state.origin,
          loading: action.payload.loading,
        },
      };
    case TOGGLE_ONBOARDING_DESTINATION_LOADING:
      return {
        ...state,
        destination: {
          ...state.destination,
          loading: action.payload.loading,
        },
      };
    case SET_ONBOARDING_ORIGIN_QUERY:
      return {
        ...state,
        origin: {
          ...state.origin,
          query: action.payload.originQuery,
        },
      };
    case SET_ONBOARDING_DESTINATION_QUERY:
      return {
        ...state,
        destination: {
          ...state.destination,
          query: action.payload.destinationQuery,
        },
      };
    case SET_ONBOARDING_ORIGIN_PLACES:
      return {
        ...state,
        origin: {
          ...state.origin,
          places: action.payload.originPlaces,
        },
      };
    case SET_ONBOARDING_DESTINATION_PLACES:
      return {
        ...state,
        destination: {
          ...state.destination,
          places: action.payload.destinationPlaces,
        },
      };
    default:
      return state;
  }
};

export const setOnboardingOrigin = (origin: Place) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOnboardingOriginPlaces());
    return dispatch({
      type: SET_ONBOARDING_ORIGIN,
      payload: {
        origin,
      },
    });
  };
};

export const setOnboardingDestination = (destination: Place) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOnboardingDestinationPlaces());
    return dispatch({
      type: SET_ONBOARDING_DESTINATION,
      payload: {
        destination,
      },
    });
  };
};

export const toggleOnboardingOriginLoading = (loading: boolean) => ({
  type: TOGGLE_ONBOARDING_ORIGIN_LOADING,
  payload: {
    loading,
  },
});

export const toggleOnboardingDestinationLoading = (loading: boolean) => ({
  type: TOGGLE_ONBOARDING_DESTINATION_LOADING,
  payload: {
    loading,
  },
});

export const setOnboardingOriginQuery = (originQuery: string) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  dispatch(setOnboardingOrigin(null));
  dispatch({
    type: SET_ONBOARDING_ORIGIN_QUERY,
    payload: {
      originQuery,
    },
  });
};

export const setOnboardingDestinationQuery = (destinationQuery: string) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  dispatch(setOnboardingDestination(null));
  dispatch({
    type: SET_ONBOARDING_DESTINATION_QUERY,
    payload: {
      destinationQuery,
    },
  });
};

export const setOnboardingOriginPlaces = () => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    if (getState().onboardingSearch.origin.loading) {
      return;
    }
    dispatch(toggleOnboardingOriginLoading(true));
    const query = getState().onboardingSearch.origin.query;
    const originPlaces = await Backend.getPlaces(query);
    dispatch({
      type: SET_ONBOARDING_ORIGIN_PLACES,
      payload: {
        originPlaces,
      },
    });
    dispatch(toggleOnboardingOriginLoading(false));
  };
};

export const setOnboardingDestinationPlaces = () => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    if (getState().onboardingSearch.destination.loading) {
      return;
    }
    dispatch(toggleOnboardingDestinationLoading(true));
    const query = getState().onboardingSearch.destination.query;
    const destinationPlaces = await Backend.getPlaces(query);
    dispatch({
      type: SET_ONBOARDING_DESTINATION_PLACES,
      payload: {
        destinationPlaces,
      },
    });
    dispatch(toggleOnboardingDestinationLoading(false));
  };
};

export const resetOnboardingOriginPlaces = () => ({
  type: SET_ONBOARDING_ORIGIN_PLACES,
  payload: {
    originPlaces: new Array(0),
  },
});

export const resetOnboardingDestinationPlaces = () => ({
  type: SET_ONBOARDING_DESTINATION_PLACES,
  payload: {
    destinationPlaces: new Array(0),
  },
});

export default onboardingSearchReducer;
