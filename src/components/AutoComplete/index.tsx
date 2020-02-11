import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TextLight from '../TextLight';
import colors from '../../colors';

interface Props {
  values: string[];
  onPressItem: (val: string) => void;
}

const AutoComplete: (props: Props) => ReactElement = props => {
  const { values, onPressItem } = props;

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

  return <View style={styles.container}>{values.map(renderItem)}</View>;
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
    height: 50,
    flexDirection: 'row',
    zIndex: 222,
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 30,
  },
});
