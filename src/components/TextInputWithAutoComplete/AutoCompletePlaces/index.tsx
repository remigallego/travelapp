import React, { ReactElement } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import TextLight from '../../TextLight';
import colors from '../../../colors';
import { Place } from '../../../Backend/types';
import {
  formatPlaceIdAndName,
  isCity,
  isCountry,
  isAirport,
  formatPlaceId,
} from '../../../utils/places';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCity, faPlane, faFlag } from '@fortawesome/free-solid-svg-icons';
import TextBold from '../../TextBold';

interface Props {
  query: string;
  values: Place[];
  loading: boolean;
  onPressItem: (val: Place) => void;
}

const AutoCompletePlaces: (props: Props) => ReactElement = props => {
  const { values, onPressItem } = props;

  const cities = values.filter(isCity);
  const countries = values.filter(isCountry);
  const airports = values.filter(isAirport);

  const airportsNotIncludedInACity = airports.filter(
    pl => !cities.some(v => v.CityId === pl.CityId),
  );

  const renderAirportOfThisCity = (city: Place) => {
    const airportsOfThisCity = airports.filter(
      val => val.CityId === city.CityId,
    );
    return (
      <View>
        {renderItem(city)}
        <View style={{ marginLeft: 20 }}>
          {airportsOfThisCity.map(renderItem)}
        </View>
      </View>
    );
  };

  const renderLoading = () => {
    return (
      <View key={'loading'} style={[styles.itemContainer]}>
        <TextLight style={[styles.loadingText]}>Loading...</TextLight>
      </View>
    );
  };

  const renderIcon = (val: Place) => {
    if (isCity(val)) {
      return faCity;
    }
    if (isCountry(val)) {
      return faFlag;
    }
    return faPlane;
  };

  const renderWithBoldQuery = (val: string) => {
    const letters = [...val];
    const lettersFromQuery = [...props.query];

    const thisLetterAndPreviousOnesMatch: (
      letter: string,
      index: number,
      array: string[],
    ) => boolean = (letter, index, array) => {
      let test = true;
      for (let i = 0; i <= index; i++) {
        if (
          lettersFromQuery[index]?.toLowerCase() === array[index].toLowerCase()
        ) {
          test = false;
        }
      }
      return test;
    };

    return letters.map((letter, index, array) => {
      if (thisLetterAndPreviousOnesMatch(letter, index, array)) {
        return <TextLight style={styles.itemText}>{letter}</TextLight>;
      } else {
        return <TextBold style={styles.itemText}>{letter}</TextBold>;
      }
    });
  };

  const renderItem = (val: Place) => {
    const placeId = formatPlaceId(val);
    const placeName = val.PlaceName;

    return (
      <TouchableOpacity
        key={val.PlaceId}
        disabled={isCountry(val) || isCity(val)}
        style={styles.itemContainer}
        onPress={() => onPressItem(val)}>
        <FontAwesomeIcon icon={renderIcon(val)} size={16} style={styles.icon} />
        <TextLight style={[styles.itemText]}>
          {renderWithBoldQuery(placeName)}
        </TextLight>
        <TextLight style={[styles.itemText]}>
          {renderWithBoldQuery(placeId)}
        </TextLight>
      </TouchableOpacity>
    );
  };

  const renderAirport = (val: Place) => {
    const placeId = formatPlaceId(val);
    const placeName = val.PlaceName;
    return (
      <TouchableOpacity
        key={val.PlaceId}
        disabled={isCountry(val) || isCity(val)}
        style={styles.itemContainer}
        onPress={() => onPressItem(val)}>
        <FontAwesomeIcon icon={renderIcon(val)} size={16} style={styles.icon} />
        <TextLight style={[styles.itemText]}>
          {renderWithBoldQuery(placeName)}
        </TextLight>
        <TextLight style={[styles.itemText]}>
          {renderWithBoldQuery(placeId)}
        </TextLight>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={true}
      style={[
        styles.container,
        {
          height: values.length > 4 ? 4 * 50 + 10 : values.length * 50 + 10,
        },
      ]}>
      {!props.loading && (
        <>
          {cities.map(renderAirportOfThisCity)}
          {airportsNotIncludedInACity.map(renderAirport)}
        </>
      )}
    </ScrollView>
  );
};

export default AutoCompletePlaces;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginTop: -10,
    width: '100%',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemContainer: {
    zIndex: 888888,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
  },
  loadingText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 10,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 10,
    lineHeight: 1,
  },
  icon: {
    marginLeft: 10,
  },
});
