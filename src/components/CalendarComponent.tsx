import React, { ReactElement } from 'react';
import { StyleSheet, ViewProps, Text, View } from 'react-native';
import colors from '../colors';
import Card from './Card';
import TextMedium from './TextMedium';
import moment from 'moment';
import TextLight from './TextLight';

interface Props extends ViewProps {
  month: moment.Moment;
}

const CalendarComponent: (props: Props) => ReactElement = props => {
  const renderWeekDays = () => {
    const daysStartWithSunday = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return (
      <View style={[styles.daysContainer]}>
        {daysStartWithSunday.map(day => {
          return (
            <View style={[{ flexGrow: 1 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TextMedium style={styles.dayText}>{day}</TextMedium>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderNumbers: () => ReactElement[] = () => {
    const numberOfDays = moment(props.month, 'm').daysInMonth();
    const arrayOfNumbers = Array.from(Array(numberOfDays).keys());

    const today = moment().day();

    const renderSelectedDay = number => {
      return (
        <View
          style={{
            backgroundColor: colors.blue,
            width: 35,
            height: 35,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            key={number}
            style={[styles.numberText, { color: colors.white }]}>
            {number.toString()}
          </Text>
        </View>
      );
    };

    return arrayOfNumbers.map(number => {
      return (
        <View style={[{ flexBasis: 50.3, marginBottom: 20 }]}>
          <View style={[{ flexDirection: 'row', justifyContent: 'center' }]}>
            {today === number ? (
              renderSelectedDay(number)
            ) : (
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text key={number} style={[styles.numberText]}>
                  {number.toString()}
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    });
  };

  return (
    <Card style={[props.style, { paddingHorizontal: 0 }]}>
      {renderWeekDays()}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          flexWrap: 'wrap',
          marginTop: 20,
        }}>
        {renderNumbers()}
      </View>
    </Card>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  daysContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    color: 'rgba(198, 199, 208, 0.6)',
    fontSize: 18,
  },
  numberText: {
    color: colors.black,
    fontSize: 18,
  },
});
