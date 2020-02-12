import React, { ReactElement } from 'react';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
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
import {
  setOriginQuery,
  setDestinationQuery,
  setDestinationPlaces,
  setOriginPlaces,
  setDestination,
  setOrigin,
} from '../../reducers/search';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store';
import { formatPlaceIdAndName } from '../../utils/places';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OnboardingScreen: (props: Props) => ReactElement = props => {
  const dispatch = useDispatch();
  const {
    origin,
    destination,
    originQuery,
    destinationQuery,
    originPlaces,
    destinationPlaces,
    originLoading,
    destinationLoading,
  } = useSelector(state => state.search);

  const renderOriginInput = () => {
    return (
      <View style={styles.originContainer}>
        <SearchInput
          style={styles.searchInputStyle}
          placeholder={'Origin'}
          value={origin ? formatPlaceIdAndName(origin) : originQuery}
          onChangeText={val => {
            dispatch(setOriginQuery(val));
            dispatch(setOriginPlaces()); // TODO: Figure out throttle/debounce
          }}
        />
        <AutoComplete
          values={originPlaces.slice(0, 5).map(formatPlaceIdAndName)}
          loading={originLoading}
          onPressItem={val => {
            const origin = originPlaces.find(
              pl => formatPlaceIdAndName(pl) === val,
            );
            if (origin) {
              dispatch(setOrigin(origin));
              if (destination) {
                props.navigation.navigate('Calendar');
              }
            }
          }}
        />
      </View>
    );
  };

  const renderDestinationInput = () => {
    return (
      <View style={styles.destinationContainer}>
        <SearchInput
          style={styles.searchInputStyle}
          placeholder={'Destination'}
          value={
            destination ? formatPlaceIdAndName(destination) : destinationQuery
          }
          onChangeText={val => {
            dispatch(setDestinationQuery(val));
            dispatch(setDestinationPlaces()); // TODO: Figure out throttle/debounce
          }}
        />
        <AutoComplete
          values={destinationPlaces.slice(0, 5).map(formatPlaceIdAndName)}
          loading={destinationLoading}
          onPressItem={val => {
            const destination = destinationPlaces.find(
              pl => formatPlaceIdAndName(pl) === val,
            );
            if (destination) {
              dispatch(setDestination(destination));
              if (origin) {
                props.navigation.navigate('Calendar');
              }
            }
          }}
        />
      </View>
    );
  };

  const renderHeadline = () => {
    return (
      <>
        <TextLight>
          <TextLight>Where are you </TextLight>
        </TextLight>
        <TextLight>
          <TextBold>flying </TextBold>
          <TextLight>to?</TextLight>
        </TextLight>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor={colors.pink} barStyle={'light-content'} />
      <View style={styles.container}>
        {renderHeadline()}
        <View>
          {renderOriginInput()}
          {renderDestinationInput()}
        </View>
      </View>

      <Image source={require('./background.jpeg')} style={styles.imageStyle} />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

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
  originContainer: { position: 'absolute', width: '100%', zIndex: 1 },
  destinationContainer: {
    position: 'absolute',
    width: '100%',
    top: 60,
    zIndex: 0,
  },
});
