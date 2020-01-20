import React, { ReactElement } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import TextRegular from './TextRegular';

interface Props extends TextProps {
  children: string | ReactElement | ReactElement[];
}

const TextBold: (props: Props) => ReactElement = props => {
  return (
    <TextRegular style={[styles.bold, props.style]}>
      {props.children}
    </TextRegular>
  );
};

export default TextBold;

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'Poppins-Bold',
  },
});
