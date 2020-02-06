import React, { ReactElement } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextProps,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../colors';
import Card from './Card';
import TextSemiBold from './TextSemiBold';
import moment, { Moment } from 'moment';

interface Props extends TextProps {
  months: moment.Moment[];
  selectedMonth: number;
  selectMonth: (m: number) => void;
}

const VerticalCarousel: (props: Props) => ReactElement = props => {
  const { selectedMonth, selectMonth } = props;

  const getDynamicStyle = (date: moment.Moment) => {
    return {
      lineHeight: selectedMonth === date.month() ? 24 : 18,
      fontSize: selectedMonth === date.month() ? 30 : 24,
      opacity: selectedMonth === date.month() ? 1 : 0.4,
    };
  };

  const renderDate = (date: moment.Moment) => {
    return (
      <TouchableOpacity
        key={date.format("MMMM'YY")}
        onPress={() => selectMonth(date.month())}>
        <TextSemiBold style={[{ color: colors.blue }, getDynamicStyle(date)]}>
          {`${date.format("MMMM'YY")}`}
        </TextSemiBold>
      </TouchableOpacity>
    );
  };

  return (
    <Card style={[styles.card, props.style]}>
      <ScrollView
        scrollEventThrottle={10}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.flexContainer}>
          {props.months.map(date => {
            return renderDate(date);
          })}
        </View>
      </ScrollView>
    </Card>
  );
};

export default VerticalCarousel;

const styles = StyleSheet.create({
  card: { height: 150, paddingHorizontal: 0, paddingBottom: 0, paddingTop: 0 },
  text: {
    color: colors.white,
    fontSize: 36,
    fontFamily: 'Poppins-Medium',
    lineHeight: 13,
    paddingTop: 28,
  },
  scrollView: {
    height: '100%',
  },
  flexContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
