import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View,AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App1 from './src/containers/App';
import configureStore from './src/configureStore';
const store = configureStore();
class App extends React.Component {
  render() {
    return (
       <Provider store={store}>
      <App1/>
       </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Expo.registerRootComponent(App);
