import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import colors from '../../colors';
import TextLight from '../../components/TextLight';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextSemiBold from '../../components/TextSemiBold';
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
import moment from 'moment';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Calendar: (props: Props) => ReactElement = () => {
  const [selectedMonth, selectMonth] = useState(moment().month());

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
    c;
  };

  const months = generateNextDates();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <TextSemiBold style={[styles.blackText, styles.bigText]}>
          Venice, VCE
        </TextSemiBold>

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
        />

        <ButtonComponent style={styles.smallMarginTop}>Search</ButtonComponent>
      </View>
    </SafeAreaView>
  );
};

export default Calendar;

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
