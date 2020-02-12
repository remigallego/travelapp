import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextLight from '../TextLight';
import colors from '../../colors';

interface Props {
  values: string[];
  loading: boolean;
  onPressItem: (val: string) => void;
}

const AutoComplete: (props: Props) => ReactElement = props => {
  const { values, onPressItem } = props;

  const renderLoading = () => {
    return (
      <View key={'loading'} style={[styles.itemContainer]}>
        <TextLight style={[styles.itemText]}>Loading...</TextLight>
      </View>
    );
  };

  const renderItem = (val: string) => {
    return (
      <TouchableOpacity
        key={val}
        style={styles.itemContainer}
        onPress={() => onPressItem(val)}>
        <TextLight style={[styles.itemText]}>{val}</TextLight>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {props.loading && renderLoading()}
      {!props.loading && values.map(renderItem)}
    </View>
  );
};

export default AutoComplete;

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
    width: '100%',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemContainer: {
    zIndex: 888888,
    height: 50,
    flexDirection: 'row',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 30,
  },
});
