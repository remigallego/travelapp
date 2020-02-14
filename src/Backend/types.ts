export interface SessionsOpts {
  country: string;
  currency: string;
  locale: string; // ISO Locale
  originPlace: string;
  destinationPlace: string;
  outboundDate: string;
  adults: number;
  inboundDate?: string;
  cabinClass?: string;
  children?: number;
  infants?: number;
  includeCarriers?: string;
  excludeCarriers?: string;
  groupPricing?: string;
}

export interface SessionResults {
  SessionKey: string;
  Query: SessionsOpts;
  Status: string;
  Itineraries: Itinerary[];
  Legs: Leg[];
  Segments: Segment[];
  Carriers: Carrier[];
  Agents: Agent[];
  Places: SessionResultPlace[];
  Currencies: Currency[];
}

export interface Place {
  PlaceId: string;
  PlaceName: string;
  CountryId: string;
  RegionId: string;
  CityId: string;
  CountryName: string;
}

export interface Itinerary {
  OutboundLegId: string;
  PricingOptions: PricingOptions[];
  BookingDetailsLink: {
    Uri: string;
    Body: string;
    Method: string;
  };
}

export interface Leg {
  Id: string;
  SegmentIds: number[];
  OriginStation: number;
  DestinationStation: number;
  Departure: string;
  Arrival: string;
  Duration: number;
  JourneyMode: string;
  Stops: number[];
  Carriers: number[];
  OperatingCarriers: number[];
  Directionality: string;
  FlightNumbers: {
    FlightNumber: string;
    CarrierId: number;
  }[];
}

export interface Segment {
  Id: number;
  OriginStation: number;
  DestinationStation: number;
  DepartureDateTime: string;
  ArrivalDateTime: string;
  Carrier: number;
  OperatingCarrier: number;
  Duration: number;
  FlightNumber: string;
  JourneyMode: string;
  Directionality: string;
}

export interface Carrier {
  Id: number;
  Code: string;
  Name: string;
  ImageUrl: string;
  DisplayCode: string;
}

export interface Agent {
  Id: number;
  Name: string;
  ImageUrl: string;
  Status: string;
  OptimisedForMobile: boolean;
  Type: string;
}

export interface SessionResultPlace {
  Id: number;
  ParentId: number;
  Code: string;
  Type: string;
  Name: string;
}

export interface Currency {
  Code: string;
  Symbol: string;
  ThousandsSeparator: string;
  DecimalSeparator: string;
  SymbolOnLeft: boolean;
  SpaceBetweenAmountAndSymbol: boolean;
  RoundingCoefficient: number;
  DecimalDigits: number;
}

export interface PricingOptions {
  Agents: number[];
  QuoteAgeInMinutes: number;
  Price: number;
  DeeplinkUrl: string;
}
