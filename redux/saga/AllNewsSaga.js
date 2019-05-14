import { GET_ALL_NEWS, GET_FAIL, GET_SUCCES } from '../action/actionType';
import { put, takeLatest } from 'redux-saga/effects';
import { API } from './API';

function* getNews(linkNewsTopic) {
    try {
        //console.log(linkNewsTopic)
        var received = []
        for (var i of linkNewsTopic.linkNewsTopic) {
            //console.log(i)
            const arr = yield API.getNewsFromAPI(i);
            for (var j of arr) {
                received.push(j)
            }
        }
        const receivedNews = received;
        //console.log(receivedNews)
        //yield console.log(receivedNews)
        yield put({ type: GET_SUCCES, receivedNews })
    } catch {
        yield put({ type: GET_FAIL })
    }
}

export function* watchGetNews() {
    yield takeLatest(GET_ALL_NEWS, getNews)
}