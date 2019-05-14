import { CHANGE_FONTSIZE } from '../action/actionType';

const defaultState = { fontsizeBig: false };

const changeFontSizeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_FONTSIZE:
            return {
                fontsizeBig: action.fontsizeBig,
            }
        default:
            return state;
    }
}

export default changeFontSizeReducer;