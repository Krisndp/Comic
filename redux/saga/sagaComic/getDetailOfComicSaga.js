import { GET_DETAIL_OF_COMIC, GET_DETAIL_OF_COMIC_FAIL, GET_DETAIL_OF_COMIC_SUCCESS } from '../../action/actionComic/actionType';
import { put, takeLatest } from 'redux-saga/effects';
import { API } from './APIDetailComic';

function* getDetailComic(linkDetailComic) {
    //console.log(linkDetailComic)
    try {
        const receivedDetailOfComic = yield API.getDetailFromLink(linkDetailComic);
        //yield 
        //console.log(receivedDetailOfComic)
        yield put({ type: GET_DETAIL_OF_COMIC_SUCCESS, receivedDetailOfComic })
    } catch {
        yield put({ type: GET_DETAIL_OF_COMIC_FAIL })
    }
}

export function* getDetailOfCominSaga() {
    yield takeLatest(GET_DETAIL_OF_COMIC, getDetailComic)
}