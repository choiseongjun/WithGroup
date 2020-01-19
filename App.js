import { Provider } from 'react-redux';
import React from 'react';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';


import LoginScreen from './component/LoginScreen';
import MainScreen from './component/MainScreen';
import FindPasswordScreen from './component/FindPasswordScreen';
import CreateScreen from './component/CreateScreen';
import MoimDetail from './component/MoimDetail';
import CreateStudy from './component/CreateStudy';

import {store} from './store/store';

// import App from './component/Appstorage/appdrawer';

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

let Navigation = createAppContainer(AppNavigator);

// export default function App() {
//     return (
//       <Provider Store={Store}>
//         <Navigation />
//       </Provider>
//     )
// }
export default class App extends React.Component {
  render() {
    console.log("==========App.js render()============")
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}



// export default createAppContainer(AppNavigator);

