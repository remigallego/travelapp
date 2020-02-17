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
  setOnboardingQuery,
  setOnboardingValue,
  setOnboardingPlaces,
  resetOnboardingPlaces,
  InputType,
} from '../../reducers/onboardingSearch';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store';
import { setDestination, setOrigin } from '../../reducers/query';
import { Place } from '../../Backend/types';
import TextInputWithAutoComplete from '../../components/TextInputWithAutoComplete';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OnboardingScreen: (props: Props) => ReactElement = props => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector(state => state.onboardingSearch);

  const setValuesAndNavigateToNextScreen = (
    originValue: Place,
    destinationValue: Place,
  ) => {
    dispatch(setOrigin(originValue));
    dispatch(setDestination(destinationValue));
    props.navigation.navigate('Calendar');
  };

  const resetPlaces = () => {
    dispatch(resetOnboardingPlaces(origin.type));
    dispatch(resetOnboardingPlaces(destination.type));
  };

  const handleChangeText = (val: string, type: InputType) => {
    dispatch(setOnboardingQuery(val, type));
    dispatch(setOnboardingPlaces(type)); // TODO: Figure out throttle/debounce
  };

  const handlePressItem = (val: Place, type: InputType) => {
    dispatch(setOnboardingValue(val, type));
    if (type === 'destination' && origin.value) {
      setValuesAndNavigateToNextScreen(origin.value, val);
    }
    if (type === 'origin' && destination.value) {
      setValuesAndNavigateToNextScreen(origin.value, val);
    }
  };

  const renderOriginInput = () => {
    return (
      <View style={styles.originContainer}>
        <TextInputWithAutoComplete
          input={origin}
          onFocus={resetPlaces}
          onChangeText={val => handleChangeText(val, origin.type)}
          onPressItem={val => handlePressItem(val, origin.type)}
        />
      </View>
    );
  };

  const renderDestinationInput = () => {
    return (
      <View style={styles.destinationContainer}>
        <TextInputWithAutoComplete
          input={destination}
          onFocus={resetPlaces}
          onChangeText={val => handleChangeText(val, destination.type)}
          onPressItem={val => handlePressItem(val, destination.type)}
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
