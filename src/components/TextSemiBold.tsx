import React, { ReactElement } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import TextLight from './TextLight';

interface Props extends TextProps {
  children: string | ReactElement | ReactElement[];
}

const TextSemiBold: (props: Props) => ReactElement = props => {
  return (
    <TextLight style={[styles.semiBold, props.style]}>
      {props.children}
    </TextLight>
  );
};

export default TextSemiBold;

const styles = StyleSheet.create({
  semiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
});
