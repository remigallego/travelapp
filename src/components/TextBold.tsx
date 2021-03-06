import React, { ReactElement } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import TextLight from './TextLight';

interface Props extends TextProps {
  children: string | ReactElement | ReactElement[];
}

const TextBold: (props: Props) => ReactElement = props => {
  return (
    <TextLight style={[styles.bold, props.style]}>{props.children}</TextLight>
  );
};

export default TextBold;

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'Poppins-Bold',
  },
});
