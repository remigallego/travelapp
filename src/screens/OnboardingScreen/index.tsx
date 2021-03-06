import React, { ReactElement, useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
  Animated,
  Keyboard,
  TouchableOpacity,
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
import { setDestinationToQuery, setOriginToQuery } from '../../reducers/query';
import { Place } from '../../Backend/types';
import TextInputWithAutoComplete from '../../components/TextInputWithAutoComplete';
import ButtonComponent from '../../components/ButtonComponent';
import _ from 'lodash';
import SettingsModal from './SettingsModal';
import {
  faPlaneDeparture,
  faPlaneArrival,
} from '@fortawesome/free-solid-svg-icons';
import { setInboundDate, setOutboundDate } from '../../reducers/calendar';
import SplashScreen from 'react-native-splash-screen';
import TextSemiBold from '../../components/TextSemiBold';

const DEBOUNCE_DELAY = 500;

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const OnboardingScreen: (props: Props) => ReactElement = props => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector(state => state.onboardingSearch);
  const [fadeAnim, _s] = useState(new Animated.Value(0));
  const [shouldStartFadeAnim, setStartFadeAnim] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const debouncedOriginQuery = useCallback(
    _.debounce(() => dispatch(setOnboardingPlaces('origin')), DEBOUNCE_DELAY),
    [],
  );

  const debouncedDestinationQuery = useCallback(
    _.debounce(
      () => dispatch(setOnboardingPlaces('destination')),
      DEBOUNCE_DELAY,
    ),
    [],
  );

  const interpolatedOpacity = fadeAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });

  const setValuesAndNavigateToNextScreen = (
    originValue: Place,
    destinationValue: Place,
  ) => {
    setStartFadeAnim(true);
    dispatch(setOriginToQuery(originValue));
    dispatch(setDestinationToQuery(destinationValue));
    dispatch(setInboundDate(null));
    dispatch(setOutboundDate(null));
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 300,
    }).start(() => {
      props.navigation.navigate('Calendar');
      setTimeout(() => {
        setStartFadeAnim(false);
        fadeAnim.setValue(0);
      }, 300);
    });
  };

  const resetPlaces = () => {
    dispatch(resetOnboardingPlaces(origin.type));
    dispatch(resetOnboardingPlaces(destination.type));
  };

  const handleChangeText = (val: string, type: InputType) => {
    dispatch(setOnboardingQuery(val, type));
    if (type === 'origin') debouncedOriginQuery();
    if (type === 'destination') debouncedDestinationQuery();
  };

  const handlePressItem = (val: Place, type: InputType) => {
    dispatch(setOnboardingValue(val, type));
  };

  const renderOriginInput = () => {
    return (
      <View style={styles.originContainer}>
        <TextInputWithAutoComplete
          iconSuccess={faPlaneDeparture}
          input={origin}
          onFocus={() => {
            resetPlaces();
            if (origin.query) {
              handleChangeText(origin.query, origin.type);
            }
          }}
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
          iconSuccess={faPlaneArrival}
          input={destination}
          onFocus={() => {
            resetPlaces();
            if (destination.query) {
              handleChangeText(destination.query, destination.type);
            }
          }}
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
      <Animated.View style={[styles.container, {}]}>
        {renderHeadline()}
        <View style={styles.smallMarginTop}>
          {renderOriginInput()}
          {renderDestinationInput()}
          <ButtonComponent
            color={colors.blue}
            onPress={() => {
              setValuesAndNavigateToNextScreen(origin.value, destination.value);
            }}
            disabled={!origin.value || !destination.value}
            style={styles.searchButton}>
            Search
          </ButtonComponent>
        </View>
      </Animated.View>

      <Image source={require('./background.jpeg')} style={styles.imageStyle} />
      {shouldStartFadeAnim && (
        <>
          <Animated.Image
            source={require('./background.jpeg')}
            style={[
              styles.imageStyle,
              {
                zIndex: 7,
                opacity: interpolatedOpacity,
              },
            ]}
          />
        </>
      )}

      <TouchableWithoutFeedback
        // @ts-ignore
        touchSoundDisabled={false}
        onPress={_e => {
          resetPlaces();
          Keyboard.dismiss();
        }}>
        <View style={styles.absoluteContainer} />
      </TouchableWithoutFeedback>

      <SettingsModal />
      <View
        style={{
          position: 'absolute',
          bottom: 35,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            props.navigation.navigate('About');
          }}>
          <TextSemiBold style={{ fontSize: 16, color: colors.blue }}>
            About this app
          </TextSemiBold>
        </TouchableOpacity>
      </View>
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
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  searchButton: {
    position: 'absolute',
    width: '100%',
    top: 140,
    zIndex: 1,
  },
  smallMarginTop: {
    marginTop: 10,
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
    zIndex: 2,
  },
  originContainer: { position: 'absolute', width: '100%', zIndex: 3 },
  destinationContainer: {
    position: 'absolute',
    width: '100%',
    top: 60,
    zIndex: 2,
  },
  absoluteContainer: {
    zIndex: 0,
    height: '50%',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
});
