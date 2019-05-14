import { GET_DATA_FROM_REALM } from '../action/actionType';

const defaultState = [];

const RealmDataRecently = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DATA_FROM_REALM:
            return action.realmData;
        default:
            return state;
    }
}
export default RealmDataRecently;