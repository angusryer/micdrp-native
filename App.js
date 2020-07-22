import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack";
import firebase from './src/config/firebase.config';
import { DashboardScreen, LoginScreen, AppStartup, PerformanceScreen, LearnScreen } from "./src/screens";

const AuthDrawer = createDrawerNavigator(
  {
    Dashboard: DashboardScreen,
    Performance: PerformanceScreen,
    Learn: LearnScreen,
    Logout: ({navigation}) => {
      firebase.auth().signOut();
      return navigation.navigate('Guest')
    }
  },
  {
    initialRouteName: "Dashboard"
  }
)

const GuestStack = createStackNavigator(
  {
    Login: LoginScreen,
    Learn: LearnScreen
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Start: AppStartup,
      Guest: GuestStack,
      Authorized: AuthDrawer,
    },
    {
      initialRouteName: "Start"
    }
  )
)
