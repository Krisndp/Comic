import { GET_WORD_FROM_SEARCH_REALM } from '../action/actionType';

const defaultState = [];

const RealmDataSearched = (state = defaultState, action) => {
    switch (action.type) {
        case GET_WORD_FROM_SEARCH_REALM:
            return action.realmSearched;
        default:
            return state;
    }
}
export default RealmDataSearched;