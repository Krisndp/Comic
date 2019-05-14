import { GET_DATA_FROM_REALM_FAVORITE } from '../action/actionType';

const defaultState = [];

const RealmDataFavorite = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DATA_FROM_REALM_FAVORITE:
            return action.realmFavorite;
        default:
            return state;
    }
}
export default RealmDataFavorite;