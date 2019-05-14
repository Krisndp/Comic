import { SEARCH } from '../action/actionType';

const defaultState = [];

const SearchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SEARCH:
            return action.ItemSearch;
        default:
            return state;
    }
} 

export default SearchReducer;