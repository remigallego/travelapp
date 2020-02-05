/* eslint-disable react-native/no-inline-styles */
import React, {
  ReactElement,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
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
}

const CalendarComponent: (props: Props) => ReactElement = props => {
  const [isFrom, setIsFrom] = useState<number | null>(null);
  const [isTo, setIsTo] = useState<number | null>(null);

  useLayoutEffect(() => {
    setIsFrom(null);
    setIsTo(null);
  }, [props.month]);

  const renderLetters = () => {
    const daysStartWithSunday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
      <View style={[styles.lettersContainer]}>
        {daysStartWithSunday.map(day => (
          <View style={styles.item}>
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
      .months(props.month)
      .daysInMonth();

    const firstDayOfMonth = moment()
      .months(props.month)
      .startOf('month')
      .weekday(); // 6 = saturday, 0 = sunday

    const emptySpaces = Array.from(Array(firstDayOfMonth).keys()).map(() => (
      <View style={styles.item} />
    ));

    const arrayOfNumbers = Array.from(Array(numberOfDays).keys()).map(
      n => n + 1,
    );

    const isInRange = (number: number) =>
      isFrom && isTo && isFrom < number && number < isTo;

    const selectedNumber = (number: number) => {
      return (
        <View style={styles.item}>
          <View style={styles.alignCenter}>
            <View style={[styles.numberContainer, styles.selectedCircle]}>
              <Text
                key={number}
                style={[styles.numberText, styles.selectedText]}>
                {number.toString()}
              </Text>
            </View>
            <View
              style={[
                isFrom && isTo && styles.absoluteBackgroundColor,
                number === isFrom && { right: 0 },
                number === isTo && { left: 0 },
              ]}
            />
          </View>
        </View>
      );
    };

    return (
      <View style={styles.numbersFullContainer}>
        {emptySpaces}
        {arrayOfNumbers.map(number => {
          if (number === isFrom || number === isTo) {
            return selectedNumber(number);
          }
          return (
            <TouchableOpacity
              onPress={() => {
                if (!isFrom) setIsFrom(number);
                if (isFrom && !isTo && number > isFrom) setIsTo(number);
                if (isFrom && !isTo && number < isFrom) setIsFrom(number);
                if (isFrom && isTo) {
                  setIsFrom(number);
                  setIsTo(null);
                }
              }}
              activeOpacity={0.8}
              style={[styles.item]}>
              <View
                style={[
                  styles.alignCenter,
                  isInRange(number) && {
                    backgroundColor: 'rgba(35, 61, 189, 0.2)',
                  },
                ]}>
                <View style={[styles.numberContainer]}>
                  <Text key={number} style={styles.numberText}>
                    {number.toString()}
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
    alignItems: 'center'
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
