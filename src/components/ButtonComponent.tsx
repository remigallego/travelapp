import React, { ReactElement } from 'react';
import { StyleSheet, ViewProps, View } from 'react-native';
import colors from '../colors';
import TextSemiBold from './TextSemiBold';

interface Props extends ViewProps {
  children: string | ReactElement | ReactElement[];
}

const ButtonComponent: (props: Props) => ReactElement = props => {
  return (
    <View style={[styles.flexContainer, props.style]}>
      <View style={styles.container}>
        <TextSemiBold style={styles.text}>{props.children}</TextSemiBold>
      </View>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    backgroundColor: colors.pink,
    borderRadius: 40,
    paddingBottom: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
  },
});
