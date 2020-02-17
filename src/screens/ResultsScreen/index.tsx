import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
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
import { getCurrencySymbol } from '../../utils/results';
import { formatPlaceId } from '../../utils/places';
import { selectResults } from '../../reducers/results';
import { Itinerary } from '../../Backend/types';
import { useDispatch } from 'react-redux';
import { setOutboundToQuery, setInboundToQuery } from '../../reducers/query';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ResultsScreen: (props: Props) => ReactElement = () => {
  const outboundDate = useSelector(state => state.query.outboundDate);
  const inboundDate = useSelector(state => state.query.inboundDate);
  const [selectedDay, selectDay] = useState(moment(outboundDate));

  const generateDays = date => {
    return [
      moment(date).subtract('3', 'day'),
      moment(date).subtract('2', 'day'),
      moment(date).subtract('1', 'day'),
      moment(date),
      moment(date).add('1', 'day'),
      moment(date).add('2', 'day'),
      moment(date).add('3', 'day'),
    ];
  };

  const query = useSelector(state => state.query);

  const loading = useSelector(state => state.session.loading);
  const results = useSelector(selectResults);

  const dispatch = useDispatch();

  const renderLoading = () => {
    return (
      <View style={{ height: '100%' }}>
        <ActivityIndicator
          size={80}
          color={colors.blue}
          style={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 999,
          }}
        />
      </View>
    );
  };

  const renderResults = (itineraries: Itinerary[]) => {
    if (itineraries?.length === 0)
      return <TextMedium style={{ color: 'black' }}>No results...</TextMedium>;

    return itineraries.map((itinerary, index) => {
      const outboundLeg = results.Legs.find(
        val => val.Id === itinerary.OutboundLegId,
      );
      const inboundLeg = results.Legs.find(
        val => val.Id === itinerary.InboundLegId,
      );

      const getBadgeType = () => {
        if (index === 0) {
          return BadgeType.CHEAPEST;
        }
        /*   if (itinerary.OutboundLegId === fastestId) {
          return BadgeType.FASTEST;
        } */
        return BadgeType.NONE;
      };
      return (
        <>
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(itinerary.PricingOptions[0].DeeplinkUrl);
              }}>
              <FlightCard
                price={`${itinerary.PricingOptions[0]?.Price.toString()}${getCurrencySymbol(
                  results,
                )}`}
                badgeType={getBadgeType()}
                outboundLeg={outboundLeg}
                inboundLeg={inboundLeg}
              />
            </TouchableOpacity>
          </View>
        </>
      );
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <ScrollView
          style={{ marginVertical: 20 }}
          stickyHeaderIndices={[1]}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <StatusBar
            backgroundColor={colors.backgroundBlue}
            barStyle={'dark-content'}
          />
          <View style={{ backgroundColor: colors.grey, paddingBottom: 10 }}>
            <Headline style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
              {`${formatPlaceId(query.originPlace)} - ${formatPlaceId(
                query.destinationPlace,
              )}`}
            </Headline>
            <HorizontalCarousel
              days={generateDays(outboundDate)}
              selectedDay={moment(outboundDate)}
              selectDay={day => {
                dispatch(setOutboundToQuery(day.toDate()));
                selectDay(day);
              }}
            />
            <View style={{ flex: 1, marginTop: 10 }}>
              {query.inboundDate && (
                <HorizontalCarousel
                  days={generateDays(inboundDate)}
                  selectedDay={moment(inboundDate)}
                  selectDay={day => {
                    dispatch(setInboundToQuery(day.toDate()));
                    selectDay(day);
                  }}
                />
              )}
            </View>
          </View>

          <>
            <View style={styles.container}>
              {loading && renderLoading()}
              {!loading && renderResults(results.Itineraries.slice(0, 5))}
            </View>
          </>
        </ScrollView>
      </View>
    </SafeAreaView>
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
