import Onboarding from './screens/Onboarding';
import { createStackNavigator } from 'react-navigation-stack';
import Calendar from './screens/Calendar';

const AppNavigator = createStackNavigator({
  Onboarding: {
    screen: Onboarding,
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
});

export default AppNavigator;
