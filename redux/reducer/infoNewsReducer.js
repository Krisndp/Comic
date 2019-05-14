import { GET_ALL_NEWS, GET_FAIL, GET_SUCCES_INFO } from '../action/actionType';
const defaultState = {};

const infoNewsReducer = (state = defaultState, action) => {

    switch (action.type) {
        case GET_FAIL:
            return [];
        case GET_SUCCES_INFO:
            return action.receivedInfoNews;
        default:
            return state;
    }
}

export default infoNewsReducer;