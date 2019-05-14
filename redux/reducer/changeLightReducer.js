import { CHANGE_LIGHT } from '../action/actionType';

const defaultState = { light: true, notification: false };

const changeLightReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_LIGHT:
            return {
                ...state,
                light: !state.light,
            }
        default:
            return state;
    }
}

export default changeLightReducer;