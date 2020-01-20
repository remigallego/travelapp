import React, { ReactElement } from 'react';
import { StyleSheet, TextInputProps, Animated } from 'react-native';
import colors from '../../colors';
import { TextInput } from 'react-native-gesture-handler';

interface Props extends TextInputProps {}

const SearchInput: (props: Props) => ReactElement = props => {
  const valueIsEmpty =
    props.value === null || props.value === '' || props.value === undefined;

  return (
    <Animated.View style={[styles.searchInput, props.style]}>
      <Animated.Image
        source={require('./glass.png')}
        style={[
          styles.image,
          {
            tintColor: valueIsEmpty ? colors.darkerGrey : colors.blue,
          },
        ]}
      />
      <TextInput
        {...props}
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
    tintColor: colors.blue,
  },
  textInput: {
    flex: 1,
    color: colors.blue,
    marginTop: 9,
    fontFamily: 'Poppins-Medium',
    paddingTop: 10,
    fontSize: 14,
  },
});
