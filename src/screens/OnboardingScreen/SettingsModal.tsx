import React, { useState } from 'react';
import { View, TouchableOpacity, Easing, Animated } from 'react-native';
import TextSemiBold from '../../components/TextSemiBold';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from '../../colors';
import {
  faEuroSign,
  faPoundSign,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setCurrencyToQuery } from '../../reducers/query';
import { useSelector } from '../../store';

const CURRENCIES = [
  {
    name: 'EUR',
    symbol: '€',
  },
  {
    name: 'GBP',
    symbol: '£',
  },
  {
    name: 'USD',
    symbol: '$',
  },
];

const SettingsModal = props => {
  const [settingsModal, toggleSettingsModal] = useState(false);
  const [openAnim, _tY] = useState(new Animated.Value(0));
  const currency = useSelector(state => state.query.currency);

  const getIconCurrency = () => {
    if (currency === 'EUR') return faEuroSign;
    if (currency === 'GBP') return faPoundSign;
    if (currency === 'USD') return faDollarSign;
  };

  const interpolateWidth = () => {
    if (settingsModal) {
      return openAnim.interpolate({
        inputRange: [0, 10, 100],
        outputRange: [0, 99, 100],
      });
    }
    return openAnim.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
    });
  };

  const dispatch = useDispatch();
  return (
    <>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (!settingsModal) {
              Animated.timing(openAnim, {
                duration: 500,
                toValue: 100,
                easing: Easing.inOut(Easing.ease),
              }).start();
              toggleSettingsModal(!settingsModal);
            } else {
              Animated.timing(openAnim, {
                duration: 300,
                toValue: 0,
                easing: Easing.inOut(Easing.ease),
              }).start(() => {
                toggleSettingsModal(!settingsModal);
              });
            }
          }}>
          <FontAwesomeIcon
            icon={getIconCurrency()}
            size={30}
            color={colors.blue}
          />
        </TouchableOpacity>
      </View>
      {settingsModal && (
        <View
          style={{
            position: 'absolute',
            bottom: 45,
            right: 45,
          }}>
          <Animated.View
            style={{
              width: interpolateWidth(),
              height: openAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 100],
              }),
              borderRadius: openAnim.interpolate({
                inputRange: [0, 100],
                outputRange: [5, 10],
              }),
              paddingHorizontal: 20,
              backgroundColor: colors.white,
              overflow: 'hidden',
            }}>
            {CURRENCIES.map(c => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setCurrencyToQuery(c.name));
                    Animated.timing(openAnim, {
                      duration: 300,
                      toValue: 0,
                      easing: Easing.inOut(Easing.ease),
                    }).start(() => {
                      toggleSettingsModal(!settingsModal);
                    });
                  }}>
                  <Animated.View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextSemiBold
                      style={{
                        color:
                          currency === c.name ? colors.blue : colors.lightBlue,
                        fontSize: 18,
                        lineHeight: 2,
                      }}>
                      {c.name}
                    </TextSemiBold>
                    <TextSemiBold
                      style={{
                        color:
                          currency === c.name ? colors.blue : colors.lightBlue,
                        fontSize: 18,
                        lineHeight: 2,
                      }}>
                      {c.symbol}
                    </TextSemiBold>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default SettingsModal;
