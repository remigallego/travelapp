import React, { useState, ReactElement } from 'react';
import Card from '../../components/Card';
import { Animated, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TextLight from '../../components/TextLight';
import {
  faPlusSquare,
  faChild,
  faUser,
  faChevronDown,
  faMale,
  faFemale,
  faChevronUp,
  faMinusSquare,
} from '@fortawesome/free-solid-svg-icons';
import colors from '../../colors';
import TextMedium from '../../components/TextMedium';

interface Props {
  adults: number;
  infants: number;
  setAdults: (adults: number) => void;
  setInfants: (infants: number) => void;
}

const PassengerDetail: (props: Props) => ReactElement = props => {
  const [isDetailOpen, toggleDetail] = useState(false);
  const [heightAnimation] = useState(new Animated.Value(0));
  const [opacityAnimation] = useState(new Animated.Value(0));

  const { adults, infants } = props;

  const renderDetailOpen = () => {
    return (
      <Animated.View style={{}}>
        <>
          <TouchableOpacity
            onPress={() => {
              // scrollViewRef.scrollTo({ y: 0 });
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
                  icon={faChevronUp}
                  size={18}
                  style={{
                    marginTop: 10,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>

          <Animated.View
            style={{
              opacity: opacityAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row' }}>
                {renderAdultIcons()}
                <TextLight style={[styles.blackText, styles.smallText]}>
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
                  onPress={() => props.setAdults(adults - 1)}>
                  <FontAwesomeIcon
                    icon={faMinusSquare}
                    size={25}
                    color={adults === 1 ? colors.lightBlue : colors.blue}
                    style={{
                      marginTop: 15,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={adults === 9}
                  onPress={() => {
                    props.setAdults(adults + 1);
                  }}>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    size={25}
                    color={adults === 9 ? colors.lightBlue : colors.blue}
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
                <TextLight style={[styles.blackText, styles.smallText]}>
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
                  onPress={() => props.setInfants(infants - 1)}>
                  <FontAwesomeIcon
                    icon={faMinusSquare}
                    size={25}
                    color={!infants ? colors.lightBlue : colors.blue}
                    style={{
                      marginTop: 15,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  disabled={infants === 9}
                  onPress={() => props.setInfants(infants + 1)}>
                  <FontAwesomeIcon
                    icon={faPlusSquare}
                    size={25}
                    color={infants === 9 ? colors.lightBlue : colors.blue}
                    style={{
                      marginTop: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </>
      </Animated.View>
    );
  };

  const renderDetailClosed = () => {
    opacityAnimation.setValue(0);
    return (
      <TouchableOpacity
        onPress={() => {
          Animated.timing(heightAnimation, {
            toValue: isDetailOpen ? 0 : 1,
            duration: 400,
          }).start();

          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 600,
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

  const renderChildIcons = () => {
    if (!infants) {
      return (
        <FontAwesomeIcon
          colo
          icon={faChild}
          color={colors.grey}
          style={{
            marginTop: 20,
            marginRight: 10,
          }}
        />
      );
    } else {
      const array = Array.from(Array(infants)).map(() => {
        return (
          <FontAwesomeIcon
            colo
            icon={faChild}
            color={colors.black}
            style={{
              marginTop: 20,
            }}
          />
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
          }}
        />
      );
    });

    return (
      <View style={{ marginRight: 10, flexDirection: 'row' }}>{array}</View>
    );
  };

  const renderCountPassengers = () => {
    const count = infants ? adults + infants : adults;
    if (count > 1) {
      return `${count} passengers`;
    } else {
      return `${count} passenger`;
    }
  };

  return (
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
          {isDetailOpen && renderDetailOpen()}
        </>
      </Animated.View>
    </Card>
  );
};

export default PassengerDetail;

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
