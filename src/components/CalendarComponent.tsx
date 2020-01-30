import React, { ReactElement } from 'react';
import { StyleSheet, ViewProps, Text } from 'react-native';
import colors from '../colors';
import Card from './Card';

interface Props extends ViewProps {}

const CalendarComponent: (props: Props) => ReactElement = props => {
  return (
    <Card style={props.style}>
      <Text>CalendarComponent</Text>
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
});
