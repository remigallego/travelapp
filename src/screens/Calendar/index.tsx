import React, { ReactElement } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
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

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Calendar: (props: Props) => ReactElement = () => {
  return (
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

        <VerticalCarousel style={styles.smallMarginTop} />

        <CalendarComponent style={styles.smallMarginTop} />

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
  blackText: { color: colors.black },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  smallMarginTop: {
    marginTop: 30,
  },
});
