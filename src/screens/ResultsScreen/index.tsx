import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Linking,
  TouchableOpacity,
  Animated,
} from 'react-native';
import colors from '../../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  FlatList,
} from 'react-navigation';
import Headline from '../../components/Headline';
import HorizontalCarousel from '../../components/HorizontalCarousel';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import FlightCard, { BadgeType } from './FlightCard';
import { useSelector } from '../../store';
import TextMedium from '../../components/TextMedium';
import { getCurrencySymbol, findFastestItineraries } from '../../utils/results';
import { formatPlaceId } from '../../utils/places';
import { selectResults } from '../../reducers/results';
import { Itinerary } from '../../Backend/types';
import { useDispatch } from 'react-redux';
import {
  setOutboundToQuery,
  setInboundToQuery,
  recreateSession,
} from '../../reducers/query';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TextBold from '../../components/TextBold';
import Loading from './Loading';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ResultsScreen: (props: Props) => ReactElement = props => {
  const outboundDate = useSelector(state => state.query.outboundDate);
  const inboundDate = useSelector(state => state.query.inboundDate);
  const [, selectDay] = useState(moment(outboundDate));
  const [carouselIsScrolled, setCarouselIsScrolled] = useState(false);
  const [ref, setRef] = useState();
  const [scrollY] = useState(new Animated.Value(0));
  const query = useSelector(state => state.query);
  const loading = useSelector(state => state.session.loading);
  const loadingInsideScreen = useSelector(
    state => state.session.loadingInsideScreen,
  );
  const isFetchingUpdates = useSelector(
    state => state.session.isFetchingUpdates,
  );
  const results = useSelector(selectResults);
  const dispatch = useDispatch();

  // useInterval(() => dispatch(updateSession()), 10000);

  const generateDays = (date: Date) => {
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

  const renderResults = (itineraries: Itinerary[]) => {
    if (loadingInsideScreen)
      return (
        <View
          style={{
            width: '100%',
            height: 300,
          }}>
          <Loading />
        </View>
      );

    if (itineraries?.length === 0)
      return (
        <View
          style={{ flex: 1, height: '100%', width: '100%', marginTop: 100 }}>
          <TextMedium
            numberOfLines={2}
            style={{
              color: 'black',
              fontSize: 20,
              paddingHorizontal: 20,
              lineHeight: 22,
              textAlign: 'center',
            }}>
            Sorry, we found no results on these dates.
          </TextMedium>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.navigation.goBack()}>
            <TextBold
              style={{
                color: 'black',
                fontSize: 24,
                marginTop: 40,
                lineHeight: 22,
                textAlign: 'center',
              }}>
              Back
            </TextBold>
          </TouchableOpacity>
        </View>
      );

    const fastestItinerary = findFastestItineraries(itineraries, results.Legs);

    const renderPrice = item => {
      const symbol = getCurrencySymbol(results);
      if (symbol === '$') {
        return `${symbol}${item.PricingOptions[0]?.Price.toString()}`;
      }
      return `${item.PricingOptions[0]?.Price.toString()}${symbol}`;
    };
    return (
      <>
        {
          <>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  Linking.openURL(itineraries[0].PricingOptions[0].DeeplinkUrl);
                }}>
                <FlightCard
                  price={renderPrice(itineraries[0])}
                  badgeType={BadgeType.CHEAPEST}
                  outboundLeg={results.Legs.find(
                    val => val.Id === itineraries[0].OutboundLegId,
                  )}
                  inboundLeg={results.Legs.find(
                    val => val.Id === itineraries[0].InboundLegId,
                  )}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  Linking.openURL(
                    fastestItinerary.PricingOptions[0].DeeplinkUrl,
                  );
                }}>
                <FlightCard
                  price={renderPrice(fastestItinerary)}
                  badgeType={BadgeType.FASTEST}
                  outboundLeg={results.Legs.find(
                    val => val.Id === fastestItinerary.OutboundLegId,
                  )}
                  inboundLeg={results.Legs.find(
                    val => val.Id === fastestItinerary.InboundLegId,
                  )}
                />
              </TouchableOpacity>
            </View>
          </>
        }
        <FlatList
          data={itineraries.slice(1)}
          renderItem={({ item, index }) => {
            const outboundLeg = results.Legs.find(
              val => val.Id === item.OutboundLegId,
            );
            const inboundLeg = results.Legs.find(
              val => val.Id === item.InboundLegId,
            );
            return (
              <>
                <View style={{ marginTop: 30 }}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      Linking.openURL(item.PricingOptions[0].DeeplinkUrl);
                    }}>
                    <FlightCard
                      price={renderPrice(item)}
                      badgeType={BadgeType.NONE}
                      outboundLeg={outboundLeg}
                      inboundLeg={inboundLeg}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        />
      </>
    );
  };

  const renderHeader = () => {
    const isWithInbound = query.inboundDate !== null;

    const inputHeight =
      results.Itineraries.length <= 5 ? results.Itineraries.length * 30 : 130;
    const maxHeight = isWithInbound ? 180 : 200;
    const minHeight = isWithInbound ? 150 : 100;
    return (
      <>
        <Animated.View
          style={{
            backgroundColor: colors.grey,
            paddingBottom: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: scrollY.interpolate({
              inputRange: [0, inputHeight],
              outputRange: [0, 0.2],
              extrapolate: 'clamp',
            }),
            shadowRadius: 10,
            elevation: scrollY.interpolate({
              inputRange: [0, inputHeight],
              outputRange: [0, 10],
              extrapolate: 'clamp',
            }),
            height:
              results.Itineraries.length < 3
                ? 200
                : scrollY.interpolate({
                    inputRange: [0, inputHeight],
                    outputRange: [maxHeight, minHeight],
                    extrapolate: 'clamp',
                  }),
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 20,
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.goBack()}>
              <FontAwesomeIcon icon={faChevronLeft} size={26} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => ref.scrollTo({ y: 0, animated: true })}>
              <Headline style={{ paddingLeft: 20, marginTop: 2 }}>
                {`${formatPlaceId(query.originPlace)} - ${formatPlaceId(
                  query.destinationPlace,
                )}`}
              </Headline>
            </TouchableOpacity>
          </View>
          <HorizontalCarousel
            days={generateDays(outboundDate)}
            selectedDay={moment(outboundDate)}
            enableScroll={!carouselIsScrolled}
            selectDay={day => {
              if (moment(day.toDate()).isSame(outboundDate)) return;

              setCarouselIsScrolled(true);
              dispatch(setOutboundToQuery(day.toDate()));
              dispatch(recreateSession());
              selectDay(day);
            }}
          />
          {query.inboundDate && (
            <HorizontalCarousel
              style={{ marginTop: 10 }}
              enableScroll={!carouselIsScrolled}
              days={generateDays(inboundDate)}
              selectedDay={moment(inboundDate)}
              selectDay={day => {
                if (moment(day.toDate()).isSame(inboundDate)) return;
                dispatch(setInboundToQuery(day.toDate()));
                dispatch(recreateSession());
                selectDay(day);
              }}
            />
          )}
        </Animated.View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />
      {loading && <Loading />}
      {!loading && (
        <ScrollView
          ref={r => setRef(r)}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={0}
          stickyHeaderIndices={[0]}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ])}>
          {renderHeader()}

          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {/* {results.Status === 'UpdatesPending' && <Loading />} */}
            {renderResults(results.Itineraries.slice(0, 50))}
          </View>
        </ScrollView>
      )}
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
    flexGrow: 1,
    paddingHorizontal: 20,
    borderWidth: 1,
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
