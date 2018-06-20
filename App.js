import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createSwitchNavigator, createStackNavigator, NavigationActions } from 'react-navigation';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';
import Album from './Album';
import Picture from './Picture';

const RootStack = createStackNavigator({
  Home: { screen: Home },
  Album: { screen: Album },
  Picture: { screen: Picture }
},
{
  initialRouteName: 'Home',
});

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
