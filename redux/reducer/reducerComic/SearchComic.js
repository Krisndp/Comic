import { SEARCH } from '../../action/actionComic/actionType';

const defaultState = [];

const SearchComicReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH:
            return action.ItemSearch;
        default:
            return state;
    }
} 

export default SearchComicReducer;