import reducer from '../reducer/reducer';
import {createStore, applyMiddleware} from 'redux';
import createSaga from 'redux-saga';
import saga from '../saga/saga';

const sagaMiddleware = createSaga();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

export default store;