import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';


import LoginScreen from './component/LoginScreen';
import MainScreen from './component/MainScreen';
import FindPasswordScreen from './component/FindPasswordScreen';
import CreateScreen from './component/CreateScreen';
import MoimDetail from './component/MoimDetail';
import CreateStudy from './component/CreateStudy';

const AppNavigator = createStackNavigator({
  HOME:{
    screen: LoginScreen,
    navigationOptions:{
      header: null
    },
  },
  Main:{
    screen: MainScreen,
    navigationOptions:{
      heaer: null
    },
  },
  Find:{
    screen: FindPasswordScreen,
    navigationOptions:{
      header: null
    },
  },
  CREATESTUDY:{
    screen:CreateStudy
  },
  MoimDetail:{
    screen: MoimDetail,
    navigationOptions:{
      header: null
    },
  },
  Create:{
    screen: CreateScreen,
    navigationOptions:{
      header: null
    },
  },

 

})



export default createAppContainer(AppNavigator);

