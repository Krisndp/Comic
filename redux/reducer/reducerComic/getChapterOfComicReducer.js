import { GET_CHAPTER_OF_COMIC_FAIL, GET_CHAPTER_OF_COMIC_SUCCESS, GET_CHAPTER_OF_COMIC_EMPTY } from '../../action/actionComic/actionType';
const defaultState = [];

const getChapterOfComicReducer = (state = defaultState, action) => {

    switch (action.type) {
        case GET_CHAPTER_OF_COMIC_FAIL:
            return [];
        case GET_CHAPTER_OF_COMIC_SUCCESS:
            return action.receivedChapterOfComic;
        case GET_CHAPTER_OF_COMIC_EMPTY:
            return [];
        default:
            return state;
    }
}

export default getChapterOfComicReducer;