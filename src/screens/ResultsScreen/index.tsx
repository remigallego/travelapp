import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
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
  const [ref, setRef] = useState();

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

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

    const getBadgeType = (index: number) => {
      if (index === 0) {
        return BadgeType.CHEAPEST;
      }
      /*   if (itinerary.OutboundLegId === fastestId) {
          return BadgeType.FASTEST;
        } */
      return BadgeType.NONE;
    };
    return (
      <FlatList
        data={itineraries}
        renderItem={({ item, index }) => {
          const outboundLeg = results.Legs.find(
            val => val.Id === item.OutboundLegId,
          );
          const inboundLeg = results.Legs.find(
            val => val.Id === item.InboundLegId,
          );
          return (
            <>
              <View style={{ marginTop: 40 }}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(item.PricingOptions[0].DeeplinkUrl);
                  }}>
                  <FlightCard
                    price={`${item.PricingOptions[0]?.Price.toString()}${getCurrencySymbol(
                      results,
                    )}`}
                    badgeType={getBadgeType(index)}
                    outboundLeg={outboundLeg}
                    inboundLeg={inboundLeg}
                  />
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
    );
  };

  const renderHeader = () => (
    <>
      <Animated.View
        style={{
          backgroundColor: colors.grey,
          paddingBottom: 10,
          elevation: scrollY.interpolate({
            inputRange: [0, 250],
            outputRange: [0, 10],
            extrapolate: 'clamp',
          }),
          height: scrollY.interpolate({
            inputRange: [0, 250],
            outputRange: [180, 150],
            extrapolate: 'clamp',
          }),
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => ref.scrollTo({ y: 0, animated: true })}>
          <Headline style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
            {`${formatPlaceId(query.originPlace)} - ${formatPlaceId(
              query.destinationPlace,
            )}`}
          </Headline>
        </TouchableOpacity>
        <HorizontalCarousel
          days={generateDays(outboundDate)}
          selectedDay={moment(outboundDate)}
          selectDay={day => {
            dispatch(setOutboundToQuery(day.toDate()));
            selectDay(day);
          }}
        />
        {query.inboundDate && (
          <HorizontalCarousel
            style={{ marginTop: 10 }}
            days={generateDays(inboundDate)}
            selectedDay={moment(inboundDate)}
            selectDay={day => {
              dispatch(setInboundToQuery(day.toDate()));
              selectDay(day);
            }}
          />
        )}
      </Animated.View>
    </>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />
      {loading && renderLoading()}
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
        <View style={{ flex: 1 }}>
          {!loading && renderResults(results.Itineraries.slice(0, 50))}
        </View>
      </ScrollView>
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
