import React from 'react';
import SearchInput from './SearchInput';
import AutoCompletePlaces from './AutoCompletePlaces';
import { Place } from '../../Backend/types';
import { StyleSheet } from 'react-native';
import { InputType, InputState } from '../../reducers/onboardingSearch';
import { formatPlaceIdAndName } from '../../utils/places';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  input: InputState<InputType>;
  onPressItem: (val: Place) => void;
  onChangeText: (val: string) => void;
  onFocus?: () => void;
  iconSuccess: IconDefinition;
}

const TextInputWithAutoComplete = (props: Props) => {
  return (
    <>
      <SearchInput
        style={styles.searchInputStyle}
        loading={props.input.loading}
        onFocus={props.onFocus}
        placeholder={
          props.input.type.charAt(0).toUpperCase() + props.input.type.slice(1)
        }
        icon={props.input.value ? props.iconSuccess : faSearch}
        value={
          props.input.value
            ? formatPlaceIdAndName(props.input.value)
            : props.input.query
        }
        onChangeText={props.onChangeText}
      />
      <AutoCompletePlaces
        query={props.input.query}
        values={props.input.places}
        loading={props.input.loading}
        onPressItem={val => props.onPressItem(val)}
      />
    </>
  );
};

export default TextInputWithAutoComplete;

const styles = StyleSheet.create({
  searchInputStyle: { marginTop: 15 },
});
