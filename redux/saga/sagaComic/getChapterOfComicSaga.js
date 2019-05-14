import { GET_CHAPTER_OF_COMIC, GET_CHAPTER_OF_COMIC_FAIL, GET_CHAPTER_OF_COMIC_SUCCESS } from '../../action/actionComic/actionType';
import { put, takeLatest } from 'redux-saga/effects';
import { API } from './APIChapterOfComic';

function* getChapterComic(linkChapterComic) {
    //console.log(linkChapterComic)
    try {
        const receivedChapterOfComic = yield API.getChapterFromLink(linkChapterComic);
        //yield 
        //console.log(receivedChapterOfComic)
        yield put({ type: GET_CHAPTER_OF_COMIC_SUCCESS, receivedChapterOfComic })
    } catch {
        yield put({ type: GET_CHAPTER_OF_COMIC_FAIL })
    }
}

export function* getChapterOfComicSaga() {
    yield takeLatest(GET_CHAPTER_OF_COMIC, getChapterComic)
}