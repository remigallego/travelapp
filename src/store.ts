import logger from 'redux-logger';
import searchReducer, { SearchState } from './reducers/search';
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

export interface AppState {
  search: SearchState;
  calendar: CalendarState;
  localisation: LocalisationState;
}

const rootReducer = combineReducers({
  search: searchReducer,
  calendar: calendarReducer,
  localisation: localisationReducer,
});

const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(thunk, logger)),
);

export default store;

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
