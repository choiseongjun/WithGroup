import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import LoginScreen from './component/LoginScreen';
import MainScreen from './component/MainScreen';
import FindPasswordScreen from './component/FindPasswordScreen';
import CreateScreen from './component/CreateScreen';
import MoimDetail from './component/MoimDetail';
import CreateStudy from './component/CreateStudy';
import CreatePlan from './component/CreatePlan';

import {TimeLinesScreen} from './timelines';
import {AppInfomation} from './Infomation';

import { Provider } from 'react-redux';
import {store} from './store/store';

const AppNavigator = createStackNavigator({
  HOME: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      heaer: null,
    },
  },
  Find: {
    screen: FindPasswordScreen,
    navigationOptions: {
      header: null,
    },
  },
  CREATESTUDY: {
    screen: CreateStudy,
  },
  MoimDetail: {
    screen: MoimDetail,
    navigationOptions: {
      header: null,
    },
  },
  Create: {
    screen: CreateScreen,
    navigationOptions: {
      header: null,
    },
  },
  TimeLine: {
    screen: TimeLinesScreen,
    navigationOptions: ({navigation}) => ({
      title: '타임라인',
      headerShown: false,
    }),
  },
  AppInfomation: {
    screen: AppInfomation,
    navigationOptions:{
      headerShown: false
    }
  },
  CreatePlan: {
    screen:CreatePlan,
    // navigationOptions:{
    //   headerShown: false,
    // }
  },

});

export default createAppContainer(AppNavigator);
// export default  () =>(
//   <Provider store={store}>
//     <AppNavigator />
//   </Provider>
// );