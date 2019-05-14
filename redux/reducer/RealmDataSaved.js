import { GET_DATA_FROM_REALM_SAVED } from '../action/actionType';

const defaultState = [];

const RealmDataSaved = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DATA_FROM_REALM_SAVED:
            return action.realmSaved;
        default:
            return state;
    }
}
export default RealmDataSaved;