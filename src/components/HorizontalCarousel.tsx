import React, { ReactElement, useState } from 'react';
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
  const [scrollViewRef, setScrollViewRef] = useState(null);
  const [width, setWidth] = useState(0);
  if (scrollViewRef) {
    scrollViewRef.scrollTo({ x: width / 2 - 65 });
  }
  const renderDay = (day: moment.Moment, index: number) => {
    const isSelected = moment(day).isSame(props.selectedDay, 'day');
    return (
      <TouchableOpacity
        onPress={() => props.selectDay(day)}
        style={[
          styles.touchableContainer,
          {
            marginLeft: index === 0 ? 20 : 10,
          },
        ]}
        key={day.toString()}>
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: isSelected ? colors.blue : colors.white,
            },
          ]}>
          <TextMedium
            style={[
              styles.bigText,
              {
                color: isSelected ? colors.grey : colors.black,
              },
            ]}>
            {day
              .format('D')
              .toUpperCase()
              .slice(0, 3)}{' '}
          </TextMedium>
          <TextMedium
            style={[
              styles.smallText,
              {
                color: isSelected ? colors.grey : colors.black,
              },
            ]}>
            {day.format('LL').slice(0, 3)}
          </TextMedium>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      onLayout={e => setWidth(e.nativeEvent.layout.width)}
      ref={r => setScrollViewRef(r)}
      contentOffset={{ x: 130, y: 130 }}
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
  card: { paddingHorizontal: 0, paddingBottom: 0, paddingTop: 0 },
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
  touchableContainer: {
    height: '100%',
    width: 70,
    marginRight: 10,
  },
  textContainer: {
    height: '100%',
    borderRadius: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  smallText: {
    fontSize: 12,
    lineHeight: 1,
  },
  bigText: {
    fontSize: 22,
    lineHeight: 1,
  },
});
