import { GET_DATA_OF_COMIC, GET_DATA_OF_COMIC_FAIL, GET_DATA_OF_COMIC_SUCCESS } from '../../action/actionComic/actionType';
import { put, takeLatest } from 'redux-saga/effects';
import { API } from './API';

function* getComic(linkComic) {
    try {
        // console.log('hh')
        // console.log(linkComic)
        var received = []
        for (var i of linkComic.linkComic) {
           // console.log(i)
            const arr = yield API.getDataOfComicSaga(i);
            for (var j of arr) {
                received.push(j)
            }
        }
        const receivedDataOfComic = received;
        //console.log(receivedDataOfComic)
        //yield console.log(receivedNews)
        yield put({ type: GET_DATA_OF_COMIC_SUCCESS, receivedDataOfComic })
    } catch {
        yield put({ type: GET_DATA_OF_COMIC_FAIL })
    }
}

export function* watchGetComics() {
    yield takeLatest(GET_DATA_OF_COMIC, getComic)
}