import React, { ReactElement } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../colors';
import TextLight from '../../components/TextLight';
import TextBold from '../../components/TextBold';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {
  setOnboardingOriginQuery,
  setOnboardingDestinationQuery,
  setOnboardingDestinationPlaces,
  setOnboardingOriginPlaces,
  setOnboardingDestination,
  setOnboardingOrigin,
  resetOnboardingDestinationPlaces,
  resetOnboardingOriginPlaces,
} from '../../reducers/onboardingSearch';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store';
import { formatPlaceIdAndName } from '../../utils/places';
import { setDestination, setOrigin } from '../../reducers/query';
import { Place } from '../../Backend/types';
import TextInputWithAutoComplete from '../../components/TextInputWithAutoComplete';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OnboardingScreen: (props: Props) => ReactElement = props => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector(state => state.onboardingSearch);
  const validateAndNavigateToNextScreen = (
    originValue: Place,
    destinationValue: Place,
  ) => {
    dispatch(setOrigin(originValue));
    dispatch(setDestination(destinationValue));
    props.navigation.navigate('Calendar');
  };

  const resetPlaces = () => {
    dispatch(resetOnboardingOriginPlaces());
    dispatch(resetOnboardingDestinationPlaces());
  };

  const renderOriginInput = () => {
    return (
      <View style={styles.originContainer}>
        <TextInputWithAutoComplete
          placeholder={'Origin'}
          query={origin.query}
          values={origin.places}
          loading={origin.loading}
          onFocus={resetPlaces}
          inputValue={
            origin.value ? formatPlaceIdAndName(origin.value) : origin.query
          }
          onChangeText={val => {
            dispatch(setOnboardingOriginQuery(val));
            dispatch(setOnboardingOriginPlaces()); // TODO: Figure out throttle/debounce
          }}
          onPressItem={val => {
            dispatch(setOnboardingOrigin(val));
            if (destination.value) {
              validateAndNavigateToNextScreen(val, destination.value);
            }
          }}
        />
      </View>
    );
  };

  const renderDestinationInput = () => {
    return (
      <View style={styles.destinationContainer}>
        <TextInputWithAutoComplete
          placeholder={'Destination'}
          query={destination.query}
          values={destination.places}
          loading={destination.loading}
          onFocus={resetPlaces}
          inputValue={
            destination.value
              ? formatPlaceIdAndName(destination.value)
              : destination.query
          }
          onChangeText={val => {
            dispatch(setOnboardingDestinationQuery(val));
            dispatch(setOnboardingDestinationPlaces()); // TODO: Figure out throttle/debounce
          }}
          onPressItem={val => {
            dispatch(setOnboardingDestination(val));
            if (origin.value) {
              validateAndNavigateToNextScreen(origin.value, val);
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
      <TouchableWithoutFeedback
        onPress={_e => {
          resetPlaces();
        }}>
        <View style={styles.absoluteContainer} />
      </TouchableWithoutFeedback>
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
  originContainer: { position: 'absolute', width: '100%', zIndex: 2 },
  destinationContainer: {
    position: 'absolute',
    width: '100%',
    top: 60,
    zIndex: 1,
  },
  absoluteContainer: {
    zIndex: 0,
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
});
