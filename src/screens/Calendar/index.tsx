import React, { ReactElement } from 'react';
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.screen}>
        <StatusBar
          backgroundColor={colors.backgroundBlue}
          barStyle={'dark-content'}
        />

        <View style={styles.container}>
          <TextLight>
            <TextSemiBold style={styles.blackText}>Venice, VCE</TextSemiBold>
          </TextLight>

          <Card style={styles.smallMarginTop}>
            <TextMedium style={[styles.blackText, { fontSize: 18 }]}>
              1 passenger, business
            </TextMedium>
          </Card>

          <VerticalCarousel style={styles.smallMarginTop} months={months} />

          <CalendarComponent
            style={[styles.smallMarginTop]}
            month={moment().date(1)}
          />

          <ButtonComponent style={styles.smallMarginTop}>
            Search
          </ButtonComponent>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
  },
  blackText: { color: colors.black },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  smallMarginTop: {
    marginTop: 30,
  },
});
