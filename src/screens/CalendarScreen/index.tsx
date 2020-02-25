import React, { ReactElement, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import colors from '../../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarComponent from '../../components/CalendarComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import VerticalCarousel from '../../components/VerticalCarousel';
import Headline from '../../components/Headline';
import moment from 'moment';
import { useSelector } from '../../store';
import { formatPlaceId } from '../../utils/places';
import { useDispatch } from 'react-redux';
import { setInboundDate, setOutboundDate } from '../../reducers/calendar';
import {
  createSession,
  setOutboundToQuery,
  setInboundToQuery,
  setAdultsToQuery,
  setInfantsToQuery,
} from '../../reducers/query';
import { ScrollView } from 'react-native-gesture-handler';
import PassengerDetail from './PassengerDetail';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CalendarScreen: (props: Props) => ReactElement = props => {
  const [selectedMonth, selectMonth] = useState(
    moment()
      .add('1', 'month')
      .month(),
  );

  const [scrollY] = useState(new Animated.Value(0));
  const [, setScrollViewRef] = useState(null);
  const adults = useSelector(state => state.query.adults);
  const infants = useSelector(state => state.query.infants);

  const generateNextDates = () => {
    const result = [];
    for (let i = 0; i <= 12; i++) {
      result.push(
        moment()
          .add(i, 'month')
          .date(1),
      );
    }
    return result;
  };

  const months = generateNextDates();

  const origin = useSelector(state => state.query.originPlace);
  const destination = useSelector(state => state.query.destinationPlace);
  const inbound = useSelector(state => state.calendar.inboundDate);
  const outbound = useSelector(state => state.calendar.outboundDate);

  const dispatch = useDispatch();

  const setScrollBasedElevation = () => {
    const interpolated = scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return interpolated;
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />

      <ScrollView
        nestedScrollEnabled={true}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={10}
        ref={r => setScrollViewRef(r)}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        contentContainerStyle={[{ flexGrow: 1 }]}>
        <Animated.View
          style={{
            flexDirection: 'row',
            paddingBottom: 5,
            elevation: setScrollBasedElevation(),
            backgroundColor: colors.grey,
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
            <TouchableOpacity activeOpacity={1}>
              <Headline style={{ paddingLeft: 20, marginTop: 2 }}>
                {`${formatPlaceId(origin)} - ${formatPlaceId(destination)}`}
              </Headline>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.container}>
          <PassengerDetail
            adults={adults}
            infants={infants}
            setAdults={n => dispatch(setAdultsToQuery(n))}
            setInfants={n => dispatch(setInfantsToQuery(n))}
          />
          <VerticalCarousel
            style={[styles.smallMarginTop]}
            months={months}
            selectMonth={selectMonth}
            selectedMonth={selectedMonth}
          />

          <CalendarComponent
            style={[styles.smallMarginTop, { marginBottom: 70 }]}
            month={selectedMonth}
            inbound={inbound}
            outbound={outbound}
            onOutboundSelect={v => dispatch(setOutboundDate(v))}
            onInboundSelect={v => dispatch(setInboundDate(v))}
          />
        </View>
      </ScrollView>
      <ButtonComponent
        style={[
          {
            position: 'absolute',
            bottom: 30,
          },
        ]}
        disabled={outbound === null}
        onPress={() => {
          dispatch(setOutboundToQuery(outbound));
          dispatch(setInboundToQuery(inbound));
          dispatch(createSession());
          props.navigation.navigate('Results');
        }}>
        Search
      </ButtonComponent>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
  },
  bigText: {
    fontSize: 30, // TODO: Should be responsive
  },
  smallText: { fontSize: 18 },
  blackText: { color: colors.black },
  container: {
    paddingHorizontal: 20,
  },

  passengerContainer: {
    marginTop: 0,
  },
  smallMarginTop: {
    marginTop: 15,
  },
});
