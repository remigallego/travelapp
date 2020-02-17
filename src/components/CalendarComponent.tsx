/* eslint-disable react-native/no-inline-styles */
import React, { ReactElement, useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  ViewProps,
  Text,
  View,
  TouchableOpacity,
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

    const selectedNumber = (date: Date) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (
              (props.outbound && moment(date).isSame(props.outbound)) ||
              (props.inbound && moment(date).isSame(props.inbound))
            ) {
              console.log('here');
              props.onOutboundSelect(null);
              props.onInboundSelect(null);
            }
          }}
          style={styles.item}
          key={date.toISOString()}>
          <View style={styles.alignCenter}>
            <View style={[styles.numberContainer, styles.selectedCircle]}>
              <Text
                key={date.getDay()}
                style={[styles.numberText, styles.selectedText]}>
                {date.getDate()}
              </Text>
            </View>
            <View
              style={[
                props.outbound?.getDate() && props.inbound?.getDate()
                  ? styles.absoluteBackgroundColor
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
              onPress={() => {
                if (!props.outbound) {
                  props.onOutboundSelect(date);
                }
                if (
                  props.outbound &&
                  !props.inbound &&
                  moment(date).isAfter(props.outbound)
                )
                  props.onInboundSelect(date);
                if (
                  props.outbound &&
                  !props.inbound &&
                  moment(date).isBefore(props.outbound)
                )
                  props.onOutboundSelect(date);
                if (props.outbound && props.inbound) {
                  props.onOutboundSelect(date);
                  props.onInboundSelect(null);
                }
              }}
              activeOpacity={0.8}
              style={[styles.item]}>
              <View
                style={[
                  styles.alignCenter,
                  isInRange(date)
                    ? {
                        backgroundColor: 'rgba(35, 61, 189, 0.2)',
                      }
                    : {},
                ]}>
                <View style={[styles.numberContainer]}>
                  <Text key={date.getDate()} style={styles.numberText}>
                    {date.getDate().toString()}
                  </Text>
                </View>
              </View>
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
  },
  item: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
  },
  numberContainer: {
    width: '100%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteBackgroundColor: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: 'rgba(35, 61, 189, 0.2)',
  },
  selectedCircle: {
    backgroundColor: 'blue',
    width: '80%',
    aspectRatio: 1,
    borderRadius: 10000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6.68,
    elevation: 11,
  },
  selectedText: { color: 'white' },
});
