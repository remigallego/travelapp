import React, { ReactElement } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import colors from '../colors';

interface Props extends TextProps {
  children: string | ReactElement | ReactElement[];
}

const TextRegular: (props: Props) => ReactElement = props => {
  return <Text style={[styles.text, props.style]}>{props.children}</Text>;
};

export default TextRegular;

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 36,
    fontFamily: 'Poppins-Light',
    lineHeight: 13,
    paddingTop: 28,
  },
});
