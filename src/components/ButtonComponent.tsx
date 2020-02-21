import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Animated,
} from 'react-native';
import colors from '../colors';
import TextSemiBold from './TextSemiBold';

interface Props extends TouchableOpacityProps {
  children: string | ReactElement | ReactElement[];
  color?: string;
  activeColor?: string;
}

const ButtonComponent: (props: Props) => ReactElement = props => {
  const [pressAnim, setPressAnim] = useState(new Animated.Value(0));

  const { children, style, ...otherProps } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => {
        Animated.timing(pressAnim, {
          toValue: 100,
          duration: 100,
        }).start();
      }}
      onPressOut={() => {
        pressAnim.setValue(0);
      }}
      style={[styles.flexContainer, style]}
      {...otherProps}>
      <View
        style={[
          styles.container,
          {
            opacity: props.disabled ? 0.4 : 1,
            backgroundColor: props.color ? props.color : colors.pink,
          },
        ]}>
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: colors.activeColor
              ? colors.activeColor
              : '#c2938f',
            opacity: pressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 0.4],
            }),
            width: pressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            borderRadius: pressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 40],
            }),

            position: 'absolute',
            zIndex: 8,
          }}></Animated.View>
        <TextSemiBold
          style={[
            styles.text,
            {
              paddingBottom: 10,
              paddingHorizontal: 30,
            },
          ]}>
          {children}
        </TextSemiBold>
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
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
  },
});
