import { GET_FAIL, GET_SUCCES, CHANGE_CHOOSE_TOPIC_BEFORE } from '../action/actionType';
const defaultState = [];

const allNewsReducer = (state = defaultState, action) => {

    switch (action.type) {
        case GET_FAIL:
            return [];
        case GET_SUCCES:
            return action.receivedNews;
        case CHANGE_CHOOSE_TOPIC_BEFORE:
            return [];
        default:
            return state;
    }
}

export default allNewsReducer;