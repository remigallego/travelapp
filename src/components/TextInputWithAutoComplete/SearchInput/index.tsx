import React, { ReactElement } from 'react';
import {
  StyleSheet,
  TextInputProps,
  Animated,
  ActivityIndicator,
  Platform,
  View,
} from 'react-native';
import colors from '../../../colors';
import { TextInput } from 'react-native-gesture-handler';
import { useAnimation } from 'react-native-animation-hooks';
import TextMedium from '../../TextMedium';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

interface Props extends TextInputProps {
  loading: boolean;
  icon: IconDefinition;
  onFocus: () => void;
}

const SearchInput: (props: Props) => ReactElement = props => {
  return (
    <View style={[styles.searchInput, styles.dropShadow, props.style]}>
      <View style={{ width: 30 }}>
        {props.loading ? (
          <ActivityIndicator style={styles.image} color={colors.blue} />
        ) : (
          <FontAwesomeIcon icon={props.icon} style={styles.image} />
        )}
      </View>
      <TextInput
        {...props}
        onFocus={props.onFocus}
        autoCorrect={false}
        selectTextOnFocus={true}
        style={styles.textInput}
        clearTextOnFocus={true}
        placeholderTextColor={colors.darkerGrey}
      />
    </View>
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
    color: colors.blue,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  textInput: {
    marginLeft: 5,
    flex: 1,
    color: colors.blue,
    ...Platform.select({
      ios: {
        marginTop: 4,
      },
      android: {
        marginTop: 14,
      },
    }),
    fontFamily: 'Poppins-Medium',
    paddingTop: 0,
    fontSize: 14,
  },
  dropShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.68,
    elevation: 10,
  },
});
