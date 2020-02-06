import React, { ReactElement } from 'react';
import { StyleSheet, ViewProps, View } from 'react-native';
import colors from '../colors';

interface Props extends ViewProps {
  children: string | ReactElement | ReactElement[];
}

const Card: (props: Props) => ReactElement = props => {
  return (
    <View style={[styles.card, props.style]} onLayout={props.onLayout}>
      {props.children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 30,
  },
});
