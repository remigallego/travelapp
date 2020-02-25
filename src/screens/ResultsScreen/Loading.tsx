import { View, ActivityIndicator, Animated } from 'react-native';
import React, { useState } from 'react';
import colors from '../../colors';
import TextSemiBold from '../../components/TextSemiBold';
import useInterval from '@use-it/interval';

import Spinner from 'react-native-spinkit';

const Loading = () => {
  const phrases = [
    'Loading the best prices',
    'We are comparing flights',
    'Searching for the best deals',
    'Please wait',
  ];

  const colorArray = [
    colors.pink,
    colors.blue,
    colors.pink,
    colors.backgroundBlue,
  ];
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [opacityAnim, _o] = useState(new Animated.Value(1));
  const [spinnerColor, setSpinnerColor] = useState(colorArray[0]);

  useInterval(() => {
    let newText = '';
    let newColor = '';
    if (phrases.indexOf(currentPhrase) === phrases.length - 1) {
      newText = phrases[0];
    } else {
      newText = phrases[phrases.indexOf(currentPhrase) + 1];
    }
    if (colorArray.indexOf(spinnerColor) === colorArray.length - 1) {
      newColor = colorArray[0];
    } else {
      newColor = colorArray[colorArray.indexOf(spinnerColor) + 1];
    }
    Animated.timing(opacityAnim, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setCurrentPhrase(newText);
      setSpinnerColor(newColor);
      Animated.timing(opacityAnim, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    });
  }, 5000);

  return (
    <View
      style={{
        height: '100%',
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner type={'CircleFlip'} color={spinnerColor} />
        <Animated.View
          style={{
            opacity: opacityAnim,
          }}>
          <TextSemiBold style={{ color: colors.blue, fontSize: 18 }}>
            {currentPhrase}
          </TextSemiBold>
        </Animated.View>
      </View>
    </View>
  );
};

export default Loading;
