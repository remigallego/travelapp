export interface SessionState {
  key: string;
  loading: boolean;
  loadingInsideScreen: boolean;
  isFetchingUpdates: boolean;
}

const initialState: SessionState = {
  key: '',
  loading: false,
  loadingInsideScreen: false,
  isFetchingUpdates: false,
};

const SET_KEY = 'SET_KEY';
const TOGGLE_IS_FETCHING_UPDATES = 'TOGGLE_IS_FETCHING_UPDATES';
const TOGGLE_SESSION_LOADING = 'TOGGLE_SESSION_LOADING';
const TOGGLE_SESSION_LOADING_INSIDE_SCREEN =
  'TOGGLE_SESSION_LOADING_INSIDE_SCREEN';

const sessionReducer = (state: SessionState = initialState, action: any) => {
  switch (action.type) {
    case SET_KEY:
      return {
        ...state,
        key: action.payload.key,
      };
    case TOGGLE_SESSION_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case TOGGLE_IS_FETCHING_UPDATES:
      return {
        ...state,
        isFetchingUpdates: action.payload.isFetchingUpdates,
      };
    case TOGGLE_SESSION_LOADING_INSIDE_SCREEN:
      return {
        ...state,
        loadingInsideScreen: action.payload.loadingInsideScreen,
      };
    default:
      return state;
  }
};

export const setKey = (key: string) => ({
  type: SET_KEY,
  payload: {
    key,
  },
});

export const toggleIsFetchingUpdates = (isFetchingUpdates: boolean) => ({
  type: TOGGLE_IS_FETCHING_UPDATES,
  payload: {
    isFetchingUpdates,
  },
});

export const toggleSessionLoading = (loading: boolean) => ({
  type: TOGGLE_SESSION_LOADING,
  payload: {
    loading,
  },
});

export const toggleSessionLoadingInsideScreen = (
  loadingInsideScreen: boolean,
) => ({
  type: TOGGLE_SESSION_LOADING_INSIDE_SCREEN,
  payload: {
    loadingInsideScreen,
  },
});

export default sessionReducer;
