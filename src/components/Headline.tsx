import React, { ReactElement } from 'react';
import { StyleSheet, TextStyle, StyleProp } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TextSemiBold from '../components/TextSemiBold';

interface Props {
  children: string | ReactElement | ReactElement[];
  style?: StyleProp<TextStyle>;
}

const Headline: (props: Props) => ReactElement = props => {
  return (
    <TextSemiBold style={[styles.blackText, styles.bigText, props.style]}>
      {props.children}
    </TextSemiBold>
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 30, // TODO: Should be responsive
  },
  blackText: { color: Colors.black },
});

export default Headline;
