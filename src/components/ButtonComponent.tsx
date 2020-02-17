import React, { ReactElement } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../colors';
import TextSemiBold from './TextSemiBold';

interface Props extends TouchableOpacityProps {
  children: string | ReactElement | ReactElement[];
}

const ButtonComponent: (props: Props) => ReactElement = props => {
  const { children, style, ...otherProps } = props;
  return (
    <TouchableOpacity style={[styles.flexContainer, style]} {...otherProps}>
      <View
        style={[
          styles.container,
          {
            opacity: props.disabled ? 0.4 : 1,
          },
        ]}>
        <TextSemiBold style={styles.text}>{children}</TextSemiBold>
      </View>
    </TouchableOpacity>
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
