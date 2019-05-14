import { GET_INFO_NEWS, GET_FAIL, GET_SUCCES_INFO } from '../action/actionType';
import { put, takeLatest } from 'redux-saga/effects';
import { API } from './apiInfoNews';

function* getInfoNews(linkNews) {
    try {
        const receivedInfoNews = yield API.getInfoNewsFromAPI(linkNews);
        //yield console.log(receivedInfoNews)
        yield put({ type: GET_SUCCES_INFO, receivedInfoNews })
    } catch {
        yield put({ type: GET_FAIL })
    }
}

export function* watchGetInfoNews(){
    yield takeLatest(GET_INFO_NEWS, getInfoNews)
}