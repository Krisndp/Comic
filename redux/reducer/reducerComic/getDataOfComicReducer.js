import { GET_DATA_OF_COMIC_FAIL, GET_DATA_OF_COMIC_SUCCESS, GET_DATA_OF_COMIC_EMPTY } from '../../action/actionComic/actionType';
const defaultState = [];

const getDataOfComicReducer = (state = defaultState, action) => {

    switch (action.type) {
        case GET_DATA_OF_COMIC_FAIL:
            return [];
        case GET_DATA_OF_COMIC_SUCCESS:
            return action.receivedDataOfComic;
        case GET_DATA_OF_COMIC_EMPTY:
            return [];
        default:
            return state;
    }
}

export default getDataOfComicReducer;