import React from 'react';
import Card from '../../components/Card';
import TextMedium from '../../components/TextMedium';
import { View, StyleSheet } from 'react-native';
import colors from '../../colors';
import TextSemiBold from '../../components/TextSemiBold';
import { Leg } from '../../Backend/types';
import moment from 'moment';
import { useSelector } from '../../store';
import { formatPlaceId } from '../../utils/places';
import * as momentDuration from 'moment-duration-format';

export enum BadgeType {
  CHEAPEST,
  FASTEST,
}
interface Props {
  badgeType: BadgeType;
  price: string;
  flightInfo: Leg;
}

const FlightCard = (props: Props) => {
  const flightInfo = props.flightInfo;
  const query = useSelector(state => state.query);

  const renderInbound = () => {
    // if(inbound) { ...}
  };

  const renderDuration = () => {
    const duration = moment.duration(flightInfo.Duration, 'seconds');
    return duration.as('h');
  };

  return (
    <Card>
      <Card
        style={{
          backgroundColor:
            props.badgeType === BadgeType.CHEAPEST
              ? 'rgba(131, 211, 255, 0.8)'
              : 'rgba(248, 190, 186, 0.8)',
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
          style={{
            fontSize: 15,
            paddingTop: 15,
            color: props.badgeType === BadgeType.CHEAPEST ? 'white' : 'black',
          }}>
          {props.badgeType === BadgeType.CHEAPEST ? 'Cheapest' : 'Fastest'}
        </TextSemiBold>
      </Card>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextMedium style={[styles.blackText, { fontSize: 24 }]}>
            {props.price}
          </TextMedium>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.iconPlaceholder} />
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
              {moment(flightInfo.Departure).format('hh:mm')} -{' '}
              {moment(flightInfo.Arrival).format('hh:mm')}
            </TextMedium>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <TextMedium style={styles.title}>Time</TextMedium>
            <TextMedium style={styles.subTitle}>
              {/* renderDuration() */}
            </TextMedium>
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
  blackText: { color: colors.black },
  iconPlaceholder: {
    height: 20,
    width: 20,
    backgroundColor: 'black',
  },
  title: { color: colors.darkerGrey, fontSize: 16, paddingTop: 5 },
  subTitle: { color: colors.black, fontSize: 16, paddingTop: 5 },
});
