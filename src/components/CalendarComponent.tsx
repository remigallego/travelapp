/* eslint-disable react-native/no-inline-styles */
import React, { ReactElement, useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  ViewProps,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import colors from '../colors';
import Card from './Card';
import TextMedium from './TextMedium';
import moment from 'moment';

interface Props extends ViewProps {
  month: number;
  inbound: Date;
  outbound: Date;
  onInboundSelect: (inbound: Date) => void;
  onOutboundSelect: (outbound: Date) => void;
}

const CalendarComponent: (props: Props) => ReactElement = props => {
  const [rangeAnimation, setIsRange] = useState(new Animated.Value(0));

  useLayoutEffect(() => {
    if (props.inbound && props.outbound) {
      Animated.timing(rangeAnimation, {
        toValue: 100,
        duration: 500,
      }).start();
    } else {
      rangeAnimation.setValue(0);
    }
  }, [props.inbound, props.outbound]);

  const renderLetters = () => {
    const daysStartWithSunday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
      <View style={[styles.lettersContainer]}>
        {daysStartWithSunday.map((day, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.alignCenter}>
              <TextMedium style={styles.letterText}>{day}</TextMedium>
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderNumbers: () => ReactElement = () => {
    const numberOfDays = moment()
      .month(props.month)
      .daysInMonth();

    const firstDayOfMonth = moment()
      .month(props.month)
      .startOf('month')
      .weekday(); // 6 = saturday, 0 = sunday

    const emptySpaces = Array.from(
      Array(firstDayOfMonth).keys(),
    ).map((_val, index) => <View key={index} style={styles.item} />);

    const arrayOfDates = Array.from(Array(numberOfDays).keys()).map(n => {
      return moment()
        .month(props.month)
        .date(n + 1)
        .startOf('day')
        .toDate();
    });

    const isInRange = (date: Date) =>
      moment(date).isBetween(props.outbound, props.inbound);

    const interpolatedBgColor = rangeAnimation.interpolate({
      inputRange: [0, 10, 20, 60, 100],
      outputRange: [
        'rgba(35, 61, 189, 0)',
        'rgba(35, 61, 189, 0)',
        'rgba(35, 61, 189, 0.3)',
        'rgba(35, 61, 189, 0.3)',
        'rgba(35, 61, 189, 0.2)',
      ],
    });

    const handleOutboundSelect = (date: Date) => {
      props.onOutboundSelect(date);
    };
    const handleInboundSelect = (date: Date) => {
      props.onInboundSelect(date);
    };

    const selectedNumber = (date: Date) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => {
            if (
              (props.outbound && moment(date).isSame(props.outbound)) ||
              (props.inbound && moment(date).isSame(props.inbound))
            ) {
              handleOutboundSelect(null);
              handleInboundSelect(null);
            }
          }}
          style={styles.item}
          key={date.toISOString()}>
          <View style={styles.alignCenter}>
            <Animated.View
              style={[
                styles.numberContainer,
                styles.selectedCircle,
                {
                  width: '80%',
                },
              ]}>
              <Text
                key={date.getDay()}
                style={[styles.numberText, styles.selectedText]}>
                {date.getDate()}
              </Text>
            </Animated.View>
            <Animated.View
              style={[
                props.outbound?.getDate() && props.inbound?.getDate()
                  ? StyleSheet.compose(styles.absoluteBackgroundColor, {
                      backgroundColor: interpolatedBgColor,
                    })
                  : {},
                date.getDate() === props.outbound?.getDate() && { right: 0 },
                date.getDate() === props.inbound?.getDate() && { left: 0 },
              ]}
            />
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.numbersFullContainer}>
        {emptySpaces}
        {arrayOfDates.map(date => {
          if (
            moment(date).isSame(props.outbound) ||
            moment(date).isSame(props.inbound)
          ) {
            return selectedNumber(date);
          }
          return (
            <TouchableOpacity
              key={date.getDate()}
              onPressIn={() => {
                if (!props.outbound) {
                  handleOutboundSelect(date);
                }
                if (
                  props.outbound &&
                  !props.inbound &&
                  moment(date).isAfter(props.outbound)
                )
                  handleInboundSelect(date);
                if (
                  props.outbound &&
                  !props.inbound &&
                  moment(date).isBefore(props.outbound)
                )
                  handleOutboundSelect(date);
                if (props.outbound && props.inbound) {
                  handleOutboundSelect(date);
                  handleInboundSelect(null);
                }
              }}
              activeOpacity={0.5}
              style={[styles.item]}>
              <Animated.View
                style={[
                  styles.alignCenter,
                  isInRange(date)
                    ? {
                        backgroundColor: interpolatedBgColor,
                      }
                    : {},
                ]}>
                <View style={[styles.numberContainer]}>
                  <Text key={date.getDate()} style={styles.numberText}>
                    {date.getDate().toString()}
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Card style={[styles.card, props.style]}>
      {renderLetters()}
      {renderNumbers()}
    </Card>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  card: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  lettersContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numbersFullContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  letterText: {
    color: 'rgba(198, 199, 208, 0.6)',
    fontSize: 18,
  },
  numberText: {
    color: colors.black,
    fontSize: 18,
  },
  alignCenter: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
  },
  numberContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteBackgroundColor: {
    position: 'absolute',
    width: '50%',
    height: '100%',
  },
  selectedCircle: {
    backgroundColor: 'blue',

    aspectRatio: 1,
    borderRadius: 10000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.68,
    elevation: 8,
  },
  selectedText: { color: 'white' },
});
