import { LOAD_MORE, ADD_LOAD_MORE } from '../action/actionType'
const loadMoreNews = (state = 2, action) => {

    switch (action.type) {
        // case LOAD_MORE:
        //     return action.oldNewsLoaded;
        // case ADD_LOAD_MORE:
        //     return state;
        default:
            return state
    }
}

export default loadMoreNews