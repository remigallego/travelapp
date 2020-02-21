import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
} from 'react-native';
import colors from '../../colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import TextMedium from '../../components/TextMedium';
import CalendarComponent from '../../components/CalendarComponent';
import ButtonComponent from '../../components/ButtonComponent';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import VerticalCarousel from '../../components/VerticalCarousel';
import Headline from '../../components/Headline';
import moment from 'moment';
import { useSelector } from '../../store';
import { formatPlaceId } from '../../utils/places';
import { useDispatch } from 'react-redux';
import { setInboundDate, setOutboundDate } from '../../reducers/calendar';
import {
  createSession,
  setOutboundToQuery,
  setInboundToQuery,
  setAdultsToQuery,
  setInfantsToQuery,
} from '../../reducers/query';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser,
  faChevronDown,
  faChevronUp,
  faPlusSquare,
  faMinusSquare,
  faMale,
  faChild,
  faFemale,
} from '@fortawesome/free-solid-svg-icons';
import TextLight from '../../components/TextLight';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const CalendarScreen: (props: Props) => ReactElement = props => {
  const [selectedMonth, selectMonth] = useState(
    moment()
      .add('1', 'month')
      .month(),
  );
  const [isDetailOpen, toggleDetail] = useState(false);
  const [heightAnimation, _s] = useState(new Animated.Value(0));
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [scrollViewRef, setScrollViewRef] = useState(null);

  const generateNextDates = () => {
    const result = [];
    for (let i = 0; i <= 12; i++) {
      result.push(
        moment()
          .add(i, 'month')
          .date(1),
      );
    }
    return result;
  };

  const months = generateNextDates();

  const origin = useSelector(state => state.query.originPlace);
  const destination = useSelector(state => state.query.destinationPlace);
  const inbound = useSelector(state => state.calendar.inboundDate);
  const outbound = useSelector(state => state.calendar.outboundDate);
  const adults = useSelector(state => state.query.adults);
  const infants = useSelector(state => state.query.infants);

  const dispatch = useDispatch();

  const renderDetailClosed = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          Animated.timing(heightAnimation, {
            toValue: isDetailOpen ? 0 : 1,
            duration: 400,
          }).start();

          toggleDetail(!isDetailOpen);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faUser}
              size={18}
              style={{
                marginRight: 10,
                marginTop: 10,
              }}
            />
            <TextMedium style={[styles.blackText, styles.smallText]}>
              {renderCountPassengers()}
            </TextMedium>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faChevronDown}
              size={18}
              style={{
                marginTop: 10,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCountPassengers = () => {
    const count = infants ? adults + infants : adults;
    if (count > 1) {
      return `${count} passengers`;
    } else return `${count} passenger`;
  };

  const setScrollBasedElevation = () => {
    const interpolated = scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return interpolated;
  };

  const renderChildIcons = () => {
    if (!infants)
      return (
        <FontAwesomeIcon
          colo
          icon={faChild}
          color={colors.grey}
          style={{
            marginTop: 20,
            marginRight: 10,
          }}></FontAwesomeIcon>
      );
    else {
      const array = Array.from(Array(infants)).map(() => {
        return (
          <FontAwesomeIcon
            colo
            icon={faChild}
            color={colors.black}
            style={{
              marginTop: 20,
            }}></FontAwesomeIcon>
        );
      });

      return (
        <View style={{ marginRight: 10, flexDirection: 'row' }}>{array}</View>
      );
    }
  };

  const renderAdultIcons = () => {
    const array = Array.from(Array(adults)).map((_v, index) => {
      return (
        <FontAwesomeIcon
          colo
          icon={index % 2 === 0 ? faMale : faFemale}
          color={colors.black}
          style={{
            marginTop: 20,
          }}></FontAwesomeIcon>
      );
    });

    return (
      <View style={{ marginRight: 10, flexDirection: 'row' }}>{array}</View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar
        backgroundColor={colors.backgroundBlue}
        barStyle={'dark-content'}
      />

      <ScrollView
        nestedScrollEnabled={true}
        stickyHeaderIndices={[0]}
        ref={r => setScrollViewRef(r)}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY } },
          },
        ])}
        contentContainerStyle={[{ flexGrow: 1 }]}>
        <Animated.View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            paddingBottom: 5,
            elevation: setScrollBasedElevation(),
            backgroundColor: colors.grey,
          }}>
          <View style={styles.container}>
            <Headline>{`${formatPlaceId(origin)} - ${formatPlaceId(
              destination,
            )}`}</Headline>
          </View>
        </Animated.View>
        <View style={styles.container}>
          <Card
            style={{
              marginTop: 20,
              paddingTop: 0,
              paddingBottom: 0,
            }}>
            <Animated.View
              style={[
                styles.passengerContainer,
                {
                  height: heightAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [70, 150],
                  }),
                },
              ]}>
              <>
                {!isDetailOpen && renderDetailClosed()}
                {isDetailOpen && (
                  <Animated.View style={{}}>
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          scrollViewRef.scrollTo({ y: 0 });
                          Animated.timing(heightAnimation, {
                            delay: 100,
                            toValue: isDetailOpen ? 0 : 1,
                            duration: 400,
                          }).start();

                          toggleDetail(!isDetailOpen);
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <FontAwesomeIcon
                              icon={faUser}
                              size={18}
                              style={{
                                marginRight: 10,
                                marginTop: 10,
                              }}
                            />
                            <TextMedium
                              style={[styles.blackText, styles.smallText]}>
                              {renderCountPassengers()}
                            </TextMedium>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <FontAwesomeIcon
                              icon={faChevronUp}
                              size={18}
                              style={{
                                marginTop: 10,
                              }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>

                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            {renderAdultIcons()}
                            <TextLight
                              style={[styles.blackText, styles.smallText]}>
                              <>Adults</>
                            </TextLight>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              disabled={adults === 1}
                              onPress={() =>
                                dispatch(setAdultsToQuery(adults - 1))
                              }>
                              <FontAwesomeIcon
                                icon={faMinusSquare}
                                size={25}
                                color={
                                  adults === 1 ? colors.lightBlue : colors.blue
                                }
                                style={{
                                  marginTop: 15,
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              disabled={adults === 9}
                              onPress={() =>
                                dispatch(setAdultsToQuery(adults + 1))
                              }>
                              <FontAwesomeIcon
                                icon={faPlusSquare}
                                size={25}
                                color={
                                  adults === 9 ? colors.lightBlue : colors.blue
                                }
                                style={{
                                  marginTop: 15,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            {renderChildIcons()}
                            <TextLight
                              style={[styles.blackText, styles.smallText]}>
                              <>Kids</>
                            </TextLight>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              disabled={!infants}
                              onPress={() =>
                                dispatch(setInfantsToQuery(infants - 1))
                              }>
                              <FontAwesomeIcon
                                icon={faMinusSquare}
                                size={25}
                                color={
                                  !infants ? colors.lightBlue : colors.blue
                                }
                                style={{
                                  marginTop: 15,
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              disabled={infants === 9}
                              onPress={() =>
                                dispatch(setInfantsToQuery(infants + 1))
                              }>
                              <FontAwesomeIcon
                                icon={faPlusSquare}
                                size={25}
                                color={
                                  infants === 9 ? colors.lightBlue : colors.blue
                                }
                                style={{
                                  marginTop: 15,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </>
                  </Animated.View>
                )}
              </>
            </Animated.View>
          </Card>

          <VerticalCarousel
            style={[styles.smallMarginTop]}
            months={months}
            selectMonth={selectMonth}
            selectedMonth={selectedMonth}
          />

          <CalendarComponent
            style={styles.smallMarginTop}
            month={selectedMonth}
            inbound={inbound}
            outbound={outbound}
            onOutboundSelect={v => dispatch(setOutboundDate(v))}
            onInboundSelect={v => dispatch(setInboundDate(v))}
          />

          <ButtonComponent
            style={[
              styles.smallMarginTop,
              {
                paddingBottom: 20,
              },
            ]}
            disabled={outbound === null}
            onPress={() => {
              dispatch(setOutboundToQuery(outbound));
              dispatch(setInboundToQuery(inbound));
              dispatch(createSession());
              props.navigation.navigate('Results');
            }}>
            Search
          </ButtonComponent>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;

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
