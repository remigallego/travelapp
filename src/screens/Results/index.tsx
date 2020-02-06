import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import colors from '../../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonComponent from '../../components/ButtonComponent';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import Headline from '../../components/Headline';
import HorizontalCarousel from '../../components/HorizontalCarousel';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import FlightCard from './FlightCard';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Results: (props: Props) => ReactElement = () => {
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

  return (
    <ScrollView>
      <SafeAreaView style={styles.screen}>
        <StatusBar
          backgroundColor={colors.backgroundBlue}
          barStyle={'dark-content'}
        />

        <View style={styles.container}>
          <Headline>BER - VCE</Headline>
          <HorizontalCarousel
            style={{ height: 120 }}
            days={generateDays()}
            selectedDay={selectedDay}
            selectDay={day => {
              selectDay(day);
            }}
          />
          <View style={{ marginTop: 40 }}>
            <FlightCard
              price={'45'}
              badgeTitle={'Cheapest'}
              badgeColor={'rgba(131, 211, 255, 0.8)'}
              badgeTextColor={'#076EA7'}
            />
          </View>
          <View style={{ marginTop: 40 }}>
            <FlightCard
              price={'45'}
              badgeTitle={'Fastest'}
              badgeColor={'rgba(248, 190, 186, 0.8)'}
              badgeTextColor={'#DD8B86'}
            />
          </View>
          <View style={{ marginTop: 40 }}>
            <FlightCard
              price={'45'}
              badgeTitle={'Popular'}
              badgeColor={'rgba(196, 251, 177, 0.8)'}
              badgeTextColor={'#89D66F'}
            />
          </View>
          <ButtonComponent style={styles.smallMarginTop}>
            Search
          </ButtonComponent>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Results;

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
