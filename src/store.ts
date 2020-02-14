import logger from 'redux-logger';
import onboardingSearchReducer, {
  OnboardingSearchState,
} from './reducers/onboardingSearch';
import calendarReducer, { CalendarState } from './reducers/calendar';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import localisationReducer, {
  LocalisationState,
} from './reducers/localisation';
import queryReducer, { QueryState } from './reducers/query';
import sessionReducer, { SessionState } from './reducers/session';
import resultsReducer, { ResultsState } from './reducers/results';

export interface AppState {
  onboardingSearch: OnboardingSearchState;
  calendar: CalendarState;
  query: QueryState;
  localisation: LocalisationState;
  session: SessionState;
  results: ResultsState;
}

const rootReducer = combineReducers({
  onboardingSearch: onboardingSearchReducer,
  calendar: calendarReducer,
  query: queryReducer,
  localisation: localisationReducer,
  session: sessionReducer,
  results: resultsReducer,
});

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(thunk, logger)),
);

export default store;

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
