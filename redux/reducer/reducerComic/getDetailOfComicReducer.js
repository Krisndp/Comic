import { GET_DETAIL_OF_COMIC_FAIL, GET_DETAIL_OF_COMIC_SUCCESS, GET_DETAIL_OF_COMIC_EMPTY } from '../../action/actionComic/actionType';
const defaultState = [];

const getDetailOfComicReducer = (state = defaultState, action) => {

    switch (action.type) {
        case GET_DETAIL_OF_COMIC_FAIL:
            return [];
        case GET_DETAIL_OF_COMIC_SUCCESS:
            return action.receivedDetailOfComic;
        case GET_DETAIL_OF_COMIC_EMPTY:
            return [];
        default:
            return state;
    }
}

export default getDetailOfComicReducer;