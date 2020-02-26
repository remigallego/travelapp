import React, { ReactElement } from 'react';
import { StyleSheet, TextStyle, StyleProp, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TextSemiBold from '../components/TextSemiBold';
import colors from '../colors';

interface Props {
  children: string | ReactElement | ReactElement[];
  style?: StyleProp<TextStyle>;
}

const Headline: (props: Props) => ReactElement = props => {
  return (
    <View style={props.style}>
      <TextSemiBold style={[styles.blackText, styles.bigText]}>
        {props.children}
      </TextSemiBold>
      <View style={{ backgroundColor: colors.pink, width: 30, height: 3 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 30, // TODO: Should be responsive
  },
  blackText: { color: Colors.black },
});

export default Headline;
