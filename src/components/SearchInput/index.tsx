import React, { ReactElement } from 'react';
import { StyleSheet, TextInputProps, Animated } from 'react-native';
import colors from '../../colors';
import { TextInput } from 'react-native-gesture-handler';
import { useAnimation } from 'react-native-animation-hooks';

interface Props extends TextInputProps {}

const SearchInput: (props: Props) => ReactElement = props => {
  const valueIsEmpty =
    props.value === null || props.value === '' || props.value === undefined;

  const colorAnimation = useAnimation({
    type: 'timing',
    initialValue: 0,
    toValue: valueIsEmpty ? 0 : 100,
    duration: 200,
  });

  return (
    <Animated.View style={[styles.searchInput, styles.dropShadow, props.style]}>
      <Animated.Image
        source={require('./glass.png')}
        style={[
          styles.image,
          {
            // Doesn't work with the debugger on
            tintColor: colorAnimation.interpolate({
              inputRange: [0, 100],
              outputRange: [colors.darkerGrey, colors.blue],
            }),
          },
        ]}
      />
      <TextInput
        {...props}
        selectTextOnFocus
        style={styles.textInput}
        clearTextOnFocus={true}
        placeholderTextColor={colors.darkerGrey}
      />
    </Animated.View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.grey,
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 12,
  },
  image: {
    padding: 6,
    margin: 5,
    marginLeft: 10,
    height: 2,
    width: 2,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    color: colors.blue,
    marginTop: 14,
    fontFamily: 'Poppins-Medium',
    paddingTop: 0,
    fontSize: 14,
  },
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});
