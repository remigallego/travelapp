import React from 'react';
import SearchInput from './SearchInput';
import AutoCompletePlaces from './AutoCompletePlaces';
import { Place } from '../../Backend/types';
import { StyleSheet } from 'react-native';

interface Props {
  loading: boolean;
  inputValue: string;
  query: string;
  values: Place[];
  placeholder: string;
  onPressItem: (val: Place) => void;
  onChangeText: (val: string) => void;
  onFocus?: () => void;
}

const TextInputWithAutoComplete = (props: Props) => {
  return (
    <>
      <SearchInput
        style={styles.searchInputStyle}
        loading={props.loading}
        onFocus={props.onFocus}
        placeholder={props.placeholder}
        value={props.inputValue}
        onChangeText={val => {
          props.onChangeText(val);
        }}
      />
      <AutoCompletePlaces
        query={props.query}
        values={props.values}
        loading={props.loading}
        onPressItem={val => props.onPressItem(val)}
      />
    </>
  );
};

export default TextInputWithAutoComplete;

const styles = StyleSheet.create({
  searchInputStyle: { marginTop: 15 },
});
