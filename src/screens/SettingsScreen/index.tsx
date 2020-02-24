import React, { ReactElement } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
  ScrollView,
} from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../colors';
import { HeaderTitle } from 'react-navigation-stack';
import Headline from '../../components/Headline';
import TextMedium from '../../components/TextMedium';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const SettingsScreen: (props: Props) => ReactElement = props => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Headline>Settings</Headline>

        <TextMedium
          style={{
            color: colors.black,
            fontSize: 20,
          }}>
          Currency
        </TextMedium>

        <TextMedium
          style={{
            color: colors.black,
            fontSize: 20,
          }}>
          Currency
        </TextMedium>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
  },
  bigText: {
    fontSize: 30, // TODO: Should be responsive
  },
  smallText: { fontSize: 18 },
  blackText: { color: colors.black },
  container: {
    paddingHorizontal: 20,
  },

  passengerContainer: {
    marginTop: 0,
  },
  smallMarginTop: {
    marginTop: 15,
  },
});
