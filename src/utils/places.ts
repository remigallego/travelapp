import { Place } from '../Backend/types';

export const formatPlaceId = (place: Place) => {
  return place.PlaceId.replace('-sky', '');
};

export const formatPlaceIdAndName = (place: Place) => {
  const id = formatPlaceId(place);
  return `${id} - ${place.PlaceName}`;
};

export const isCity = (place: Place) => {
  return place.PlaceId === place.CityId;
};

export const isCountry = (place: Place) => {
  return place.PlaceId === place.CountryId;
};

export const isAirport = (place: Place) => {
  return !isCity(place) && !isCountry(place);
};
