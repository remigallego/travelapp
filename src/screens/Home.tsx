import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import colors from '../colors';
import TextRegular from '../components/TextRegular';
import TextBold from '../components/TextBold';
import SearchInput from '../components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import AutoComplete from '../components/AutoComplete';

const Home: () => ReactElement = () => {
  const [searchValue, setSearchValue] = useState();
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TextRegular>
          <TextRegular>Where are you </TextRegular>
        </TextRegular>
        <TextRegular>
          <TextBold>flying </TextBold>
          <TextRegular>to?</TextRegular>
        </TextRegular>

        <View>
          <SearchInput
            style={styles.searchInputStyle}
            placeholder={'Search a flight'}
            value={searchValue}
            onChangeText={val => setSearchValue(val)}
          />
          <AutoComplete
            values={searchValue ? ['Berlin', 'Paris', 'New York'] : []}
            onPressItem={val => console.log(val)}
          />
        </View>
      </View>

      <Image source={require('./background.png')} style={styles.imageStyle} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.pink,
  },
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
  },
  bold: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  imageStyle: {
    position: 'absolute',
    zIndex: -1,
    top: 200,
    width: '100%',
    height: '100%',
  },
  searchInputStyle: { marginTop: 15 },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
