import axios from 'axios';
import { Place, SessionsOpts } from './types';
import qs from 'qs';

const endpoint =
  'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

const apiKey = '9248d86259msh7de2a3efe07c81ap1131ccjsn24c1e12191e5';

export default class Backend {
  constructor() {}

  public static createSession = async (opts: SessionsOpts) => {
    try {
      console.log('Backend: createSession');
      console.log(opts);
      const response = await axios.post(
        'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0',
        {
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
    } catch (e) {
      console.log(e);
    }
  };

  public static pollSession = async (key: string, recursive: boolean) => {
    try {
      console.log('Backend: pollSession');
      const response = await axios.get(
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
      const results = await response.json();
      console.log(results);
      if (recursive) {
        if (results.Status === 'UpdatesPending') {
          return await Backend.pollSession(key, true);
        } else {
          return results;
        }
      } else return results;
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
