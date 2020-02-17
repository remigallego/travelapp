import React from 'react';
import Card from '../../components/Card';
import TextMedium from '../../components/TextMedium';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../../colors';
import TextSemiBold from '../../components/TextSemiBold';
import { Leg } from '../../Backend/types';
import moment from 'moment';
import { useSelector } from '../../store';
import { formatPlaceId } from '../../utils/places';
import 'moment-duration-format';
export enum BadgeType {
  CHEAPEST,
  FASTEST,
  NONE,
}
interface Props {
  badgeType: BadgeType;
  price: string;
  flightInfo: Leg;
}

const FlightCard = (props: Props) => {
  const flightInfo = props.flightInfo;
  const query = useSelector(state => state.query);

  const carrier = useSelector(state => {
    const id = flightInfo.Carriers[0];
    return state.results.Carriers.find(c => c.Id === id);
  });

  const renderInbound = () => {
    // if(inbound) { ...}
  };

  const renderDuration = () => {
    // @ts-ignore
    return moment.duration(flightInfo.Duration, 'minutes').format('hh:m');
  };

  const renderBadge = () => {
    if (props.badgeType === BadgeType.NONE) {
      return;
    }

    const getBackgroundColor = () => {
      if (props.badgeType === BadgeType.CHEAPEST) {
        return 'rgba(131, 211, 255, 0.8)';
      }
      if (props.badgeType === BadgeType.FASTEST) {
        return 'rgba(131, 211, 111, 0.8)';
      }
      return 'rgba(255, 255, 255, 0.8)';
    };
    const getTextColor = () => {
      if (props.badgeType === BadgeType.CHEAPEST) {
        return 'white';
      }
      if (props.badgeType === BadgeType.FASTEST) {
        return 'white';
      }
      return 'rgba(255, 255, 255, 0.8)';
    };

    return (
      <Card
        style={[
          styles.badge,
          {
            backgroundColor: getBackgroundColor(),
          },
        ]}>
        <TextSemiBold
          style={[
            styles.badgeText,
            {
              color: getTextColor(),
            },
          ]}>
          {props.badgeType === BadgeType.CHEAPEST && 'Cheapest'}
          {props.badgeType === BadgeType.FASTEST && 'Fastest'}
        </TextSemiBold>
      </Card>
    );
  };

  return (
    <Card>
      {renderBadge()}
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextMedium style={[styles.blackText, { fontSize: 24 }]}>
            {props.price}
          </TextMedium>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={{ uri: carrier.ImageUrl }}
              style={{ width: 50, resizeMode: 'contain' }}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>
              {`${formatPlaceId(query.originPlace)} - ${formatPlaceId(
                query.destinationPlace,
              )}`}
            </TextMedium>
            <TextMedium style={styles.subTitle}>
              {moment(flightInfo.Departure).format('hh:mm A')} -{' '}
              {moment(flightInfo.Arrival).format('hh:mm A')}
            </TextMedium>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>Time</TextMedium>
            <TextMedium style={styles.subTitle}>{renderDuration()}</TextMedium>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>Transfer</TextMedium>
            <TextMedium style={styles.subTitle}>-</TextMedium>
          </View>
        </View>

        {renderInbound()}
      </View>
    </Card>
  );
};

export default FlightCard;

const styles = StyleSheet.create({
  badge: {
    paddingTop: 0,
    paddingBottom: 5,
    paddingHorizontal: 10,
    width: 120,
    position: 'absolute',
    top: -20,
    left: 35,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 15,
    paddingTop: 15,
  },
  blackText: { color: colors.black },
  iconPlaceholder: {
    height: 20,
    width: 20,
    backgroundColor: 'black',
  },
  title: { color: colors.darkerGrey, fontSize: 16, paddingTop: 5 },
  subTitle: { color: colors.black, fontSize: 16, paddingTop: 5 },
});
