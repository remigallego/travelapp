import React, { ReactElement } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import colors from '../colors';

interface Props extends TextProps {
  children: string | ReactElement | ReactElement[];
}

const TextMedium: (props: Props) => ReactElement = props => {
  return (
    <Text
      {...props}
      numberOfLines={1}
      ellipsizeMode={'tail'}
      style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

export default TextMedium;

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 36,
    fontFamily: 'Poppins-Medium',
    lineHeight: 13,
    paddingTop: 28,
  },
});
