import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import TextMedium from '../../components/TextMedium';
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
import { createSession } from '../../reducers/query';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CalendarScreen: (props: Props) => ReactElement = props => {
  const [selectedMonth, selectMonth] = useState(
    moment()
      .add('1', 'month')
      .month(),
  );

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
  const inbound = useSelector(state => state.query.inboundDate);
  const outbound = useSelector(state => state.query.outboundDate);

  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Headline>{`${formatPlaceId(origin)} - ${formatPlaceId(
            destination,
          )}`}</Headline>
        </View>

        <Card style={styles.smallMarginTop}>
          <TextMedium style={[styles.blackText, styles.smallText]}>
            1 passenger, business
          </TextMedium>
        </Card>

        <VerticalCarousel
          style={styles.smallMarginTop}
          months={months}
          selectMonth={selectMonth}
          selectedMonth={selectedMonth}
        />

        <CalendarComponent
          style={styles.smallMarginTop}
          month={selectedMonth}
          inbound={inbound}
          outbound={outbound}
          onOutboundSelect={v => dispatch(setOutboundDate(v))}
          onInboundSelect={v => dispatch(setInboundDate(v))}
        />

        <ButtonComponent
          style={styles.smallMarginTop}
          onPress={() => {
            dispatch(createSession());
            props.navigation.navigate('Results');
          }}>
          Search
        </ButtonComponent>
      </View>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  smallMarginTop: {
    marginTop: 0,
  },
});
