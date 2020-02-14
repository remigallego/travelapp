import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';
import { SessionResults } from '../Backend/types';

export interface ResultsState extends SessionResults {}

const initialState: ResultsState = {};

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
