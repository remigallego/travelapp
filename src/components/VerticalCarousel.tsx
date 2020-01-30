import React, { ReactElement, useState } from 'react';
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
import moment from 'moment';

interface Props extends TextProps {}

const VerticalCarousel: (props: Props) => ReactElement = props => {
  const [selectedDate, selectDate] = useState(moment().format("MMMM'YY"));

  const generateNextDates = () => {
    const result = [];
    for (let i = 0; i <= 12; i++) {
      const newMonth = moment()
        .add(i, 'month')
        .format("MMMM'YY");
      result.push(newMonth);
    }
    return result;
  };

  const getDynamicStyle = (date: string) => {
    return {
      lineHeight: selectedDate === date ? 24 : 18,
      fontSize: selectedDate === date ? 30 : 24,
      opacity: selectedDate === date ? 1 : 0.4,
    };
  };

  const dates = generateNextDates();

  const renderDate = (date: string) => {
    return (
      <TouchableOpacity key={date} onPress={() => selectDate(date)}>
        <TextSemiBold style={[{ color: colors.blue }, getDynamicStyle(date)]}>
          {`${date}`}
        </TextSemiBold>
      </TouchableOpacity>
    );
  };

  return (
    <Card style={[styles.card, props.style]}>
      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.flexContainer}>
          {dates.map(date => renderDate(date))}
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
