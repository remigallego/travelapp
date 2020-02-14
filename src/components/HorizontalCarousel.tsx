import React, { ReactElement } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextProps,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../colors';
import moment, { Moment } from 'moment';
import TextMedium from './TextMedium';

interface Props extends TextProps {
  days: moment.Moment[];
  selectedDay: moment.Moment;
  selectDay: (d: moment.Moment) => void;
}

const HorizontalCarousel: (props: Props) => ReactElement = props => {
  const renderDay = (day: moment.Moment) => {
    const isSelected = moment(day).isSame(props.selectedDay, 'day');
    return (
      <TouchableOpacity
        onPress={() => props.selectDay(day)}
        style={{ height: '100%', width: 70, marginRight: 20 }}
        key={day.toString()}>
        <View
          style={{
            backgroundColor: isSelected ? colors.blue : colors.white,
            height: '100%',
            borderRadius: 80,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextMedium
            style={{
              fontSize: 20,
              color: isSelected ? colors.grey : colors.black,
            }}>
            {day
              .format('ddd dddd')
              .toUpperCase()
              .slice(0, 3)}
          </TextMedium>
          <TextMedium
            style={{
              fontSize: 30,
              color: isSelected ? colors.grey : colors.black,
            }}>
            {day
              .format('D')
              .toUpperCase()
              .slice(0, 3)}
          </TextMedium>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      horizontal={true}
      scrollEventThrottle={10}
      style={[styles.scrollView, props.style]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.flexContainer}>{props.days.map(renderDay)}</View>
    </ScrollView>
  );
};

export default HorizontalCarousel;

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
    flexDirection: 'row',
    alignItems: 'center',
  },
});
