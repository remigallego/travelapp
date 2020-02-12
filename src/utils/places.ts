import { Place } from '../Backend/types';

export const formatPlaceId = (place: Place) => {
  return place.PlaceId.replace('-sky', '');
};

export const formatPlaceIdAndName = (place: Place) => {
  const id = formatPlaceId(place);
  return `${id} - ${place.PlaceName}`;
};
