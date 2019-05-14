import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json
import Home from './Home/Home';
import Detail from './Detail/Detail';
import Setting from './Setting/Setting';
import Drawer from './Drawer/Drawer';
import React from 'react';
import { Dimensions } from 'react-native';
import ConnectHistory from './ConnectHistory/ConnectHistory';
import Saved from './Saved/Saved';
import Favorite from './Favorite/Favorite';
import Search from './Search/Search';
import { connect } from 'react-redux';
import Page from './Page/Page';
import AllComic from './Comic/AllComic';
import DetailComic from './Comic/Screen/DetailComic';
import ChapterComic from './Comic/Screen/ChapterComic';
import SpeechTX from './Comic/Screen/Speech';
import SearchComic from './Comic/Screen/SearchComic';
const { width } = Dimensions.get('window');

initialRoute = () => {
  return "Setting"
}

const Drawers = createDrawerNavigator({
  Tabs: {
    screen: Setting,
    navigationOptions: ({ header: null })
  }
}, {
    drawerWidth: width / 2,
    drawerPosition: 'left',
    contentComponent: props => <Drawer {...props} />
  });

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ header: null })
  },
  Detail: {
    screen: Detail,
    navigationOptions: ({ header: null })
  },
  Setting: {
    screen: Drawers,
    navigationOptions: ({ header: null })
  },
  ConnectHistory: {
    screen: ConnectHistory,
    navigationOptions: ({ header: null })
  },
  Saved: {
    screen: Saved,
    navigationOptions: ({ header: null })
  },
  Favorite: {
    screen: Favorite,
    navigationOptions: ({ header: null })
  },
  Search: {
    screen: Search,
    navigationOptions: ({ header: null })
  },
  Page: {
    screen: Page,
    navigationOptions: ({ header: null })
  },
  AllComic: {
    screen: AllComic,
    navigationOptions: ({ header: null })
  },
  DetailComic: {
    screen: DetailComic,
    navigationOptions: ({ header: null })
  },
  ChapterComic: {
    screen: ChapterComic,
    navigationOptions: ({ header: null })
  },
  SpeechTX: {
    screen: SpeechTX,
    navigationOptions: ({ header: null })
  },
  SearchComic: {
    screen: SearchComic,
    navigationOptions: ({ header: null })
  }
}, {
    initialRouteName: this.initialRoute(),
  });

const App = createAppContainer(AppNavigator);

function mapSTP(state) {
  return { RealmDataFavorite: state.RealmDataFavorite }
}
export default connect(mapSTP)(App)