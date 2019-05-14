import { combineReducers } from 'redux';
import favoriteReducer from './favoriteReducer';
import allNewsReducer from './allNewsReducer';
import changeLightReducer from './changeLightReducer';
import infoNewsReducer from './infoNewsReducer';
import categoriesNewsReducer from './categoriesNewsReducer';
import RealmDataRecently from './RealmDataRecently';
import RealmDataSaved from './RealmDataSaved';
import RealmDataFavorite from './RealmDataFavorite';
import SearchReducer from './SearchReducer';
import loadMoreNews from './loadMoreNews';
import RealmDataSearched from './RealmDataSearched';
import changeFontSizeReducer from './changeFontSizeReducer';
import getDataOfComicReducer from './reducerComic/getDataOfComicReducer';
import getDetailOfComicReducer from './reducerComic/getDetailOfComicReducer';
import getChapterOfComicReducer from './reducerComic/getChapterOfComicReducer';
import SearchComicReducer from './reducerComic/SearchComic';

const reducer = combineReducers({
    favoriteReducer,
    allNewsReducer,
    changeLightReducer,
    infoNewsReducer,
    categoriesNewsReducer,
    RealmDataRecently,
    RealmDataSaved,
    RealmDataFavorite,
    SearchReducer,
    loadMoreNews,
    RealmDataSearched,
    changeFontSizeReducer,
    getDataOfComicReducer,
    getDetailOfComicReducer,
    getChapterOfComicReducer,
    SearchComicReducer
})

export default reducer;
