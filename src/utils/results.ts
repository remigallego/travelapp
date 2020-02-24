import {
  Itinerary,
  PricingOptions,
  SessionResults,
  Leg,
} from '../Backend/types';

export const sortItinerariesByPrice = (itineraries: Itinerary[]) => {
  return itineraries.sort((a: Itinerary, b: Itinerary) => {
    return a.PricingOptions[0].Price - b.PricingOptions[0].Price;
  });
};

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

  return itineraries[0];
};

export const getCurrencySymbol = (results: SessionResults) => {
  return results.Currencies[0].Symbol;
};

export const findFastestItineraries = (
  itineraries: Itinerary[],
  legs: Leg[],
) => {
  const ids = itineraries.map(iti => iti.OutboundLegId);
  const legsByDuration = legs
    .filter(leg => ids.indexOf(leg.Id) !== -1)
    .sort((a: Leg, b: Leg) => {
      return a.Duration - b.Duration;
    });

  return legsByDuration[0].Id;
};
