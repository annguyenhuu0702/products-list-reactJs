import * as Types from './../constants/ActionType';

var initialState = {};

const itemEditing = (state = initialState, action) => {
    switch (action.type) {
        case Types.EDIT_PRODUCT:
            return action.product;
        case Types.DELETE_PRODUCT:
            return {};
        default:
            return state;
    
    }
}


export default itemEditing;