import { Itinerary, PricingOptions, SessionResults } from '../Backend/types';

export const findCheapestItinerary = (itineraries: Itinerary[]) => {
  const findCheapestInPricingOptions = (pricingOptions: PricingOptions[]) => {
    const sorted = pricingOptions.sort((a, b) => {
      return a.Price - b.Price;
    });
    return sorted[0];
  };

  itineraries.sort((a: Itinerary, b: Itinerary) => {
    return (
      findCheapestInPricingOptions(a.PricingOptions).Price -
      findCheapestInPricingOptions(b.PricingOptions).Price
    );
  });

  console.log('the cheapest itinerary is: ', itineraries[0]);
  return itineraries[0];
};

export const getCurrencySymbol = (results: SessionResults) => {
  return results.Currencies[0].Symbol;
};
