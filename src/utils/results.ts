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
  console.log(itineraries);

  const findFastestOutboundLeg = () => {
    const ids = itineraries.map(iti => iti.OutboundLegId);
    const legsByDuration = legs
      .filter(leg => ids.indexOf(leg.Id) !== -1)
      .sort((a: Leg, b: Leg) => {
        return a.Duration - b.Duration;
      });
    return itineraries.find(el => el.OutboundLegId === legsByDuration[0].Id);
  };

  const hasInbound = itineraries.some(el => el.InboundLegId);

  if (!hasInbound) {
    return findFastestOutboundLeg();
  } else {
    console.log(itineraries);
    let result = {
      outboundId: itineraries[0].OutboundLegId,
      inboundId: itineraries[0].InboundLegId,
      duration: Infinity,
    };
    itineraries.forEach(iti => {
      const outboundId = iti.OutboundLegId;
      const inboundId = iti.InboundLegId;
      const durationOutbond = legs.find(leg => leg.Id === outboundId).Duration;
      const durationInbound = legs.find(leg => leg.Id === inboundId).Duration;
      const totalDuration = durationInbound + durationOutbond;

      if (totalDuration < result.duration) {
        result = {
          outboundId: outboundId,
          inboundId: inboundId,
          duration: totalDuration,
        };
      }
    });
    return itineraries.find(
      el =>
        el.OutboundLegId === result.outboundId &&
        el.InboundLegId === result.inboundId,
    );
  }
};
