import axios from 'axios';
import { Place } from './types';

const endpoint =
  'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

export default class Backend {
  constructor() {}

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
      console.log('success');
      return response.data.Places;
    } catch (e) {
      throw e;
    }
  };

  public static getQuotes = async (args): Promise<any> => {
    try {
      const response = await axios.get(
        `${endpoint}/apiservices/browsequotes/v1.0/US/EUR/fr-FR/${args.originPlace}/${args.destinationPlace}/${args.outboundDate}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host':
              'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
            'x-rapidapi-key':
              '529a1ab220msh93029b014d4f040p1a8942jsn3c81d0836448',
          },
        },
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
}
