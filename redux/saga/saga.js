import { watchGetNews } from './AllNewsSaga';
import { watchGetInfoNews } from './watchGetInfoNews';
import { watchGetComics } from './sagaComic/getDataOfComicSaga';
import { getDetailOfCominSaga } from './sagaComic/getDetailOfComicSaga';
import {getChapterOfComicSaga} from './sagaComic/getChapterOfComicSaga';
import { fork } from 'redux-saga/effects';

export default function* saga() {
    yield fork(watchGetNews);
    yield fork(watchGetInfoNews);
    yield fork(watchGetComics);
    yield fork(getDetailOfCominSaga);
    yield fork(getChapterOfComicSaga);
}