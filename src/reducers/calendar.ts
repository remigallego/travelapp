import { Place } from '../Backend/types';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';
import { Action } from 'redux';

export interface CalendarState {
  inboundDate: Date;
  outboundDate: Date;
}

const initialState: CalendarState = {
  inboundDate: null,
  outboundDate: null,
};

const SET_INBOUND_DATE = 'SET_INBOUND_DATE';
const SET_OUTBOUND_DATE = 'SET_OUTBOUND_DATE';

const calendarReducer = (state: CalendarState = initialState, action: any) => {
  switch (action.type) {
    case SET_INBOUND_DATE:
      return {
        ...state,
        inboundDate: action.payload.inboundDate,
      };
    case SET_OUTBOUND_DATE:
      return {
        ...state,
        outboundDate: action.payload.outboundDate,
      };
    default:
      return state;
  }
};

export const setInboundDate = (inboundDate: Date) => (
  dispatch: ThunkDispatch<AppState, any, Action>,
) => {
  dispatch({
    type: SET_INBOUND_DATE,
    payload: {
      inboundDate,
    },
  });
};

export const setOutboundDate = (outboundDate: Date) => ({
  type: SET_OUTBOUND_DATE,
  payload: {
    outboundDate,
  },
});

export default calendarReducer;
