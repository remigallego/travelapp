import axios from 'axios';
import { Place, SessionsOpts } from './types';
import qs from 'qs';

const endpoint =
  'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

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
            'x-rapidapi-key':
              '529a1ab220msh93029b014d4f040p1a8942jsn3c81d0836448',
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

  public static pollSession = async (key: string) => {
    try {
      console.log('Backend: pollSession');
      const response = await fetch(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/${key}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key':
              '529a1ab220msh93029b014d4f040p1a8942jsn3c81d0836448',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return await response.json();
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
          timeout: 3000,
          timeoutErrorMessage: 'timeout!!!',
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key':
              '529a1ab220msh93029b014d4f040p1a8942jsn3c81d0836448',
          },
        },
      );
      return response.data.Places;
    } catch (e) {
      throw e;
    }
  };
}
