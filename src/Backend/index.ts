import axios from 'axios';
import { Place, SessionsOpts } from './types';
import qs from 'qs';
import { ResultsState } from '../reducers/results';

const endpoint =
  'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

const apiKey = '9248d86259msh7de2a3efe07c81ap1131ccjsn24c1e12191e5';

export default class Backend {
  constructor() {}

  public static createSession = async (opts: SessionsOpts) => {
    try {
      console.log('Backend: createSession');
      console.log(opts);
      const response = await fetch(
        'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0',
        {
          method: 'POST',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: qs.stringify(opts, { skipNulls: true }),
        },
      );
      const location = response.headers.get('location');
      const key = location.split('/').pop();
      return key;
    } catch (e) {}
  };

  public static pollSession: (
    key: string,
    retryNumber?: number,
  ) => Promise<ResultsState> = async (key, retryNumber = 0) => {
    try {
      console.log('Backend: pollSession ', retryNumber);
      const response = await fetch(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${key}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const results: ResultsState = await response.json();

      console.log(results);
      if (results.Status === 'UpdatesComplete') {
        return results;
      }

      if (retryNumber === 0) {
        return await Backend.pollSession(key, retryNumber + 1);
      }

      if (retryNumber > 0) {
        if (results.Itineraries.length === 0) {
          return await Backend.pollSession(key, retryNumber + 1);
        }
      }

      return results;
    } catch (e) {
      console.log(e);
    }
  };

  public static getPlaces = async (query: string): Promise<Place[]> => {
    if (query.length === 0) {
      return [];
    }
    try {
      console.log('querying places for: ', query);
      const response = await axios.get(
        `${endpoint}/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${query}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
          },
        },
      );
      console.log(response);
      return response.data.Places;
    } catch (e) {
      throw e;
    }
  };
}
