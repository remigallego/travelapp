import OnboardingScreen from './screens/OnboardingScreen';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from 'react-navigation-stack';
import Calendar from './screens/CalendarScreen';
import ResultsScreen from './screens/ResultsScreen';
import SettingsScreen from './screens/SettingsScreen';

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forSlide,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

const AppNavigator = createStackNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        header: () => null,
      },
    },
    Calendar: {
      screen: Calendar,
      navigationOptions: {
        header: () => null,
      },
    },
    Results: {
      screen: ResultsScreen,
      navigationOptions: {
        header: () => null,
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        header: () => null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      ...MyTransition,
    },
  },
);

export default AppNavigator;
