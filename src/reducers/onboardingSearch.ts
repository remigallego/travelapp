import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import Backend from '../Backend';
import { Place } from '../Backend/types';

const DEBUG_VALUES = {
  origin: {
    PlaceId: 'TXL-sky',
    PlaceName: 'Berlin Tegel',
    CountryId: 'DE-sky',
    RegionId: '',
    CityId: 'BERL-sky',
    CountryName: 'Germany',
  },
  destination: {
    PlaceId: 'CDG-sky',
    PlaceName: 'Paris Charles de Gaulle',
    CountryId: 'FR-sky',
    RegionId: '',
    CityId: 'PARI-sky',
    CountryName: 'France',
  },
};

export type InputType = 'origin' | 'destination';

export interface InputState<T> {
  type: T;
  value: Place;
  query: string;
  places: Place[];
  loading: boolean;
}

export interface OnboardingSearchState {
  origin: InputState<'origin'>;
  destination: InputState<'destination'>;
}

const initialState: OnboardingSearchState = {
  origin: {
    type: 'origin',
    value: null,
    query: '',
    places: [],
    loading: false,
  },
  destination: {
    type: 'destination',
    value: null,
    query: '',
    places: [],
    loading: false,
  },
};

const intialStateDEBUG: OnboardingSearchState = {
  origin: {
    type: 'origin',
    value: DEBUG_VALUES.origin,
    query: '',
    places: [],
    loading: false,
  },
  destination: {
    type: 'destination',
    value: DEBUG_VALUES.destination,
    query: '',
    places: [],
    loading: false,
  },
};

const SET_ONBOARDING_QUERY = 'SET_ONBOARDING_QUERY';
const TOGGLE_ONBOARDING_LOADING = 'TOGGLE_ONBOARDING_LOADING';
const SET_ONBOARDING_VALUE = 'SET_ONBOARDING_VALUE';
const SET_ONBOARDING_PLACES = 'SET_ONBOARDING_PLACES';

const onboardingSearchReducer = (
  state: OnboardingSearchState = intialStateDEBUG,
  action: any,
) => {
  switch (action.type) {
    case SET_ONBOARDING_QUERY: {
      const previousState = state[action.payload.type as InputType];
      return {
        ...state,
        [action.payload.type]: {
          ...previousState,
          query: action.payload.query,
        },
      };
    }
    case TOGGLE_ONBOARDING_LOADING: {
      const previousState = state[action.payload.type as InputType];
      return {
        ...state,
        [action.payload.type]: {
          ...previousState,
          loading: action.payload.loading,
        },
      };
    }
    case SET_ONBOARDING_VALUE: {
      const previousState = state[action.payload.type as InputType];
      return {
        ...state,
        [action.payload.type]: {
          ...previousState,
          value: action.payload.value,
        },
      };
    }
    case SET_ONBOARDING_PLACES: {
      const previousState = state[action.payload.type as InputType];
      return {
        ...state,
        [action.payload.type]: {
          ...previousState,
          places: action.payload.places,
        },
      };
    }
    default:
      return state;
  }
};

export const toggleOnboardingLoading = (loading: boolean, type: InputType) => ({
  type: TOGGLE_ONBOARDING_LOADING,
  payload: {
    loading,
    type,
  },
});

export const setOnboardingQuery = (query: string, type: InputType) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
  getState: () => AppState,
) => {
  if (getState().onboardingSearch[type].value)
    dispatch(setOnboardingValue(null, type));
  dispatch({
    type: SET_ONBOARDING_QUERY,
    payload: {
      query,
      type,
    },
  });
};

export const setOnboardingValue = (value: Place, type: InputType) => {
  return (dispatch: ThunkDispatch<AppState, any, Action>) => {
    dispatch(resetOnboardingPlaces(type));
    return dispatch({
      type: SET_ONBOARDING_VALUE,
      payload: {
        value,
        type,
      },
    });
  };
};

export const setOnboardingPlaces = (type: InputType) => {
  return async (
    dispatch: ThunkDispatch<AppState, any, Action>,
    getState: () => AppState,
  ) => {
    dispatch(toggleOnboardingLoading(true, type));

    const query = getState().onboardingSearch[type].query;
    const places = await Backend.getPlaces(query);

    dispatch({
      type: SET_ONBOARDING_PLACES,
      payload: {
        places,
        type,
      },
    });

    dispatch(toggleOnboardingLoading(false, type));
  };
};

export const resetOnboardingPlaces = (type: InputType) => ({
  type: SET_ONBOARDING_PLACES,
  payload: {
    places: new Array(0),
    type,
  },
});

export default onboardingSearchReducer;
