import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import colors from '../colors';
import TextRegular from '../components/TextRegular';
import TextBold from '../components/TextBold';
import SearchInput from '../components/SearchInput';

const Home: () => ReactElement = () => {
  const [searchValue, setSearchValue] = useState();
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TextRegular>
          <TextRegular>Where are you </TextRegular>
        </TextRegular>
        <TextRegular>
          <TextBold>flying </TextBold>
          <TextRegular>to?</TextRegular>
        </TextRegular>
        <SearchInput
          style={styles.searchInputStyle}
          placeholder={'Search a flight'}
          value={searchValue}
          onChangeText={val => setSearchValue(val)}
        />
      </View>

      <Image source={require('./background.png')} style={styles.imageStyle} />
    </View>
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
    width: '100%',
    height: '100%',
  },
  searchInputStyle: { marginTop: 15 },
});
