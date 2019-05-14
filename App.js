import store from './redux/store/store';
import { Provider } from 'react-redux';
import React from 'react';
import AppNavigator from './src/AppNavigator';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
      
    );
  }
}