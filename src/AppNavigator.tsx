import OnboardingScreen from './screens/OnboardingScreen';
import { createStackNavigator } from 'react-navigation-stack';
import Calendar from './screens/CalendarScreen';
import ResultsScreen from './screens/ResultsScreen';

const AppNavigator = createStackNavigator({
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
});

export default AppNavigator;
