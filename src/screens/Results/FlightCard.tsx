import React from 'react';
import Card from '../../components/Card';
import TextMedium from '../../components/TextMedium';
import { View, StyleSheet } from 'react-native';
import colors from '../../colors';
import TextSemiBold from '../../components/TextSemiBold';

interface Props {
  badgeTitle: string;
  badgeColor: string;
  badgeTextColor: string;
  price: string;
}

const FlightCard = (props: Props) => {
  return (
    <Card>
      <Card
        style={{
          backgroundColor: props.badgeColor,
          paddingTop: 0,
          paddingBottom: 5,
          paddingHorizontal: 10,
          width: 120,
          position: 'absolute',
          top: -20,
          left: 35,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TextSemiBold
          style={{ fontSize: 15, paddingTop: 15, color: props.badgeTextColor }}>
          {props.badgeTitle}
        </TextSemiBold>
      </Card>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextMedium style={[styles.blackText, { fontSize: 24 }]}>
            $103
          </TextMedium>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.iconPlaceholder} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>BER - VCE</TextMedium>
            <TextMedium style={styles.subTitle}>15:30 - 19:00</TextMedium>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>Time</TextMedium>
            <TextMedium style={styles.subTitle}>1h 30m</TextMedium>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>Transfer</TextMedium>
            <TextMedium style={styles.subTitle}>-</TextMedium>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>BER - VCE</TextMedium>
            <TextMedium style={styles.subTitle}>15:30 - 19:00</TextMedium>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>Time</TextMedium>
            <TextMedium style={styles.subTitle}>1h 30m</TextMedium>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>Transfer</TextMedium>
            <TextMedium style={styles.subTitle}>-</TextMedium>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default FlightCard;

const styles = StyleSheet.create({
  blackText: { color: colors.black },
  iconPlaceholder: {
    height: 20,
    width: 20,
    backgroundColor: 'black',
  },
  title: { color: colors.darkerGrey, fontSize: 16, paddingTop: 5 },
  subTitle: { color: colors.black, fontSize: 16, paddingTop: 5 },
});
