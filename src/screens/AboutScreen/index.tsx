import React, { ReactElement } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import colors from '../../colors';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import Headline from '../../components/Headline';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import TextSemiBold from '../../components/TextSemiBold';
import TextBold from '../../components/TextBold';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const AboutScreen: (props: Props) => ReactElement = props => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingLeft: 20,
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            StatusBar.setBarStyle('light-content');
            props.navigation.goBack();
          }}>
          <FontAwesomeIcon icon={faChevronLeft} size={26} />
        </TouchableOpacity>
        <Headline style={{ paddingLeft: 20, marginTop: 2 }}>About</Headline>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextSemiBold style={styles.createdText}>
          {'Programmed with 💙 by\nRémi Gallego'}
        </TextSemiBold>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Linking.openURL('https://remigallego.com')}>
          <TextBold style={{ color: colors.black, fontSize: 20 }}>
            remigallego.com
          </TextBold>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://github.com/remigallego')}>
            <Image
              source={require('./github.png')}
              style={[styles.social, { marginRight: 20 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              Linking.openURL('https://twitter.com/The_Algorithm')
            }>
            <Image source={require('./twitter.png')} style={styles.social} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: 'center',
            marginTop: 60,
          }}>
          <TextSemiBold style={[styles.createdText]}>
            Design by Dasha Malvo
          </TextSemiBold>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://dribbble.com/DashaMalvo')}>
            <Image source={require('./dribbble.png')} style={styles.social} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  createdText: {
    color: colors.black,
    fontSize: 20,
    lineHeight: 20,
    textAlign: 'center',
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
  social: { width: 30, height: 30 },
});
