import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Image, StatusBar, Text } from 'react-native';
import colors from '../../colors';
import TextLight from '../../components/TextLight';
import TextBold from '../../components/TextBold';
import SearchInput from '../../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import AutoComplete from '../../components/AutoComplete';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import _ from 'lodash';
import useSearchStore from '../../stores/search';
import TextMedium from '../../components/TextMedium';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Onboarding: (props: Props) => ReactElement = props => {
  const [query, loading, setQuery, setPlaces] = useSearchStore(state => [
    state.query,
    state.loading,
    state.setQuery,
    state.setPlaces,
  ]);

  const setPlacesDebounced = _.debounce(
    () => {
      setPlaces();
    },
    1000,
    { trailing: true, leading: true },
  );

  const places = useSearchStore(state => state.places, console.log);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={colors.pink} barStyle={'light-content'} />
      <View style={styles.container}>
        <TextLight>
          <TextLight>Where are you </TextLight>
        </TextLight>
        <TextLight>
          <TextBold>flying </TextBold>
          <TextLight>to?</TextLight>
        </TextLight>

        {loading && <TextMedium>Loading</TextMedium>}

        <View>
          <SearchInput
            style={styles.searchInputStyle}
            placeholder={'Search a flight'}
            value={query}
            onChangeText={val => {
              setQuery(val);
              setPlacesDebounced();
            }}
          />
          <AutoComplete
            values={places.map(pl => `${pl.PlaceName} ${pl.PlaceId}`)}
            onPressItem={() => props.navigation.navigate('Calendar')}
          />
        </View>
      </View>

      <Image source={require('./background.jpeg')} style={styles.imageStyle} />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.pink,
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  bold: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  imageStyle: {
    position: 'absolute',
    bottom: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  searchInputStyle: { marginTop: 15 },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
