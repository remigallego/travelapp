import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';
import colors from '../../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import Headline from '../../components/Headline';
import HorizontalCarousel from '../../components/HorizontalCarousel';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import FlightCard, { BadgeType } from './FlightCard';
import { useSelector } from '../../store';
import TextMedium from '../../components/TextMedium';
import { findCheapestItinerary, getCurrencySymbol } from '../../utils/results';
import { formatPlaceId } from '../../utils/places';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ResultsScreen: (props: Props) => ReactElement = () => {
  const [selectedDay, selectDay] = useState(moment());

  const generateDays = () => {
    return [
      moment(),
      moment().add('1', 'day'),
      moment().add('2', 'day'),
      moment().add('3', 'day'),
      moment().add('4', 'day'),
      moment().add('5', 'day'),
    ];
  };

  const query = useSelector(state => state.query);

  const loading = useSelector(state => state.session.loading);
  const results = useSelector(state => state.results);

  const renderLoading = () => {
    return <TextMedium style={{ color: 'black' }}>Loading...</TextMedium>;
  };

  const renderResults = () => {
    if (results.Itineraries?.length === 0)
      return <TextMedium style={{ color: 'black' }}>No results...</TextMedium>;
    const cheapest = findCheapestItinerary(results.Itineraries);
    const leg = results.Legs.find(val => val.Id === cheapest.OutboundLegId);
    console.log('corresponding leg: ');
    console.log(leg);
    return (
      <>
        <Headline>
          {`${formatPlaceId(query.originPlace)} - ${formatPlaceId(
            query.destinationPlace,
          )}`}
        </Headline>
        <HorizontalCarousel
          style={{ height: 120 }}
          days={generateDays()}
          selectedDay={selectedDay}
          selectDay={day => {
            selectDay(day);
          }}
        />
        <View style={{ marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(cheapest.PricingOptions[0].DeeplinkUrl);
            }}>
            <FlightCard
              price={`${cheapest.PricingOptions[0]?.Price.toString()}${getCurrencySymbol(
                results,
              )}`}
              badgeType={BadgeType.CHEAPEST}
              flightInfo={leg}
            />
          </TouchableOpacity>
        </View>
        {/*  <View style={{ marginTop: 40 }}>
          <FlightCard price={'45'} badgeType={BadgeType.FASTEST} />
        </View> */}
        {/* <View style={{ marginTop: 40 }}>
          <FlightCard
            price={'45'}
            badgeTitle={'Popular'}
            badgeColor={'rgba(196, 251, 177, 0.8)'}
            badgeTextColor={'#89D66F'}
          />
        </View> */}
      </>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView style={styles.screen}>
        <StatusBar
          backgroundColor={colors.backgroundBlue}
          barStyle={'dark-content'}
        />

        <View style={styles.container}>
          {loading ? renderLoading() : renderResults()}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
  },
  bigText: {
    fontSize: 30,
  },
  smallText: { fontSize: 18 },
  blackText: { color: colors.black },
  container: {
    flex: 1,
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  smallMarginTop: {
    marginTop: 0,
  },
  iconPlaceholder: {
    height: 20,
    width: 20,
    backgroundColor: 'black',
  },
  title: { color: colors.darkerGrey, fontSize: 16, paddingTop: 5 },
  subTitle: { color: colors.black, fontSize: 16, paddingTop: 5 },
});
