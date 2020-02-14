export interface SessionState {
  key: string;
  loading: boolean;
}

const initialState: SessionState = {
  key: '',
  loading: false,
};

const SET_KEY = 'SET_KEY';
const TOGGLE_SESSION_LOADING = 'TOGGLE_SESSION_LOADING';

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

export const toggleSessionLoading = (loading: boolean) => ({
  type: TOGGLE_SESSION_LOADING,
  payload: {
    loading,
  },
});

export default sessionReducer;
